package com.example.ems.dto;

public class AuthResponse {

    private boolean success;
    private String message;
    private String token;
    private String username;
    private String role;
    private String email;

    public AuthResponse() {
    }

    public AuthResponse(boolean success, String message, String token, String username, String role, String email) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.username = username;
        this.role = role;
        this.email = email;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
