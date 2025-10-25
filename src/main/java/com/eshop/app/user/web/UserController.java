package com.eshop.app.user.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshop.app.exception.IllegalOperationException;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.user.data.User;
import com.eshop.app.user.logic.AuthService;
import com.eshop.app.user.logic.UserProviderService;
import com.eshop.app.user.web.bodies.UserResponse;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final AuthService authService;
    private final UserProviderService userProviderService;

    public UserController(AuthService authService, UserProviderService userProviderService) {
        this.authService = authService;
        this.userProviderService = userProviderService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser() throws IllegalOperationException, NotFoundException {
        User user = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        return ResponseEntity.ok(new UserResponse(user));
    }
}
