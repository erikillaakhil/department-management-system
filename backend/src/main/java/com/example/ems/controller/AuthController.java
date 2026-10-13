package com.example.ems.controller;

import com.example.ems.dto.AuthResponse;
import com.example.ems.dto.LoginRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        String identifier = request.getUsernameOrEmail().trim().toLowerCase();
        String password = request.getPassword().trim();

        // Standard validation check
        if (password.length() < 4) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(false, "Password must be at least 4 characters", null, null, null, null));
        }

        // Demo role assignment
        String role = "ADMIN";
        String displayName = "Admin User";
        if (identifier.contains("hr") || identifier.contains("manager")) {
            role = "HR_MANAGER";
            displayName = "HR Manager";
        } else if (identifier.contains("staff") || identifier.contains("employee")) {
            role = "STAFF";
            displayName = "Staff Member";
        }

        String token = "wp_jwt_" + UUID.randomUUID().toString();
        AuthResponse response = new AuthResponse(
                true,
                "Authentication successful",
                token,
                displayName,
                role,
                identifier
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody LoginRequest request) {
        String identifier = request.getUsernameOrEmail().trim().toLowerCase();
        String token = "wp_jwt_" + UUID.randomUUID().toString();
        AuthResponse response = new AuthResponse(
                true,
                "Registration successful",
                token,
                "New Member",
                "STAFF",
                identifier
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(new AuthResponse(
                true,
                "Active session verified",
                authHeader.replace("Bearer ", ""),
                "Admin User",
                "ADMIN",
                "admin@workpulse.io"
        ));
    }
}
