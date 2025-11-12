package com.eshop.app.orderdetail.data;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, UUID> {
    
}
