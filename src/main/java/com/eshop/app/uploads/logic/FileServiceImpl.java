package com.eshop.app.uploads.logic;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Override
    public String uploadImage(MultipartFile file) {
        validateFile(file);

        String originalFilename = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        validateFileExtension(fileExtension);

        String fileName = UUID.randomUUID() + "." + fileExtension;
        Path uploadPath = Paths.get(uploadDir);

        try {
            // Create directories if not exist
            Files.createDirectories(uploadPath);

            // Resolve final file path
            Path filePath = uploadPath.resolve(fileName);

            // Copy file (replace if exists)
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return relative path for storage/reference
            return uploadDir + "/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage(), e);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select a valid file to upload");
        }
        if (file.getSize() > 10 * 1024 * 1024) { // 10 MB limit
            throw new IllegalArgumentException("File size exceeds 10 MB limit");
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.isEmpty()) {
            return "jpg"; // fallback
        }
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "jpg" : filename.substring(dotIndex + 1).toLowerCase();
    }

    private void validateFileExtension(String extension) {
        if (extension == null || extension.isEmpty()) {
            throw new IllegalArgumentException("File must have a valid extension");
        }
        // Allow common image formats
        boolean isValid = switch (extension) {
            case "jpg", "jpeg", "png", "gif", "webp" -> true;
            default -> false;
        };
        if (!isValid) {
            throw new IllegalArgumentException("Only JPG, JPEG, PNG, GIF, WEBP files are allowed");
        }
    }
}