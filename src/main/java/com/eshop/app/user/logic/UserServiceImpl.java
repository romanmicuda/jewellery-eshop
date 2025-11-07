package com.eshop.app.user.logic;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eshop.app.exception.IllegalOperationException;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.product.data.Product;
import com.eshop.app.product.logic.ProductService;
import com.eshop.app.user.data.User;
import com.eshop.app.user.data.UserRepository;
import com.eshop.app.user.web.bodies.ChangePasswordRequest;
import com.eshop.app.user.web.bodies.FavoritesRequest;
import com.eshop.app.user.web.bodies.UpdateAccountInformationRequest;
import com.eshop.app.user.web.bodies.UpdateAddressRequest;
import com.eshop.app.user.web.bodies.UpdateNewsletterPreferencesRequest;
import com.eshop.app.user.web.bodies.WishlistRequest;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final ProductService productService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder encoder, ProductService productService) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.productService = productService;
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

    @Override
    public User updateShippingAddress(User user, UpdateAddressRequest request) {
        user.getShippingAddress().setStreetAddress(request.getStreetAddress());
        user.getShippingAddress().setCity(request.getCity());
        user.getShippingAddress().setZipCode(request.getZipCode());
        return userRepository.save(user);
    }

    @Override
    public User updateBillingAddress(User user, UpdateAddressRequest request) {
        user.getBillingAddress().setStreetAddress(request.getStreetAddress());
        user.getBillingAddress().setCity(request.getCity());
        user.getBillingAddress().setZipCode(request.getZipCode());
        return userRepository.save(user);

    }

    @Override
    public User updateNewsletterPreferences(User user, UpdateNewsletterPreferencesRequest request) {
        user.setActiveNewsletterSubscriber(request.isSubscribed());
        return userRepository.save(user);
    }

    @Override
    public User toggleWishlist(User user, WishlistRequest request) throws NotFoundException {
        Product product = productService.getProductById(request.getProductId());
        if (user != null && product != null) {
            if (user.getWishlist().contains(product)) {
                user.getWishlist().remove(product);
            } else {
                user.getWishlist().add(product);
            }
        }
        return userRepository.save(user);
    }

    @Override
    public User toggleFavorite(User user, FavoritesRequest request) throws NotFoundException {
        Product product = productService.getProductById(request.getProductId());
        if (user != null && product != null) {
            if (user.getFavorites().contains(product)) {
                user.getFavorites().remove(product);
            } else {
                user.getFavorites().add(product);
            }
        }
        return userRepository.save(user);
    }

}
