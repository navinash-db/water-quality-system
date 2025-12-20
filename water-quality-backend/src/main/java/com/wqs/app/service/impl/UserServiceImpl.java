package com.wqs.app.service.impl;

import org.springframework.stereotype.Service;

import com.wqs.app.dto.ChangePasswordRequest;
import com.wqs.app.dto.LoginResponse;
import com.wqs.app.dto.ProfileResponse;
import com.wqs.app.dto.RegisterRequest;
import com.wqs.app.entity.User;
import com.wqs.app.repository.UserRepository;
import com.wqs.app.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;

    public UserServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public LoginResponse login(String username, String password) {

        User user = repo.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return new LoginResponse(
                "Login successful",
                user.getUsername(),
                user.getRole()
            );
        }

        return new LoginResponse(
            "Invalid username or password",
            null,
            null
        );
    }
    
    

@Override
public String register(RegisterRequest request) {

    User existingUser = repo.findByUsername(request.getUsername());

    if (existingUser != null) {
        return "Username already exists";
    }

    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(request.getPassword()); // plain text (ok for now)
    user.setRole(request.getRole() != null ? request.getRole() : "USER");

    repo.save(user);

    return "User registered successfully";
}


@Override
public ProfileResponse getProfile(String username) {

    User user = repo.findByUsername(username);

    if (user == null) {
        return null;
    }

    return new ProfileResponse(
        user.getUsername(),
        user.getRole()
    );
}

@Override
public String changePassword(ChangePasswordRequest request) {

    User user = repo.findByUsername(request.getUsername());

    if (user == null) {
        return "User not found";
    }

    if (!user.getPassword().equals(request.getOldPassword())) {
        return "Old password is incorrect";
    }

    user.setPassword(request.getNewPassword());
    repo.save(user);

    return "Password changed successfully";
}
}
