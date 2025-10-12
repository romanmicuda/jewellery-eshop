'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api, secureApi } from '../../utils/routes';
import axios from 'axios';

interface GlobalContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    signup: (data: any) => Promise<any>;
    signin: (data: any) => Promise<any>;
    logout: () => void;
    checkToken: () => Promise<boolean>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
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


    // Provide the context value
    const value: GlobalContextType = {
        isLoading,
        setIsLoading,
        signup,
        signin,
        logout,
        checkToken,
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