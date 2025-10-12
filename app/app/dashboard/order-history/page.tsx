'use client'

import { DashboardNavigationTabs } from "@/components/DashboardNavigationTabs";
import { useState } from "react";

export default function page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All orders");

    const orderStatuses = ["All orders", "Delivered", "Out For Delivery", "Processing", "Cancelled"];

    const orders = [
        {
            id: "ORD-001",
            status: "Delivered",
            deliveryDate: "Fri, 6 May 2022",
            paymentMethod: "Cash On Delivery",
            size: "34",
            returnWindow: "Tue, 24 May 2022",
            rating: null,
            image: "/api/placeholder/60/60"
        },
        {
            id: "ORD-002", 
            status: "Exchange Delivered",
            deliveryDate: "Fri, 6 May 2022",
            paymentMethod: "Cash On Delivery",
            size: "34",
            returnWindow: "Tue, 24 May 2022",
            rating: 3,
            image: "/api/placeholder/60/60"
        },
        {
            id: "ORD-003",
            status: "Delivered",
            deliveryDate: "Fri, 6 May 2022", 
            paymentMethod: "Cash On Delivery",
            size: "34",
            returnWindow: "Tue, 24 May 2022",
            rating: 5,
            image: "/api/placeholder/60/60"
        },
        {
            id: "ORD-004",
            status: "Exchange Delivered",
            deliveryDate: "Fri, 6 May 2022",
            paymentMethod: "Cash On Delivery",
            size: null,
            returnWindow: "Tue, 24 May 2022",
            rating: null,
            image: "/api/placeholder/60/60"
        }
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.status.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === "All orders" || order.status.includes(selectedFilter);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-secondary-100 p-6">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-primary-700 mb-2">My Dashboard</h1>
                    <p className="text-neutral-600">Manage your account and preferences</p>
                </div>

                <DashboardNavigationTabs />


                <section className="bg-card border border-secondary-200 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-primary-600">My Orders</h2>
                    </div>
                    
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 placeholder-neutral-500 transition-colors duration-200"
                                />
                            </div>
                            <div className="md:w-48">
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-neutral-800 transition-colors duration-200"
                                >
                                    {orderStatuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-neutral-500">No orders found matching your criteria.</p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order.id} className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex flex-col md:flex-row gap-4">

                                        <div className="w-20 h-20 bg-neutral-200 rounded-lg flex items-center justify-center">
                                            <div className="text-neutral-400 text-xs">Product Image</div>
                                        </div>
                                        
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                            order.status.includes('Delivered') 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : order.status.includes('Out For Delivery')
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-neutral-600">
                                                        On {order.deliveryDate}
                                                    </p>
                                                    <p className="text-sm text-neutral-600">
                                                        {order.paymentMethod}
                                                    </p>
                                                    {order.size && (
                                                        <p className="text-sm text-neutral-600">
                                                            Size: {order.size}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-neutral-500 mt-1">
                                                        Exchange/Return Window Closed On {order.returnWindow}
                                                    </p>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-sm text-neutral-600 mb-1">Rate Product</div>
                                                    <div className="flex gap-1">
                                                        {order.rating ? (
                                                            [...Array(5)].map((_, i) => (
                                                                <span 
                                                                    key={i} 
                                                                    className={`text-lg ${
                                                                        i < order.rating ? 'text-yellow-400' : 'text-neutral-300'
                                                                    }`}
                                                                >
                                                                    ★
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <button className="text-primary-600 text-sm hover:underline">
                                                                Rate Now
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-neutral-200 flex gap-3">
                                        {order.status.includes('Delivered') && (
                                            <>
                                                <button className="px-4 py-2 text-sm text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                                                    Buy Again
                                                </button>
                                                <button className="px-4 py-2 text-sm text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
                                                    View Details
                                                </button>
                                            </>
                                        )}
                                        {order.status.includes('Out For Delivery') && (
                                            <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                                                Track Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}