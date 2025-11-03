"use client";

import { Product } from "@/components/admin/Product";
import { secureApi } from "@/utils/routes";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { set } from "react-hook-form";

type AdminContextValue = {
    addProduct?: (product: Product) => void;
    updateProduct?: (product: Product) => void;
    deleteProduct?: (productId: string) => void;
    uploadImage?: (file: File) => Promise<string>;
};

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [product, setProduct] = useState<Product | null>(null);

    const addProduct = (product: Product) => {
        try{
        const response = secureApi.post("/api/products", product);
        setProduct(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    const updateProduct = (product: Product) => {
        try {
            const response = secureApi.put(`/api/products/${product.id}`, product);
            setProduct(response.data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    const deleteProduct = (productId: string) => {
        try {
            secureApi.delete(`/api/products/${productId}`);
            setProduct(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await secureApi.post('/api/uploads/images', formData);
            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const value: AdminContextValue = {
        addProduct,
        updateProduct,
        deleteProduct,
        uploadImage
    };

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = (): AdminContextValue => {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
    return ctx;
};