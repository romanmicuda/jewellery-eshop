package com.eshop.app.address.data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.eshop.app.order.data.Order;
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
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID addressId;
    private String firstName;
    private String lastName;
    private String company;
    private String phoneNumber;
    private String streetAddress;
    private String country;
    private String stateProvince;
    private String zipPostalCode;
    private boolean isDefaultBilling;
    private boolean isDefaultShipping;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "address")
    private List<Order> orders;

    public Address(){
        this.orders = new ArrayList<>();
    }
}
