'use client'

import { useEffect, useState } from "react";

export const DashboardNavigationTabs = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes("/dashboard/account-information")) {
            setActiveTab("account-information");
        } else if (path.includes("/dashboard/address-book")) {
            setActiveTab("address-book");
        } else if (path.includes("/dashboard/order-history")) {
            setActiveTab("order-history");
        }else if (path.includes("/dashboard/wishlist")) {
            setActiveTab("wishlist");
        }
    }, []);
    return (
        <section className="bg-card border border-secondary-200 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-primary-600 mb-6">Account Dashboard</h2>
            <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <li>
                    <a href="/dashboard/account-information" className={`block p-4 rounded-lg transition-colors duration-200 text-center group ${
                        activeTab === "account-information" 
                            ? "bg-primary-600 border-2 border-primary-700 shadow-lg" 
                            : "bg-primary-50 hover:bg-primary-100 border border-primary-200"
                    }`}>
                        <span className="text-primary-700 font-medium group-hover:text-primary-800">Account Information</span>
                    </a>
                </li>
                <li>
                    <a href="/dashboard/address-book" className={`block p-4 rounded-lg transition-colors duration-200 text-center group ${
                        activeTab === "address-book" 
                            ? "bg-secondary-600 border-2 border-secondary-700 shadow-lg" 
                            : "bg-secondary-50 hover:bg-secondary-100 border border-secondary-200"
                    }`}>
                        <span className="text-secondary-700 font-medium group-hover:text-secondary-800">Address Book</span>
                    </a>
                </li>
                <li>
                    <a href="/dashboard/order-history" className={`block p-4 rounded-lg transition-colors duration-200 text-center group ${
                        activeTab === "order-history" 
                            ? "bg-accent-600 border-2 border-accent-700 shadow-lg" 
                            : "bg-accent-50 hover:bg-accent-100 border border-accent-200"
                    }`}>
                        <span className="text-accent-700 font-medium group-hover:text-accent-800">My Orders</span>
                    </a>
                </li>
                <li>
                    <a href="/dashboard/wishlist" className={`block p-4 rounded-lg transition-colors duration-200 text-center group ${
                        activeTab === "wishlist" 
                            ? "bg-accent-600 border-2 border-accent-700 shadow-lg" 
                            : "bg-accent-50 hover:bg-accent-100 border border-accent-200"
                    }`}>
                        <span className="text-accent-700 font-medium group-hover:text-accent-800">Wishlist</span>
                    </a>
                </li>
            </ul>
        </section>
    )
};