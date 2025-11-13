'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { api, secureApi } from '../../utils/routes';
import { UserType } from '@/utils/types';

interface AuthContextType {
    user: UserType | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signin: (data: any) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    checkToken: () => Promise<boolean>;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

// Define routes that require authentication
const PROTECTED_ROUTES = [
    '/dashboard',
    '/favorites',
    '/cart/checkout', // Add checkout routes that need authentication
];

// Define routes that should redirect authenticated users
const PUBLIC_ROUTES = ['/signin', '/signup'];

// Define routes that require admin access
const ADMIN_ROUTES = [
    '/admin/product/edit',
    '/admin/product/add',
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const pathname = usePathname();

    // Helper function to check if route requires authentication
    const requiresAuth = (path: string): boolean => {
        return PROTECTED_ROUTES.some(route => path.startsWith(route));
    };

    // Helper function to check if route should redirect authenticated users
    const isPublicRoute = (path: string): boolean => {
        return PUBLIC_ROUTES.some(route => path.startsWith(route));
    };

    // Helper function to check if route requires admin access
    const requiresAdmin = (path: string): boolean => {
        return ADMIN_ROUTES.some(route => path.startsWith(route));
    };

    // Check token validity and handle routing
    const validateAndRoute = async () => {
        setIsLoading(true);
        
        try {
            const token = api.getToken();
            
            // If no token exists
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                
                // Redirect to signin if trying to access protected route or admin route
                if (requiresAuth(pathname) || requiresAdmin(pathname)) {
                    router.push('/signin');
                    return;
                }
                
                setIsLoading(false);
                return;
            }

            // Verify token
            const isValid = await checkToken();
            
            if (isValid) {
                setIsAuthenticated(true);
                
                // Fetch user data first to check admin status
                await fetchUser();
                
                // Get current user data for admin check
                const userResponse = await secureApi.get('/api/users/me');
                const currentUser = userResponse.data;
                
                // Check if route requires admin access
                if (requiresAdmin(pathname) && (!currentUser || !currentUser.admin)) {
                    router.push('/');
                    return;
                }
                
                // Redirect authenticated users away from signin/signup pages
                if (isPublicRoute(pathname)) {
                    router.push('/product-list');
                    return;
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
                
                // Redirect to signin if trying to access protected route or admin route
                if (requiresAuth(pathname) || requiresAdmin(pathname)) {
                    router.push('/signin');
                    return;
                }
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            setIsAuthenticated(false);
            setUser(null);
            
            if (requiresAuth(pathname) || requiresAdmin(pathname)) {
                router.push('/signin');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Run auth check on mount and route changes
    useEffect(() => {
        validateAndRoute();
    }, [pathname]);

    const signup = async (data: any): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await secureApi.post('/api/auth/signup', data);
            console.log('Signup response:', response);
            if (response.status === 200) {
                router.push('/signin');
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signin = async (data: any): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await secureApi.post('/api/auth/signin', data);
            console.log('Signin response:', response);
            if (response.status === 200) {
                api.setToken(response.data.token);
                setIsAuthenticated(true);
                await fetchUser();
                router.push('/product-list');
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    
    const logout = () => {
        api.clearToken();
        setIsAuthenticated(false);
        setUser(null);
        router.push('/signin');
    };
    
    const checkToken = async (): Promise<boolean> => {
        try {
            const token = api.getToken();
            if (!token) {
                return false;
            }
            
            const response = await secureApi.post('/api/auth/verify', { token });
            return response.status === 200;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    };

    const fetchUser = async (): Promise<void> => {
        try {
            const response = await secureApi.get('/api/users/me');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        signin,
        signup,
        logout,
        checkToken,
        fetchUser,
    };

    // Show loading screen while checking authentication
    if (isLoading && (requiresAuth(pathname) || isPublicRoute(pathname) || requiresAdmin(pathname))) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Custom hook to check if user can proceed to checkout
export const useCheckout = () => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    const canProceedToCheckout = (): boolean => {
        return isAuthenticated && user !== null;
    };

    const handleCheckoutRedirect = () => {
        if (!canProceedToCheckout()) {
            router.push('/signup?redirect=checkout');
        }
        return canProceedToCheckout();
    };

    return {
        canProceedToCheckout,
        handleCheckoutRedirect,
    };
};

// Custom hook to check admin access
export const useAdmin = () => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    const isAdmin = (): boolean => {
        return isAuthenticated && user !== null && user.admin === true;
    };

    const requireAdminAccess = () => {
        if (!isAdmin()) {
            router.push('/');
            return false;
        }
        return true;
    };

    return {
        isAdmin,
        requireAdminAccess,
    };
};

export default AuthProvider;
