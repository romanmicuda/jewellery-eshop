'use client'

import { DashboardProvider, useDashboard } from "@/app/contexts/DashboardContext";
import { useAuth } from "@/app/contexts/AuthContext";
import { DashboardNavigationTabs } from "@/components/DashboardNavigationTabs";
import { ProductGrid } from "@/components/ProductGrid";
import { useEffect } from "react";

export default function page() {
    const { user, fetchUser } = useAuth();

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-secondary-100 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-primary-700 mb-2">My Wishlist</h1>
                    <p className="text-neutral-600">Your favorite products saved for later</p>
                </div>

                <DashboardNavigationTabs />
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Saved Items</h2>
                    <ProductGrid  products={user?.wishlist || []}/>
                </div>
            </div>
        </div>
    );
}
