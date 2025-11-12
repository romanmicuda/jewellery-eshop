package com.eshop.app.order.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    Page<Order> findByUserIdOrderByOrderDateDesc(UUID userId, Pageable pageable);
    Optional<Order> findByOrderIdAndUserId(UUID orderId, UUID userId);
    List<Order> findByUserIdAndStatus(UUID userId, String status);
}
