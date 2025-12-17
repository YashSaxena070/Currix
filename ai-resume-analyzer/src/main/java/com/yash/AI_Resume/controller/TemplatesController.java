package com.yash.AI_Resume.controller;

import com.yash.AI_Resume.service.TemplatesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static com.yash.AI_Resume.utils.AppConstants.TEMPLATES;

@RestController
@RequiredArgsConstructor
@RequestMapping(TEMPLATES)
@Slf4j
public class TemplatesController {

    private final TemplatesService templatesService;

    @GetMapping
    public ResponseEntity<?> getTemplates(Authentication authentication) {
        //1. Call the service method
        Map<String, Object> response = templatesService.getTemplates(authentication.getPrincipal());

        //2. Return the response
        return ResponseEntity.ok(response);

    }
}
