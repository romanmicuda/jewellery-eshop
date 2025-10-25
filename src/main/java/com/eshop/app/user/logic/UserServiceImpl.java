package com.eshop.app.user.logic;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.eshop.app.exception.NotFoundException;
import com.eshop.app.user.data.User;
import com.eshop.app.user.data.UserRepository;
import com.eshop.app.user.web.bodies.UpdateAccountInformationRequest;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User updateAccountInformation(UUID id, UpdateAccountInformationRequest updatedUser) throws NotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        user.setFullName(updatedUser.getFullName());
        user.setGender(updatedUser.getGender());
        user.setDateOfBirth(updatedUser.getDateOfBirth());
        user.setLocation(updatedUser.getLocation());
        user.setAlternateMobile(updatedUser.getAlternateMobile());
        user.setMobile(updatedUser.getMobile());
        user.setEmail(updatedUser.getEmail());
        return userRepository.save(user);
    }
    
}
