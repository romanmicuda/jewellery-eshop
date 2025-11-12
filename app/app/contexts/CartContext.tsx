'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { secureApi } from '../../utils/routes';
import { Product } from '@/utils/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isLoading: boolean;
  createOrder: (shippingAddress: any) => Promise<any>;
  calculateOrderTotal: () => Promise<any>;
  orderTotal: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderTotal, setOrderTotal] = useState<any>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, {
          id: `${product.id}-${Date.now()}`, // Generate unique ID
          product,
          quantity
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const createOrder = async (shippingAddress: any) => {
    setIsLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price * (1 - item.product.discountPercentage / 100)
        })),
        totalAmount: orderTotal ? orderTotal.total : getTotalPrice(), // Use backend total if available
        shippingAddress
      };

      const response = await secureApi.post('/api/orders', orderData);
      
      if (response.status === 200) {
        clearCart(); // Clear cart after successful order
        return response.data;
      }
      
      throw new Error('Failed to create order');
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const calculateOrderTotal = async () => {
    if (cartItems.length === 0) {
      setOrderTotal(null);
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      };

      const response = await secureApi.post('/api/orders/calculate-total', requestData);
      setOrderTotal(response.data);
      return response.data;
    } catch (error) {
      console.error('Error calculating order total:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate backend total when cart items change
  useEffect(() => {
    calculateOrderTotal();
  }, [cartItems]);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isLoading,
    createOrder,
    calculateOrderTotal,
    orderTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
