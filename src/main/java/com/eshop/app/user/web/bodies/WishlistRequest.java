package com.eshop.app.user.web.bodies;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WishlistRequest {
    private UUID productId;
}
