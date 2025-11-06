'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api, secureApi } from '../../utils/routes';
import { Product, FilterState, SortState, UserType } from '@/utils/types';

interface GlobalContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    signup: (data: any) => Promise<any>;
    signin: (data: any) => Promise<any>;
    logout: () => void;
    checkToken: () => Promise<boolean>;
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
    addToWishlist: (productId: string) => void;
    user: UserType | null;
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
        priceRange: {}
    });
    const [sort, setSort] = useState<SortState>({
        sortBy: 'name',
        sortDir: 'asc'
    });

    const [user, setUser] = useState<UserType | null>(null);

    // Check token validity on mount
    useEffect(() => {
        const validateToken = async () => {
            if ((window.location.pathname !== '/signin') && (window.location.pathname !== '/') && 
            (window.location.pathname !== '/signup') && (window.location.pathname !== "/product-list")) {
                const isValid = await checkToken();
                if (!isValid) {
                    console.log("Token is not valid, logging out...");
                    logout();
                }
            }
        };
        
        validateToken();
    }, []);

    const signup = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await secureApi.post('/api/auth/signup', data);
            if (response.status === 200) {
                window.location.href = '/signin';
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signin = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await secureApi.post('/api/auth/signin', data);
            if (response.status === 200) {
                api.setToken(response.data.token);
                window.location.href = '/product-list';
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    
    const logout = () => {
        api.clearToken();
        window.location.href = '/signin';
    };
    
    const checkToken = async (): Promise<boolean> => {
        try {
            // If there's no token, return false
            const token = api.getToken();

            if (!token){
                return false;
            }
            
            const response = await secureApi.post('/api/auth/verify', { token });
            return response.status === 200
        } catch (error) {
            // If verification fails, log out
            logout();
            return false;
        }
    };

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
            priceRange: {}
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

    const addToWishlist = async (productId: string) => {
        try {
            const response = await secureApi.post(`/api/users/wishlist`, { productId });
            if (response.status === 200) {
                setUser(response.data);
            }
        }
        catch (error) {
            alert('Failed to add product to wishlist.');
        }
    }


    // Provide the context value
    const value: GlobalContextType = {
        isLoading,
        setIsLoading,
        signup,
        signin,
        logout,
        checkToken,
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
        addToWishlist,
        user,
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