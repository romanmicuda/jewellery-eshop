'use client'

import { ProductGrid } from "@/components/ProductGrid"
import React from "react"
import { useGlobalContext } from "../contexts/GlobalContext"
const FavoritesPage = () => {
    const {user} = useGlobalContext();
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
            <ProductGrid products={user?.favorites || []}/>
        </div>
    )
}

export default FavoritesPage