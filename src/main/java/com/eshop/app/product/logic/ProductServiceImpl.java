package com.eshop.app.product.logic;

import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.eshop.app.exception.NotFoundException;
import com.eshop.app.product.data.Gemstone;
import com.eshop.app.product.data.Jewellery;
import com.eshop.app.product.data.Material;
import com.eshop.app.product.data.Product;
import com.eshop.app.product.data.ProductRepository;
import com.eshop.app.product.data.Size;
import com.eshop.app.product.web.bodies.CreateProductRequest;
import com.eshop.app.product.web.bodies.UpdateProductRequest;

import org.springframework.data.domain.*;

import java.util.Optional;

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
        product.setGemstone(request.getGemstone() != null ? Gemstone.valueOf(request.getGemstone()) : null);
        product.setSize(Size.valueOf(request.getSize()));
        product.setStockQuantity(request.getStockQuantity());
        product.setDiscountPercentage(request.getDiscountPercentage());
        product.setImages(request.getImages());

        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(UUID id, UpdateProductRequest request) throws NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product not found"));
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(Jewellery.valueOf(request.getCategory()));
        product.setBrand(request.getBrand());
        product.setMaterial(Material.valueOf(request.getMaterial()));
        product.setGemstone(request.getGemstone() != null ? Gemstone.valueOf(request.getGemstone()) : null);
        product.setSize(Size.valueOf(request.getSize()));
        product.setStockQuantity(request.getStockQuantity());
        product.setDiscountPercentage(request.getDiscountPercentage());
        product.setImages(request.getImages());

        return productRepository.save(product);
    }

        public Page<Product> getProducts(
            Optional<String> name,
            Optional<String> brand,
            Optional<String> category,
            Optional<String> material,
            Optional<String> gemstone,
            Optional<String> sizeParam,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Product> spec = Specification.where(null);

        if (name.isPresent()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("name")), "%" + name.get().toLowerCase() + "%"));
        }
        if (brand.isPresent()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("brand")), "%" + brand.get().toLowerCase() + "%"));
        }
        if (category.isPresent()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("category"), category.get()));
        }
        if (material.isPresent()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("material"), material.get()));
        }
        if (gemstone.isPresent()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("gemstone"), gemstone.get()));
        }
        if (sizeParam.isPresent()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("size"), sizeParam.get()));
        }

        return productRepository.findAll(spec, pageable);
    }
    
}
