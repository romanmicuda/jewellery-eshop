package com.eshop.app.user.logic;

import java.util.Set;

import com.eshop.app.exception.IllegalOperationException;
import com.eshop.app.user.data.User;
import com.eshop.app.user.web.VerifyTokenRequest;
import com.eshop.app.user.web.bodies.JwtResponse;

public interface AuthService {
    JwtResponse signin(String username, String password);
    User signup(String username, String email, String password, Set<String> strRoles) throws IllegalOperationException;
    boolean verifyToken(VerifyTokenRequest token);
}

