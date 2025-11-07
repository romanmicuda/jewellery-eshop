'use client'

import { FiltersSidebar } from "./FiltersSidebar"
import { ProductGrid } from "./ProductGrid"
import { SortControls } from "./SortControls"
import { Pagination } from "./Pagination"
import { useGlobalContext } from "@/app/contexts/GlobalContext"
import { useEffect } from "react"

export const MainContent = () => {
    const { fetchProducts, products, isLoading } = useGlobalContext();

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="flex min-h-screen bg-background">
            <FiltersSidebar />
            <div className="flex-1 flex flex-col">
                <SortControls />
                <div className="flex-1">
                    <ProductGrid products={products} />
                </div>
                <Pagination />
            </div>
        </div>
    )
}