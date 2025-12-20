package com.wqs.app.service;

import com.wqs.app.dto.ChangePasswordRequest;
import com.wqs.app.dto.LoginResponse;
import com.wqs.app.dto.ProfileResponse;
import com.wqs.app.dto.RegisterRequest;

public interface UserService {

    LoginResponse login(String username, String password);

    String register(RegisterRequest request);
    
    ProfileResponse getProfile(String username);
    
    String changePassword(ChangePasswordRequest request);
}
