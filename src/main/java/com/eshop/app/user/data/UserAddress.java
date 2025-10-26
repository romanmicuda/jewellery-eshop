package com.eshop.app.user.data;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String streetAddress;
    private String city;
    private String zipCode;
}
