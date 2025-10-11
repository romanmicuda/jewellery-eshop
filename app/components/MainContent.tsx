'use client'

import { FiltersSidebar } from "./FiltersSidebar"
import { ProductGrid } from "./ProductGrid"

export const MainContent = () => {
    return (
        <div className="flex min-h-screen bg-background">
            <FiltersSidebar />
            <div className="flex-1">
                <ProductGrid />
            </div>
        </div>
    )
}