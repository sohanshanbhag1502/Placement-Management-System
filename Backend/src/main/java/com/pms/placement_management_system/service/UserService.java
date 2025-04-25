package com.pms.placement_management_system.service;

import java.util.Map;

public interface UserService{
    String registerUser(Map<String, String> userData);
    String loginUser(Map<String, String> userData);
    boolean verifyToken(String token);
}
