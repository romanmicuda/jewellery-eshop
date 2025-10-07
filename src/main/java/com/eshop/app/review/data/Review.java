package com.eshop.app.review.data;

import java.util.Date;
import java.util.UUID;

import com.eshop.app.product.data.Product;
import com.eshop.app.user.data.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID reviewId;
    private Integer rating;
    private String comment;
    private Date reviewDate;

    @ManyToOne
    private Product product;

    @ManyToOne
    private User user;
}
