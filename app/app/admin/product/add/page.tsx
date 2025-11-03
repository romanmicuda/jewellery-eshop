'use client'

import { useAdmin } from "@/app/contexts/AdminContext"
import ProductForm, { Product } from "@/components/admin/Product"

const page = () => {

    const { addProduct } = useAdmin()
    const handleCancel = () => {
        console.log('Cancelled')
    }

    const handleSubmit = (product: Product) => {
        addProduct(product)
    }

    return (
        <div className="p-10">

            <ProductForm
                onCancel={handleCancel} 
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default page
