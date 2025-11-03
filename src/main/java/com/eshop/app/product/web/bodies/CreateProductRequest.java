package com.eshop.app.product.web.bodies;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProductRequest {
    private String name;
    private String description;
    private double price;
    private String category;
    private String brand;
    private String material;
    private String gemstone;
    private String size;
    private int stockQuantity;
    private double discountPercentage;
    private List<String> images;
}
