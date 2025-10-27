import { api, secureApi } from '@/utils/routes';
import { ChangePasswordRequest, UserType, AddressRequest, NewsletterPreferencesRequest } from '@/utils/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { set } from 'react-hook-form';

type DashboardState = {
    fetchUser: () => void
    user: UserType | null
    updateAccountInformation: (data: UserType) => void
    changePassword: (data: ChangePasswordRequest) => void
    updateShippingAddress: (data: AddressRequest) => void
    updateBillingAddress: (data: AddressRequest) => void
    updateNewsletterPreferences: (data: NewsletterPreferencesRequest) => void
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

    const changePassword = async (data: ChangePasswordRequest) => {
        try {
            const response = await secureApi.put(`api/users/change-password`, { oldPassword: data.oldPassword, newPassword: data.newPassword});
            console.log('Password changed successfully');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    }

    const updateShippingAddress = async (data: AddressRequest) => {
        try {
            const response = await secureApi.put(`api/users/shipping-address`, data);
            setUser(response.data);
            console.log('Shipping address updated successfully');
        } catch (error) {
            console.error('Error updating shipping address:', error);
        }
    }

    const updateBillingAddress = async (data: AddressRequest) => {
        try {
            const response = await secureApi.put(`api/users/billing-address`, data);
            console.log(data)
            setUser(response.data);
            console.log('Billing address updated successfully');
        } catch (error) {
            console.error('Error updating billing address:', error);
        }
    }
    const updateNewsletterPreferences = async (data: NewsletterPreferencesRequest) => {
        try {
            const response = await secureApi.put(`api/users/newsletter-preferences`, data);
            setUser(response.data);
            console.log('Newsletter preferences updated successfully');
        } catch (error) {
            console.error('Error updating newsletter preferences:', error);
        }
    }

    return (
        <DashboardContext.Provider value={{ fetchUser, user, updateAccountInformation, changePassword, updateShippingAddress, updateBillingAddress, updateNewsletterPreferences }}>
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