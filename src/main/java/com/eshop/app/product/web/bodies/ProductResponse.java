package com.eshop.app.product.web.bodies;

import java.util.List;

import com.eshop.app.product.data.Product;

import lombok.Data;

@Data
public class ProductResponse {
    private String id;
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

    public ProductResponse(Product product) {
        this.id = product.getProductId().toString();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.category = product.getCategory().name();
        this.brand = product.getBrand();
        this.material = product.getMaterial().name();
        this.gemstone = product.getGemstone().name();
        this.size = product.getSize().name();
        this.stockQuantity = product.getStockQuantity();
        this.discountPercentage = product.getDiscountPercentage();
        this.images = product.getImages();
    }
}