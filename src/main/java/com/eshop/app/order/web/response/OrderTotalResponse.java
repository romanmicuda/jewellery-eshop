package com.eshop.app.order.web.response;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderTotalResponse {
    private double subtotal;
    private double tax;
    private double shipping;
    private double total;
    private List<OrderItemSummary> items;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemSummary {
        private String productId;
        private String productName;
        private int quantity;
        private double originalPrice;
        private double discountPercentage;
        private double discountedPrice;
        private double itemTotal;
    }
}
