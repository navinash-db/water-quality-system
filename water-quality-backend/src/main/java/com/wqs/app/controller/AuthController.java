package com.wqs.app.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wqs.app.dto.ChangePasswordRequest;
import com.wqs.app.dto.LoginRequest;
import com.wqs.app.dto.LoginResponse;
import com.wqs.app.dto.ProfileResponse;
import com.wqs.app.dto.RegisterRequest;
import com.wqs.app.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return service.login(req.getUsername(), req.getPassword());
    }
    
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }
    
    @GetMapping("/profile")
    public ProfileResponse profile(@RequestParam String username) {
        return service.getProfile(username);
    }
    
    @PostMapping("/logout")
    public String logout() {
        return "Logout successful";
    }
    
    @PostMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest request) {
        return service.changePassword(request);
    }
}
