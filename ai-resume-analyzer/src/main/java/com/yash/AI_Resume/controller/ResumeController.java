package com.yash.AI_Resume.controller;

import com.yash.AI_Resume.service.AIService;
import com.yash.AI_Resume.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private AIService aiService;

    @PostMapping("/upload")
    public String uploadResume(@RequestParam("file") MultipartFile file, RequestParam("jdText" String jdText)) {
        return resumeService.extractText(file);
    }
}
