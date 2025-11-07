package com.eshop.app.user.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.eshop.app.address.data.Address;
import com.eshop.app.order.data.Order;
import com.eshop.app.product.data.Product;
import com.eshop.app.review.data.Review;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
@Getter
@Setter
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles;

  private String fullName;
  private String gender;
  private Date dateOfBirth;
  private String location;
  private String mobile;
  private String alternateMobile;
  @OneToOne(cascade = CascadeType.ALL)
  private UserAddress billingAddress;
  @OneToOne(cascade = CascadeType.ALL)
  private UserAddress shippingAddress;
  private boolean isActiveNewsletterSubscriber;


  @OneToMany(mappedBy = "user")
  private List<Address> addresses;

  @OneToMany(mappedBy = "user")
  private List<Order> orders;

  @ManyToMany
  @JoinTable(name = "user_wishlist", 
            joinColumns = @JoinColumn(name = "user_id"), 
            inverseJoinColumns = @JoinColumn(name = "product_id"))
  private List<Product> wishlist;

  @ManyToMany
  @JoinTable(name = "user_favorites", 
            joinColumns = @JoinColumn(name = "user_id"), 
            inverseJoinColumns = @JoinColumn(name = "product_id"))
  private List<Product> favorites;

  @OneToMany(mappedBy = "user")
  private List<Review> reviews;

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = new HashSet<>();
    this.addresses = new ArrayList<>();
    this.orders = new ArrayList<>();
    this.wishlist = new ArrayList<>();
    this.favorites = new ArrayList<>();
    this.reviews = new ArrayList<>();
    this.isActiveNewsletterSubscriber = false;
    this.billingAddress = new UserAddress();
    this.shippingAddress = new UserAddress();
  }

  public User(){
    this.roles = new HashSet<>();
    this.addresses = new ArrayList<>();
    this.orders = new ArrayList<>();
    this.wishlist = new ArrayList<>();
    this.favorites = new ArrayList<>();
    this.reviews = new ArrayList<>();
    this.isActiveNewsletterSubscriber = false;
    this.billingAddress = new UserAddress();
    this.shippingAddress = new UserAddress();
  }


}
