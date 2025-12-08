package com.yash.AI_Resume.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.tika.Tika;

@Service
public class ResumeService {

    private final Tika tika = new Tika();

    public String extractText(MultipartFile file){
        try{
            String text = tika.parseToString(file.getInputStream());
            return text.trim();
        } catch (Exception e){
            return "Error extracting text" + e.getMessage();
        }
    }
}
