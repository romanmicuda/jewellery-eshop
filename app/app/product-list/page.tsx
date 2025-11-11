'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header"
import { MainContent } from "@/components/MainContent";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductList = () => {
    const searchParams = useSearchParams();
    const { updateFilters, filters } = useGlobalContext();
    const [isInitialized, setIsInitialized] = useState(false);
    
    // Mimic the handleCategoryChange logic from FiltersSidebar
    const handleCategoryChange = (category: string, checked: boolean) => {
        // Only allow single selection for category (same as FiltersSidebar)
        const updatedCategories = checked ? [category.toUpperCase()] : [];
        updateFilters({ categories: updatedCategories });
    };
    
    useEffect(() => {
        const category = searchParams.get('category');
        const searchQuery = searchParams.get('search');
        
        // Only run this effect once when the component mounts or URL changes
        if (!isInitialized) {
            setIsInitialized(true);
            
            if (category) {
                // Check if the current filter already matches the category
                const currentCategory = filters.categories[0];
                const upperCaseCategory = category.toUpperCase();
                
                if (currentCategory !== upperCaseCategory) {
                    // Use the same logic as FiltersSidebar handleCategoryChange
                    handleCategoryChange(category, true);
                }
            } else {
                // If no category in URL, clear the category filter
                handleCategoryChange('', false);
            }
            
            if (searchQuery) {
                // Check if the current search filter already matches the query
                if (filters.search !== searchQuery) {
                    updateFilters({ search: searchQuery });
                }
            } else if (filters.search) {
                // If no search in URL, clear the search filter
                updateFilters({ search: '' });
            }
        }
    }, [searchParams?.get('category'), searchParams?.get('search'), isInitialized, filters.categories, filters.search]);

    // Reset initialization when URL changes
    useEffect(() => {
        setIsInitialized(false);
    }, [searchParams?.get('category'), searchParams?.get('search')]);

    return (
        <>
        <Header />
        <MainContent />
        <Footer />
        </>
    )
}

export default ProductList;