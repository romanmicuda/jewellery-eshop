package com.eshop.app.order.logic;

import com.eshop.app.order.data.Order;
import com.eshop.app.order.data.OrderRepository;
import com.eshop.app.order.web.request.CreateOrderRequest;
import com.eshop.app.order.web.request.CalculateOrderTotalRequest;
import com.eshop.app.order.web.response.OrderTotalResponse;
import com.eshop.app.orderdetail.data.OrderDetail;
import com.eshop.app.orderdetail.logic.OrderDetailService;
import com.eshop.app.product.data.Product;
import com.eshop.app.product.logic.ProductService;
import com.eshop.app.user.data.User;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.exception.IllegalOperationException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final OrderDetailService orderDetailService;

    public OrderServiceImpl(OrderRepository orderRepository, ProductService productService, OrderDetailService orderDetailService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.orderDetailService = orderDetailService;
    }

    @Override
    @Transactional
    public Order createOrder(CreateOrderRequest request, User user) throws NotFoundException {
        Order order = new Order();
        order.setOrderDate(new Date());
        order.setUser(user);
        order.setStatus("PENDING");
        
        // Create order details and calculate total
        List<OrderDetail> orderDetails = new ArrayList<>();
        double calculatedTotal = 0.0;
        
        for (CreateOrderRequest.OrderItemRequest item : request.getItems()) {
            Product product = productService.getProductById(UUID.fromString(item.getProductId()));

            // Check stock availability
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            
            // Calculate actual price with discount from backend
            double originalPrice = product.getPrice();
            double discountPercentage = product.getDiscountPercentage() != null ? product.getDiscountPercentage() : 0.0;
            double discountedPrice = originalPrice * (1 - discountPercentage / 100.0);
            double subtotal = discountedPrice * item.getQuantity();
            
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProduct(product);
            orderDetail.setQuantity(item.getQuantity());
            orderDetail.setUnitPrice(discountedPrice); // Use backend-calculated price
            orderDetail.setSubtotal(subtotal);
            orderDetail.setOrder(order);
            orderDetail = orderDetailService.createOrderDetail(orderDetail);

            orderDetails.add(orderDetail);
            calculatedTotal += subtotal;

            // Update product stock
            productService.updateStockQuantity(product.getProductId(), product.getStockQuantity() - item.getQuantity());
        }
        
        // Set the backend-calculated total instead of frontend-provided total
        order.setTotalAmount(calculatedTotal);
        order.setOrderDetails(orderDetails);
        return orderRepository.save(order);
    }

    @Override
    public Page<Order> getUserOrders(UUID userId, Pageable pageable) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId, pageable);
    }

    @Override
    public Order getOrderById(UUID orderId, UUID userId) throws NotFoundException {
        return orderRepository.findByOrderIdAndUserId(orderId, userId)
            .orElseThrow(() -> new NotFoundException("Order not found"));
    }

    @Override
    @Transactional
    public Order updateOrderStatus(UUID orderId, String status) throws NotFoundException {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new NotFoundException("Order not found"));
        
        order.setStatus(status);
        
        if ("DELIVERED".equals(status)) {
            order.setDeliveryDate(new Date());
        }
        
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public void cancelOrder(UUID orderId, UUID userId) throws NotFoundException, IllegalOperationException {
        Order order = orderRepository.findByOrderIdAndUserId(orderId, userId)
            .orElseThrow(() -> new NotFoundException("Order not found"));
        
        if ("DELIVERED".equals(order.getStatus()) || "CANCELLED".equals(order.getStatus())) {
            throw new IllegalOperationException("Cannot cancel order with status: " + order.getStatus());
        }
        
        // Restore product stock
        for (OrderDetail detail : order.getOrderDetails()) {
            Product product = detail.getProduct();
            productService.updateStockQuantity(product.getProductId(), product.getStockQuantity() + detail.getQuantity());
        }
        
        order.setStatus("CANCELLED");
        orderRepository.save(order);
    }

    @Override
    public OrderTotalResponse calculateOrderTotal(CalculateOrderTotalRequest request) throws NotFoundException {
        double subtotal = 0.0;
        List<OrderTotalResponse.OrderItemSummary> itemSummaries = new ArrayList<>();
        
        for (CalculateOrderTotalRequest.OrderItemRequest item : request.getItems()) {
            Product product = productService.getProductById(UUID.fromString(item.getProductId()));
            
            // Calculate prices
            double originalPrice = product.getPrice();
            double discountPercentage = product.getDiscountPercentage() != null ? product.getDiscountPercentage() : 0.0;
            double discountedPrice = originalPrice * (1 - discountPercentage / 100.0);
            double itemTotal = discountedPrice * item.getQuantity();
            
            subtotal += itemTotal;
            
            // Create item summary
            OrderTotalResponse.OrderItemSummary summary = new OrderTotalResponse.OrderItemSummary(
                product.getProductId().toString(),
                product.getName(),
                item.getQuantity(),
                originalPrice,
                discountPercentage,
                discountedPrice,
                itemTotal
            );
            itemSummaries.add(summary);
        }
        
        // Calculate tax and shipping
        double taxRate = 0.08; // 8% tax rate - could be configurable
        double tax = subtotal * taxRate;
        double shipping = 0.0; // Free shipping
        double total = subtotal + tax + shipping;
        
        return new OrderTotalResponse(subtotal, tax, shipping, total, itemSummaries);
    }
}
