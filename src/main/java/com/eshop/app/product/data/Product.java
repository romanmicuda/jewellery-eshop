package com.eshop.app.product.data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.eshop.app.orderdetail.data.OrderDetail;
import com.eshop.app.review.data.Review;
import com.eshop.app.wishlist.data.Wishlist;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID productId;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String brand;
    private String color;
    private String size;
    private Integer stockQuantity;
    private Double discountPercentage;
    private String imageUrl;

    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<Wishlist> wishlists;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;

    public Product(){
        this.orderDetails = new ArrayList<>();
        this.wishlists = new ArrayList<>();
        this.reviews = new ArrayList<>();
    }
}
