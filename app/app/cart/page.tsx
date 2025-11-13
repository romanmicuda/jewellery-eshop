'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../contexts/CartContext";
import { useAuth, useCheckout } from "../contexts/AuthContext";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems,
    createOrder,
    orderTotal,
    isLoading 
  } = useCart();
  
  const { user, fetchUser } = useAuth();
  const { handleCheckoutRedirect } = useCheckout();
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  // Fetch user data when component mounts
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Check if user is authenticated before proceeding to checkout
    if (handleCheckoutRedirect()) {
      setShowCheckout(true);
    }
  };

  const onSubmitOrder = async () => {
    try {
      // Create the order without any form data
      const order = await createOrder({});
      
      alert('Order placed successfully!');
      router.push('/dashboard/order-history');
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/product-list">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {orderTotal?.items?.map((item: any) => (
                      <div key={item.productId} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                        {/* Find the cart item to get the product image */}
                        {(() => {
                          const cartItem = cartItems.find(ci => ci.product.id === item.productId);
                          return (
                            <>
                              <img
                                src={`${process.env.NEXT_PUBLIC_URL}${cartItem?.product.images[0] || 'placeholder.jpg'}`}
                                alt={item.productName}
                                className="h-16 w-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.productName}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.discountedPrice.toFixed(2)}
                                  {item.discountPercentage > 0 && (
                                    <span className="ml-2 text-red-500">
                                      (-{item.discountPercentage}% off)
                                    </span>
                                  )}
                                </p>
                              </div>
                              <p className="font-medium">
                                ${item.itemTotal.toFixed(2)}
                              </p>
                            </>
                          );
                        })()}
                      </div>
                    )) || cartItems.map((item) => {
                      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
                      return (
                        <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                          <img
                            src={`${process.env.NEXT_PUBLIC_URL}${item.product.images[0]}`}
                            alt={item.product.name}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${discountedPrice.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(discountedPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>${orderTotal ? orderTotal.subtotal.toFixed(2) : getTotalPrice().toFixed(2)}</span>
                    </div>
                    {orderTotal && orderTotal.tax > 0 && (
                      <div className="flex justify-between">
                        <span>Tax (8%)</span>
                        <span>${orderTotal.tax.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${orderTotal ? orderTotal.total.toFixed(2) : getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Simple Order Confirmation */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Your order will be shipped to your saved billing address.
                      </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowCheckout(false)}
                        className="flex-1"
                      >
                        Back to Cart
                      </Button>
                      <Button 
                        onClick={onSubmitOrder}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        {isLoading ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6" />
                  Shopping Cart ({getTotalItems()} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
                    return (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={`${process.env.NEXT_PUBLIC_URL}${item.product.images[0]}`}
                          alt={item.product.name}
                          className="h-24 w-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{item.product.name}</h3>
                          <p className="text-muted-foreground">{item.product.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
                            {item.product.discountPercentage > 0 && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ${(discountedPrice * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${orderTotal ? orderTotal.subtotal.toFixed(2) : getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  {orderTotal && orderTotal.tax > 0 ? (
                    <div className="flex justify-between">
                      <span>Tax (8%)</span>
                      <span>${orderTotal.tax.toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="text-muted-foreground">Calculated at checkout</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderTotal ? orderTotal.total.toFixed(2) : getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  {/* Show loading indicator when calculating */}
                  {isLoading && (
                    <div className="text-center text-sm text-muted-foreground">
                      Calculating prices...
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <div className="text-center">
                  <Link href="/product-list">
                    <Button variant="link">Continue Shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;