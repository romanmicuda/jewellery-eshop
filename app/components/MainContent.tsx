'use client'

import { FiltersSidebar } from "./FiltersSidebar"
import { ProductGrid } from "./ProductGrid"
import { SortControls } from "./SortControls"
import { Pagination } from "./Pagination"

export const MainContent = () => {
    return (
        <div className="flex min-h-screen bg-background">
            <FiltersSidebar />
            <div className="flex-1 flex flex-col">
                <SortControls />
                <div className="flex-1">
                    <ProductGrid />
                </div>
                <Pagination />
            </div>
        </div>
    )
}