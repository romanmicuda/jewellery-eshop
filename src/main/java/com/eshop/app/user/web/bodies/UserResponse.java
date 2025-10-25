package com.eshop.app.user.web.bodies;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.eshop.app.address.data.Address;
import com.eshop.app.order.data.Order;
import com.eshop.app.review.data.Review;
import com.eshop.app.user.data.User;
import com.eshop.app.wishlist.data.Wishlist;

import lombok.Data;

@Data
public class UserResponse {
    private UUID id;
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String gender;
    private Date dateOfBirth;
    private String location;
    private String mobile;
    private String alternateMobile;
    private List<Address> addresses;
    private List<Order> orders;
    private List<Wishlist> wishlists;
    private List<Review> reviews;

    public UserResponse(User user) {
        if (user != null) {
            this.id = user.getId();
            this.username = user.getUsername();
            this.email = user.getEmail();
            this.fullName = user.getFullName();
            this.gender = user.getGender();
            this.dateOfBirth = user.getDateOfBirth();
            this.location = user.getLocation();
            this.mobile = user.getMobile();
            this.alternateMobile = user.getAlternateMobile();
            this.addresses = user.getAddresses();
            this.orders = user.getOrders();
            this.wishlists = user.getWishlists();
            this.reviews = user.getReviews();
        }
    }
}
