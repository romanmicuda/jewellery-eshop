package com.eshop.app.orderdetail.logic;

import org.springframework.stereotype.Service;

import com.eshop.app.orderdetail.data.OrderDetail;
import com.eshop.app.orderdetail.data.OrderDetailRepository;


@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;

    public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }

    @Override
    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }
    
}
