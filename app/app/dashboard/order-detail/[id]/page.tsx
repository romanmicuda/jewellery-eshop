'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { secureApi } from "@/utils/routes";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Package, Calendar, CreditCard, MapPin, ArrowLeft, Truck, X } from "lucide-react";
import Link from "next/link";

interface Order {
  orderId: string;
  orderDate: string;
  deliveryDate?: string;
  totalAmount: number;
  status: string;
  orderDetails: OrderDetail[];
  address?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    streetAddress: string;
    zipPostalCode: string;
  };
}

interface OrderDetail {
  orderDetailId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
  };
}

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchOrderDetail(params.id as string);
    }
  }, [params.id]);

  const fetchOrderDetail = async (orderId: string) => {
    try {
      const response = await secureApi.get(`/api/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    
    if (!confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }
    
    setCancelling(true);
    try {
      await secureApi.delete(`/api/orders/${order.orderId}`);
      // Refresh the order data to show updated status
      await fetchOrderDetail(order.orderId);
      alert('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const canCancelOrder = (status: string) => {
    const cancelableStatuses = ['pending', 'processing'];
    return cancelableStatuses.includes(status.toLowerCase());
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Package className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Order not found</h2>
                <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
                <Link href="/dashboard/order-history">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const subtotal = order.orderDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const shipping = 0; // Free shipping

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/order-history">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Order #{order.orderId.slice(-8)}</h1>
              <p className="text-muted-foreground">
                Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                {getStatusIcon(order.status)}
                {order.status}
              </Badge>
              {order.deliveryDate && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                </div>
              )}
            </div>
            
            {canCancelOrder(order.status) && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.orderDetails.map((detail) => (
                    <div key={detail.orderDetailId} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={`${process.env.NEXT_PUBLIC_URL}${detail.product.images[0]}`}
                        alt={detail.product.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{detail.product.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{detail.product.category}</p>
                        <p className="text-sm text-muted-foreground overflow-hidden">
                          {detail.product.description.length > 100 
                            ? `${detail.product.description.substring(0, 100)}...` 
                            : detail.product.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-muted-foreground">
                            Quantity: {detail.quantity}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Unit Price: ${detail.unitPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${detail.subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Shipping */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({order.orderDetails.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            {order.address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">{order.address.phoneNumber}</p>
                    <p className="text-sm text-muted-foreground">{order.address.streetAddress}</p>
                    <p className="text-sm text-muted-foreground">{order.address.zipPostalCode}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
