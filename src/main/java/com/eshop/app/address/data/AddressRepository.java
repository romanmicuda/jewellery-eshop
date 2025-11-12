package com.eshop.app.address.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {
    List<Address> findByUserIdOrderByIsDefaultShippingDescIsDefaultBillingDesc(UUID userId);
    Optional<Address> findByUserIdAndIsDefaultShippingTrue(UUID userId);
    Optional<Address> findByUserIdAndIsDefaultBillingTrue(UUID userId);
}
