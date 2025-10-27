package com.eshop.app.user.web;

import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshop.app.exception.IllegalOperationException;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.user.data.User;
import com.eshop.app.user.logic.AuthService;
import com.eshop.app.user.logic.UserProviderService;
import com.eshop.app.user.logic.UserService;
import com.eshop.app.user.web.bodies.ChangePasswordRequest;
import com.eshop.app.user.web.bodies.UpdateAccountInformationRequest;
import com.eshop.app.user.web.bodies.UpdateAddressRequest;
import com.eshop.app.user.web.bodies.UpdateNewsletterPreferencesRequest;
import com.eshop.app.user.web.bodies.UserResponse;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final AuthService authService;
    private final UserService userService;
    private final UserProviderService userProviderService;

    public UserController(AuthService authService, UserProviderService userProviderService, UserService userService) {
        this.authService = authService;
        this.userProviderService = userProviderService;
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser() throws IllegalOperationException, NotFoundException {
        User user = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        return ResponseEntity.ok(new UserResponse(user));
    }

    @PutMapping({ "/{id}" })
    public ResponseEntity<UserResponse> updateAccountInformation(@PathVariable("id") UUID id,
            @RequestBody UpdateAccountInformationRequest updatedUser) throws NotFoundException {
        User user = userService.updateAccountInformation(id, updatedUser);
        return ResponseEntity.ok(new UserResponse(user));
    }

    @PutMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest request)
            throws NotFoundException, IllegalOperationException {
        User user = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        userService.changePassword(user, request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/shipping-address")
    public ResponseEntity<UserResponse> updateShippingAddress(@RequestBody UpdateAddressRequest request)
            throws NotFoundException {
        User user = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        User updatedUser = userService.updateShippingAddress(user, request);
        return ResponseEntity.ok(new UserResponse(updatedUser));
    }

    @PutMapping("/billing-address")
    public ResponseEntity<UserResponse> updateBillingAddress(@RequestBody UpdateAddressRequest request)
            throws NotFoundException {
        User user = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        User updatedUser = userService.updateBillingAddress(user, request);
        return ResponseEntity.ok(new UserResponse(updatedUser));
    }

    @PutMapping("/newsletter-preferences")
    public ResponseEntity<UserResponse> updateNewsletterPreferences(@RequestBody UpdateNewsletterPreferencesRequest request) throws NotFoundException {
        User user = userProviderService.getCurrentUser().orElseThrow(() -> new NotFoundException("User not found"));
        User updatedUser = userService.updateNewsletterPreferences(user, request);
        return ResponseEntity.ok(new UserResponse(updatedUser));

    }

}
