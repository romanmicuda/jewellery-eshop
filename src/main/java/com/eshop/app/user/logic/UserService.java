package com.eshop.app.user.logic;

import java.util.UUID;

import com.eshop.app.exception.NotFoundException;
import com.eshop.app.user.data.User;
import com.eshop.app.user.web.bodies.UpdateAccountInformationRequest;

public interface UserService {

    User updateAccountInformation(UUID id, UpdateAccountInformationRequest updatedUser) throws NotFoundException;

    
}
