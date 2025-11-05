'use client'

import { useEffect, useState } from "react"
import { Product } from "../utils/types"
import { ProductCard } from "./ProductCard"
import Link from "next/link"
import GlobalProvider, { useGlobalContext } from "@/app/contexts/GlobalContext"


export const ProductGrid = () => {
    const { fetchProducts, products, isLoading } = useGlobalContext();

    useEffect(() => {
        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-lg">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products.map(product => (
                <Link key={product.id} href={`/detail/${product.id}`}>
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    );
};