'use client'

import Product from "@/components/admin/Product"

const page = () => {
    const handleCancel = () => {
        console.log('Cancelled')
        // Add navigation logic here, e.g., router.push('/admin/products')
    }

    const handleSubmit = (product: any) => {
        console.log('Submitted', product)
        // Add API call logic here to save the product
    }

    return (
        <>
            <Product 
                onCancel={handleCancel} 
                onSubmit={handleSubmit}
                isEditing={true}
            />
        </>
    )
}

export default page
