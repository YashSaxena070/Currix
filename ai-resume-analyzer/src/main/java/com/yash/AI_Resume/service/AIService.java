package com.yash.AI_Resume.service;

import org.springframework.http.HttpHeaders;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yash.AI_Resume.dto.AtsResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIService {

    @Value("${spring.ai.groq.api-key}")
    private String API_KEY;

    @Value("${spring.ai.groq.model:llama-3.3-70b-versatile}")
    private String modelName;

    @Value("${spring.ai.groq.url:https://api.groq.com/openai/v1/chat/completions}")
    private String groqApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;

    public AtsResult analyze(String resumeText) {
        if (resumeText == null || resumeText.trim().length() < 50) {
            throw new RuntimeException("Resume text is empty or invalid (minimum 50 characters required)");
        }

        if (API_KEY == null || API_KEY.trim().isEmpty() || API_KEY.contains("YOUR_KEY")) {
            throw new RuntimeException("Groq API Key is not configured. Please set SPRING_AI_GROQ_API_KEY in .env");
        }

        String url = groqApiUrl != null && !groqApiUrl.trim().isEmpty() 
                ? groqApiUrl 
                : "https://api.groq.com/openai/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY.trim());

        String effectiveModel = (modelName != null && !modelName.trim().isEmpty()) 
                ? modelName.trim() 
                : "llama-3.3-70b-versatile";

        Map<String, Object> body = Map.of(
                "model", effectiveModel,
                "messages", List.of(
                        Map.of("role", "system",
                                "content", "You are an ATS resume analyzer. Respond ONLY with valid JSON. Do not include markdown or explanations."),
                        Map.of("role", "user", "content", buildPrompt(resumeText))),
                "temperature", 0.2);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            log.info("Groq response status: {}", response.getStatusCode());

            if (response.getBody() == null || !response.getBody().containsKey("choices")) {
                throw new RuntimeException("Empty response received from AI model provider");
            }

            List<?> choices = (List<?>) response.getBody().get("choices");
            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("No response choices returned by AI model");
            }

            Map<String, Object> firstChoice = (Map<String, Object>) choices.get(0);
            Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");
            String rawContent = (String) message.get("content");

            log.info("Raw AI response: {}", rawContent);

            if (rawContent == null || rawContent.trim().isEmpty()) {
                throw new RuntimeException("AI model returned an empty response");
            }

            // Extract JSON cleanly by stripping markdown code fences or surrounding text
            String cleanedJson = extractJson(rawContent);

            // Convert JSON → DTO
            return objectMapper.readValue(cleanedJson, AtsResult.class);

        } catch (org.springframework.web.client.HttpClientErrorException e) {
            log.error("Groq API client error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            if (e.getStatusCode().value() == 401) {
                throw new RuntimeException("Invalid Groq API Key. Please verify your SPRING_AI_GROQ_API_KEY in .env");
            } else if (e.getStatusCode().value() == 404 || e.getStatusCode().value() == 400) {
                throw new RuntimeException("AI Model error (" + effectiveModel + "): " + e.getResponseBodyAsString());
            }
            throw new RuntimeException("Groq API Error: " + e.getResponseBodyAsString(), e);
        } catch (Exception e) {
            log.error("Groq API error", e);
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private String extractJson(String text) {
        String trimmed = text.trim();
        // Remove ```json ... ``` or ``` ... ```
        if (trimmed.startsWith("```")) {
            int firstNewline = trimmed.indexOf('\n');
            if (firstNewline != -1) {
                trimmed = trimmed.substring(firstNewline + 1);
            }
            int lastBackticks = trimmed.lastIndexOf("```");
            if (lastBackticks != -1) {
                trimmed = trimmed.substring(0, lastBackticks);
            }
            trimmed = trimmed.trim();
        }

        // If there is any preamble or postamble, isolate { ... }
        int startIndex = trimmed.indexOf('{');
        int endIndex = trimmed.lastIndexOf('}');
        if (startIndex != -1 && endIndex != -1 && endIndex > startIndex) {
            return trimmed.substring(startIndex, endIndex + 1);
        }

        return trimmed;
    }

    private String buildPrompt(String resumeText) {
        return """
                You are an expert ATS (Applicant Tracking System) resume analyzer.

                Analyze the following text to determine if it is a valid resume.

                If the text DOES NOT look like a resume (e.g., random text, code, too short, irrelevant content), return this EXACT JSON:
                {
                  "atsScore": 0,
                  "strengths": [],
                  "gaps": ["The uploaded file does not appear to be a valid resume."],
                  "fixes": ["Please upload a valid professional resume."]
                }

                If it IS a resume, analyze it critically against modern industry standards.
                - Calculate a DYNAMIC `atsScore` (0-100) based strictly on the content quality, keywords, formatting (implied), and completeness. DO NOT default to 82 or any other static number.
                - `strengths`: List 3-5 strong points.
                - `gaps`: List 3-5 missing critical elements or weaknesses.
                - `fixes`: List 3-5 actionable improvements.

                Return ONLY valid JSON in this format:
                {
                  "atsScore": number,
                  "strengths": [string],
                  "gaps": [string],
                  "fixes": [string]
                }

                Resume Text:
                """
                + resumeText;
    }
}
