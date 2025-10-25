import { api, secureApi } from '@/utils/routes';
import { UserType } from '@/utils/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type DashboardState = {
    fetchUser: () => Promise<UserType>;
};

const DashboardContext = createContext<DashboardState | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const fetchUser = async () => {
        const response = await secureApi.get('api/users/me');
        return response.data;
    }

    return (
        <DashboardContext.Provider value={{ fetchUser }}>
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