package com.eshop.app.orderdetail.data;

import jakarta.persistence.Id;

import java.util.UUID;

import com.eshop.app.order.data.Order;
import com.eshop.app.product.data.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import lombok.Setter;
import lombok.Getter;

@Entity
@Getter
@Setter
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID orderDetailId;
    private Integer quantity;
    private Double unitPrice;
    private Double subtotal;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Product product;
}
