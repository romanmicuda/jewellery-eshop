package com.eshop.app.order.web.request;

import java.util.List;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private List<OrderItemRequest> items;
    private Double totalAmount;
    // ShippingAddress is now optional as we'll use user's billing address

    @Data
    public static class OrderItemRequest {
        private String productId;
        private Integer quantity;
        private Double unitPrice;
    }
}
