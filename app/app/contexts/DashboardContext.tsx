import { api, secureApi } from '@/utils/routes';
import { UserType } from '@/utils/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type DashboardState = {
    fetchUser: () => void
    user: UserType | null
    updateAccountInformation: (data: UserType) => void
};

const DashboardContext = createContext<DashboardState | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const fetchUser = async () => {
        try {
            const response = await secureApi.get('api/users/me');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const updateAccountInformation = async (data: UserType) => {
        try {
            const response = await secureApi.put(`api/users/${user?.id}`, data);
            setUser(response.data);
        }
        catch (error) {
            console.error('Error updating user information:', error);
        }
    }


    return (
        <DashboardContext.Provider value={{ fetchUser, user, updateAccountInformation }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};