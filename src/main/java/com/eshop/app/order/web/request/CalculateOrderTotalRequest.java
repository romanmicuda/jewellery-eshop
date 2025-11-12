package com.eshop.app.order.web.request;

import java.util.List;
import lombok.Data;

@Data
public class CalculateOrderTotalRequest {
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private String productId;
        private Integer quantity;
    }
}
