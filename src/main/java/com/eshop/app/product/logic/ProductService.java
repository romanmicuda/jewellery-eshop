package com.eshop.app.product.logic;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.eshop.app.exception.NotFoundException;
import com.eshop.app.product.data.Product;
import com.eshop.app.product.web.bodies.CreateProductRequest;
import com.eshop.app.product.web.bodies.UpdateProductRequest;

public interface ProductService {

    Product getProductById(UUID id) throws NotFoundException;

    Product createProduct(CreateProductRequest request);

    Product updateProduct(UUID id, UpdateProductRequest request) throws NotFoundException;

    Page<Product> getProducts(Optional<String> name, Optional<String> brand,
            Optional<String> category, Optional<String> material, Optional<String> gemstone,
            Optional<String> sizeParam, int page, int size, String sortBy, String sortDir);

    void updateStockQuantity(UUID productId, int newQuantity) throws NotFoundException;

}
