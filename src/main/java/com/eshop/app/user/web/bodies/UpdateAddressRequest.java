package com.eshop.app.user.web.bodies;

import lombok.Data;

@Data
public class UpdateAddressRequest {
    private String streetAddress;
    private String city;
    private String zipCode;  
}
