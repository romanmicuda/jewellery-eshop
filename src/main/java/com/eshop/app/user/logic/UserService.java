package com.eshop.app.user.logic;

import java.util.UUID;

import com.eshop.app.exception.IllegalOperationException;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.user.data.User;
import com.eshop.app.user.web.bodies.ChangePasswordRequest;
import com.eshop.app.user.web.bodies.FavoritesRequest;
import com.eshop.app.user.web.bodies.UpdateAccountInformationRequest;
import com.eshop.app.user.web.bodies.UpdateAddressRequest;
import com.eshop.app.user.web.bodies.UpdateNewsletterPreferencesRequest;
import com.eshop.app.user.web.bodies.WishlistRequest;

public interface UserService {

    User updateAccountInformation(UUID id, UpdateAccountInformationRequest updatedUser) throws NotFoundException;
    void changePassword(User user, ChangePasswordRequest request) throws NotFoundException, IllegalOperationException;
    User updateShippingAddress(User user, UpdateAddressRequest request);
    User updateBillingAddress(User user, UpdateAddressRequest request);
    User updateNewsletterPreferences(User user, UpdateNewsletterPreferencesRequest request);
    User toggleWishlist(User user, WishlistRequest request) throws NotFoundException;
    User toggleFavorite(User user, FavoritesRequest request)throws NotFoundException;
    
}
