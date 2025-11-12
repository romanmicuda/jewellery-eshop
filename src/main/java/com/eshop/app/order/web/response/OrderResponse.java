package com.eshop.app.order.web.response;

import com.eshop.app.order.data.Order;
import com.eshop.app.orderdetail.data.OrderDetail;

import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
public class OrderResponse {
    private UUID orderId;
    private Date orderDate;
    private Double totalAmount;
    private String status;
    private Date deliveryDate;
    private List<OrderDetailResponse> orderDetails;
    private String customerEmail;

    public OrderResponse(Order order) {
        this.orderId = order.getOrderId();
        this.orderDate = order.getOrderDate();
        this.totalAmount = order.getTotalAmount();
        this.status = order.getStatus();
        this.deliveryDate = order.getDeliveryDate();
        this.orderDetails = order.getOrderDetails() != null 
            ? order.getOrderDetails().stream()
                .map(OrderDetailResponse::new)
                .collect(Collectors.toList())
            : null;
        this.customerEmail = order.getUser() != null ? order.getUser().getEmail() : null;
    }

    @Data
    public static class OrderDetailResponse {
        private UUID orderDetailId;
        private Integer quantity;
        private Double unitPrice;
        private Double subtotal;
        private ProductResponse product;

        public OrderDetailResponse(OrderDetail orderDetail) {
            this.orderDetailId = orderDetail.getOrderDetailId();
            this.quantity = orderDetail.getQuantity();
            this.unitPrice = orderDetail.getUnitPrice();
            this.subtotal = orderDetail.getSubtotal();
            this.product = orderDetail.getProduct() != null 
                ? new ProductResponse(orderDetail.getProduct()) 
                : null;
        }

        @Data
        public static class ProductResponse {
            private String id;
            private String name;
            private String description;
            private Double price;
            private String category;
            private List<String> images;

            public ProductResponse(com.eshop.app.product.data.Product product) {
                this.id = product.getProductId().toString();
                this.name = product.getName();
                this.description = product.getDescription();
                this.price = product.getPrice();
                this.category = product.getCategory() != null ? product.getCategory().toString() : null;
                this.images = product.getImages();
            }
        }
    }
}
