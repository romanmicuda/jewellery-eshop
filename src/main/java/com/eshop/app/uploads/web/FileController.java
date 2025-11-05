package com.eshop.app.uploads.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.eshop.app.uploads.logic.FileService;
import com.eshop.app.uploads.web.bodies.UploadImageResponse;

@RestController
@RequestMapping("/api/uploads")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/images")
    public ResponseEntity<UploadImageResponse> uploadImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = fileService.uploadImage(file);
        return ResponseEntity.ok(new UploadImageResponse(imageUrl));
    }
}
