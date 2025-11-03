package com.eshop.app.product.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshop.app.exception.NotFoundException;
import com.eshop.app.product.data.Product;
import com.eshop.app.product.logic.ProductService;
import com.eshop.app.product.web.bodies.CreateProductRequest;
import com.eshop.app.product.web.bodies.ProductResponse;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping("/{id}")
    public ProductResponse getProduct(@PathVariable UUID id) throws NotFoundException {
        Product product = productService.getProductById(id);
        return new ProductResponse(product);
    }

    @PostMapping
    public ProductResponse createProduct(@RequestBody CreateProductRequest request) {
        Product product = productService.createProduct(request);
        return new ProductResponse(product);
        
    }
    
    
}
