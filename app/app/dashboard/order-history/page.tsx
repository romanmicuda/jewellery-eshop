'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { secureApi } from "@/utils/routes";
import { useEffect, useState } from "react";
import { Package, Calendar, CreditCard, MapPin } from "lucide-react";
import Link from "next/link";

interface Order {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  orderDetails: OrderDetail[];
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

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await secureApi.get('/api/orders');
      setOrders(response.data.content || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Order History</h1>
          <p className="text-muted-foreground">Track and manage your order history</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <Package className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">When you place your first order, it will appear here.</p>
                <Link href="/product-list">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.orderId} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">Order #{order.orderId.slice(-8)}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          ${order.totalAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <Link href={`/dashboard/order-detail/${order.orderId}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {order.orderDetails?.map((detail) => (
                      <div key={detail.orderDetailId} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={`${process.env.NEXT_PUBLIC_URL}${detail.product.images[0]}`}
                          alt={detail.product.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{detail.product.name}</h4>
                          <p className="text-sm text-muted-foreground">{detail.product.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-muted-foreground">
                              Qty: {detail.quantity}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              × ${detail.unitPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${detail.subtotal.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Order tracking available
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;