'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api, secureApi } from '../../utils/routes';
import { Product, FilterState, SortState } from '@/utils/types';

interface GlobalContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    fetchProducts: (filters?: FilterState, sort?: SortState, page?: number, size?: number) => void;
    fetchProduct: (id: string) => void;
    products: Product[];
    product: Product | null;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalElements: number;
    filters: FilterState;
    updateFilters: (filters: Partial<FilterState>) => void;
    clearFilters: () => void;
    sort: SortState;
    updateSort: (sort: Partial<SortState>) => void;
    goToPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    changePageSize: (size: number) => void;
    toggleWishlist: (productId: string) => void;
    toggleFavorite: (productId: string) => void;
    search: (query: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(12);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [product, setProduct ] = useState<Product | null>(null);
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        materials: [],
        gemstones: [],
        sizes: [],
        priceRange: {},
        search: ''
    });
    const [sort, setSort] = useState<SortState>({
        sortBy: 'name',
        sortDir: 'asc'
    });

    // Remove the auth-related useEffect and functions

    const fetchProducts = async (
        customFilters?: FilterState, 
        customSort?: SortState, 
        page: number = currentPage, 
        size: number = pageSize
    ) => {
        setIsLoading(true);
        try {
            const activeFilters = customFilters || filters;
            const activeSort = customSort || sort;
            
            // Build query parameters
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('size', size.toString());
            params.append('sortBy', activeSort.sortBy);
            params.append('sortDir', activeSort.sortDir);
            
            // Add filter parameters (using only first selected value for each filter type)
            if (activeFilters.categories.length > 0) {
                params.append('category', activeFilters.categories[0]);
            }
            if (activeFilters.materials.length > 0) {
                params.append('material', activeFilters.materials[0]);
            }
            if (activeFilters.gemstones.length > 0) {
                params.append('gemstone', activeFilters.gemstones[0]);
            }
            if (activeFilters.sizes.length > 0) {
                params.append('sizeParam', activeFilters.sizes[0]);
            }
            if (activeFilters.brand) {
                params.append('brand', activeFilters.brand);
            }
            if (activeFilters.search && activeFilters.search.trim() !== '') {
                params.append('name', activeFilters.search.trim());
            }
            
            const response = await secureApi.get(`/api/products?${params.toString()}`);
            setProducts(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
            setCurrentPage(response.data.number || 0);
            setTotalElements(response.data.totalElements || 0);
            setPageSize(response.data.size || size);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const updateFilters = (newFilters: Partial<FilterState>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        fetchProducts(updatedFilters, sort, 0);
    };

    const clearFilters = () => {
        const clearedFilters: FilterState = {
            categories: [],
            materials: [],
            gemstones: [],
            sizes: [],
            priceRange: {},
            search: ''
        };
        setFilters(clearedFilters);
        fetchProducts(clearedFilters, sort, 0);
    };

    const updateSort = (newSort: Partial<SortState>) => {
        const updatedSort = { ...sort, ...newSort };
        setSort(updatedSort);
        fetchProducts(filters, updatedSort, 0);
    };

    const goToPage = (page: number) => {
        if (page >= 0 && page < totalPages) {
            fetchProducts(filters, sort, page, pageSize);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            fetchProducts(filters, sort, currentPage + 1, pageSize);
        }
    };

    const previousPage = () => {
        if (currentPage > 0) {
            fetchProducts(filters, sort, currentPage - 1, pageSize);
        }
    };

    const changePageSize = (size: number) => {
        setPageSize(size);
        fetchProducts(filters, sort, 0, size);
    };

    const fetchProduct = async (id: string) => {
        try {
            const response = await secureApi.get(`/api/products/${id}`);
            setProduct(response.data)
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    const toggleWishlist = async (productId: string) => {
        try {
            await secureApi.post(`/api/users/wishlist`, { productId });
            // Wishlist updated on server, could emit an event or refresh user data if needed
        }
        catch (error) {
            alert('Failed to add product to wishlist.');
        }
    }

    const toggleFavorite = async (productId: string) => {
        try {
            await secureApi.post(`/api/users/favorites`, {productId})
            // Favorites updated on server, could emit an event or refresh user data if needed
        }catch (error) {
            alert("Failed to add product to Favorites.")
        }
    }

    const search = (query: string) => {
        updateFilters({ search: query });
    }


    // Provide the context value
    const value: GlobalContextType = {
        isLoading,
        setIsLoading,
        fetchProducts,
        products,
        totalPages,
        currentPage,
        pageSize,
        totalElements,
        filters,
        updateFilters,
        clearFilters,
        sort,
        updateSort,
        goToPage,
        nextPage,
        previousPage,
        changePageSize,
        fetchProduct,
        product,
        toggleWishlist,
        toggleFavorite,
        search,
    };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

// Custom hook to use the context
export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

export default GlobalProvider;