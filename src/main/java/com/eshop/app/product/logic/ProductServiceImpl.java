package com.eshop.app.product.logic;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.eshop.app.exception.NotFoundException;
import com.eshop.app.product.data.Gemstone;
import com.eshop.app.product.data.Jewellery;
import com.eshop.app.product.data.Material;
import com.eshop.app.product.data.Product;
import com.eshop.app.product.data.ProductRepository;
import com.eshop.app.product.data.Size;
import com.eshop.app.product.web.bodies.CreateProductRequest;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product getProductById(UUID id) throws NotFoundException {
        return productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product not found"));
    }

    @Override
    public Product createProduct(CreateProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(Jewellery.valueOf(request.getCategory()));
        product.setBrand(request.getBrand());
        product.setMaterial(Material.valueOf(request.getMaterial()));
        product.setGemstone(Gemstone.valueOf(request.getGemstone()));
        product.setSize(Size.valueOf(request.getSize()));
        product.setStockQuantity(request.getStockQuantity());
        product.setDiscountPercentage(request.getDiscountPercentage());
        product.setImages(request.getImages());

        return productRepository.save(product);
    }
    
}
