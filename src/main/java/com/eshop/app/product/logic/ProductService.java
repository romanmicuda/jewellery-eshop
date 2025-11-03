package com.eshop.app.product.logic;

import java.util.UUID;

import com.eshop.app.exception.NotFoundException;
import com.eshop.app.product.data.Product;
import com.eshop.app.product.web.bodies.CreateProductRequest;
import com.eshop.app.product.web.bodies.UpdateProductRequest;

public interface ProductService {

    Product getProductById(UUID id) throws NotFoundException;

    Product createProduct(CreateProductRequest request);

    Product updateProduct(UUID id, UpdateProductRequest request) throws NotFoundException;

}
