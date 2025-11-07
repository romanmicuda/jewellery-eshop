'use client'

import { useEffect, useState } from "react"
import { Product } from "../utils/types"
import { ProductCard } from "./ProductCard"
import Link from "next/link"
import GlobalProvider, { useGlobalContext } from "@/app/contexts/GlobalContext"


export const ProductGrid = ({products}: {products: Product[]}) => {
 
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div key={`product-${product.id}-${index}`}>
                        <Link href={`/detail/${product.id}`}>
                            <ProductCard product={product} />
                        </Link>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center">
                    <p>No products found.</p>
                </div>
            )}
        </div>
    );
};