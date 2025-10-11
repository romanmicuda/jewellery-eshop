'use client'

import { useState } from "react"
import { Product } from "../utils/types"
import { ProductCard } from "./ProductCard"


export const ProductGrid = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "Product 1", description: "Description for product 1", price: 19.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 2, name: "Product 2", description: "Description for product 2", price: 29.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 3, name: "Product 3", description: "Description for product 3", price: 39.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 4, name: "Product 4", description: "Description for product 4", price: 49.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 5, name: "Product 5", description: "Description for product 5", price: 59.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 6, name: "Product 6", description: "Description for product 6", price: 69.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 7, name: "Product 7", description: "Description for product 7", price: 79.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 8, name: "Product 8", description: "Description for product 8", price: 89.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 9, name: "Product 9", description: "Description for product 9", price: 99.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 10, name: "Product 10", description: "Description for product 10", price: 109.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 11, name: "Product 11", description: "Description for product 11", price: 119.99, imageUrl: "https://via.placeholder.com/150" },
        { id: 12, name: "Product 12", description: "Description for product 12", price: 129.99, imageUrl: "https://via.placeholder.com/150" },
    ])

    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}

    </div>)
}