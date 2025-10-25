package com.eshop.app.user.logic;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

import com.eshop.app.exception.IllegalOperationException;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.user.data.User;
import com.eshop.app.user.data.UserRepository;
import com.eshop.app.user.web.bodies.ChangePasswordRequest;
import com.eshop.app.user.web.bodies.UpdateAccountInformationRequest;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
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

    @Override
    public void changePassword(User user, ChangePasswordRequest request) throws NotFoundException, IllegalOperationException {
        if (!encoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalOperationException("Old password is incorrect");
        }
        user.setPassword(encoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
    
}
