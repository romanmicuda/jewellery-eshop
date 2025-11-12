package com.eshop.app.order.web;

import com.eshop.app.order.data.Order;
import com.eshop.app.order.logic.OrderService;
import com.eshop.app.order.web.request.CreateOrderRequest;
import com.eshop.app.order.web.request.CalculateOrderTotalRequest;
import com.eshop.app.order.web.response.OrderResponse;
import com.eshop.app.order.web.response.OrderTotalResponse;
import com.eshop.app.user.data.User;
import com.eshop.app.user.logic.UserProviderService;
import com.eshop.app.exception.NotFoundException;
import com.eshop.app.exception.IllegalOperationException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserProviderService userProviderService;

    public OrderController(OrderService orderService, UserProviderService userProviderService) {
        this.orderService = orderService;
        this.userProviderService = userProviderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest request) throws NotFoundException {
        User currentUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));
        Order order = orderService.createOrder(request, currentUser);
        return ResponseEntity.ok(new OrderResponse(order));
    }

    @GetMapping
    public ResponseEntity<Page<OrderResponse>> getUserOrders(Pageable pageable) throws NotFoundException {
        User currentUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));

        Page<Order> orders = orderService.getUserOrders(currentUser.getId(), pageable);
        Page<OrderResponse> orderResponses = orders.map(OrderResponse::new);

        return ResponseEntity.ok(orderResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable UUID id) throws NotFoundException {
        User currentUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));

        Order order = orderService.getOrderById(id, currentUser.getId());
        return ResponseEntity.ok(new OrderResponse(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable UUID id, @RequestParam String status)
            throws NotFoundException {
        Order order = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(new OrderResponse(order));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelOrder(@PathVariable UUID id) throws NotFoundException, IllegalOperationException {
        User currentUser = userProviderService.getCurrentUser()
                .orElseThrow(() -> new NotFoundException("User not found"));

        orderService.cancelOrder(id, currentUser.getId());
        return ResponseEntity.ok().build();

    }

    @PostMapping("/calculate-total")
    public ResponseEntity<OrderTotalResponse> calculateOrderTotal(@RequestBody CalculateOrderTotalRequest request)
            throws NotFoundException {

        OrderTotalResponse totalResponse = orderService.calculateOrderTotal(request);
        return ResponseEntity.ok(totalResponse);

    }
}
