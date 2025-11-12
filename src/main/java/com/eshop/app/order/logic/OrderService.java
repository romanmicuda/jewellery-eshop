package com.eshop.app.order.logic;

import com.eshop.app.order.data.Order;
import com.eshop.app.order.web.request.CreateOrderRequest;
import com.eshop.app.order.web.request.CalculateOrderTotalRequest;
import com.eshop.app.order.web.response.OrderTotalResponse;
import com.eshop.app.user.data.User;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.exception.IllegalOperationException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface OrderService {
    Order createOrder(CreateOrderRequest request, User user) throws NotFoundException;
    Page<Order> getUserOrders(UUID userId, Pageable pageable);
    Order getOrderById(UUID orderId, UUID userId) throws NotFoundException;
    Order updateOrderStatus(UUID orderId, String status) throws NotFoundException;
    void cancelOrder(UUID orderId, UUID userId) throws NotFoundException, IllegalOperationException;
    OrderTotalResponse calculateOrderTotal(CalculateOrderTotalRequest request) throws NotFoundException;
}
