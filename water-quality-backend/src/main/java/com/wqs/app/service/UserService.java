package com.wqs.app.service;

import com.wqs.app.entity.User;

public interface UserService {
    User login(String username, String password);
}
