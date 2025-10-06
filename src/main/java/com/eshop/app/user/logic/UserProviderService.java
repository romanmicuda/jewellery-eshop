package com.eshop.app.user.logic;

import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import com.eshop.app.security.services.UserDetailsImpl;
import com.eshop.app.user.data.User;
import com.eshop.app.user.data.UserRepository;

@Service
public class UserProviderService {
    
    private final UserRepository userRepository;
    
    public UserProviderService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && 
            authentication.getPrincipal() instanceof UserDetailsImpl) {
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return userRepository.findByUsername(userDetails.getUsername());
        }
        return Optional.empty();
    }
}
