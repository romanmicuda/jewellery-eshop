package com.eshop.app.order.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.eshop.app.address.data.Address;
import com.eshop.app.orderdetail.data.OrderDetail;
import com.eshop.app.user.data.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID orderId;
    private Date orderDate;
    private Double totalAmount;
    private String status;
    private Date deliveryDate;

    @ManyToOne
    private User user;

    @ManyToOne
    private Address address;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;

    public Order(){
        this.orderDetails = new ArrayList<>();
    }
}
