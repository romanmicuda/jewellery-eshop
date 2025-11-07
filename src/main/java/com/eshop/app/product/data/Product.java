package com.eshop.app.product.data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.eshop.app.orderdetail.data.OrderDetail;
import com.eshop.app.review.data.Review;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    @Enumerated(EnumType.STRING)
    private Jewellery category;
    private String brand;
    @Enumerated(EnumType.STRING)
    private Material material;
    @Enumerated(EnumType.STRING)
    private Gemstone gemstone;
    @Enumerated(EnumType.STRING)
    private Size size;
    private Integer stockQuantity;
    private Double discountPercentage;
    private List<String> images;

    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;

    public Product(){
        this.orderDetails = new ArrayList<>();
        this.reviews = new ArrayList<>();
        this.images = new ArrayList<>();
    }
}
