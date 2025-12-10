package com.wqs.app.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wqs.app.dto.LoginRequest;
import com.wqs.app.entity.User;
import com.wqs.app.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest req) {
        return service.login(req.getUsername(), req.getPassword());
    }
}
