'use client'

import { useParams } from 'next/navigation'
import { useAdmin } from '@/app/contexts/AdminContext'
import { useEffect } from 'react'
import ProductForm, { Product } from "@/components/admin/Product"

const page = () => {
    const params = useParams()

    const { fetchProduct, product, updateProduct } = useAdmin()

    useEffect(() => {
        fetchProduct?.(params.id)
    }, [])

    const handleCancel = () => {
        location.href = '/product-list'
    }

    const handleSubmit = (product: Product) => {
        updateProduct?.(product)
    }

    return (
        <div className="p-10">
            <ProductForm
                onCancel={handleCancel} 
                onSubmit={handleSubmit}
                isEditing={true}
                product={product || undefined}
            />
        </div>
    )
}

export default page
