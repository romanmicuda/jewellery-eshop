'use client'

import { DescriptionReviews } from '@/components/DescriptionReviews'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProductDetail from '@/components/ProductDetail'
import { ProductDetailType } from '@/utils/types'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function page() {
    const [detail, setDetail] = useState<ProductDetailType>(
        {
            id: 1,
            name: "Product Name",
            color: "Red",
            price: 100,
            freeShipping: true,
            image: "/path/to/image.jpg",
            description: "Product Description",
            reviews: [
                { user: "Alice", title: "Great Product", comment: "I loved it!", rating: 5 },
                { user: "Bob", title: "Good Value", comment: "Worth the price.", rating: 4 },
            ],
            customerFeedback: {
                productRating: 4.5,
                totalReviews: 100,
                fiveStarPercentage: 70,
                fourStarPercentage: 20,
                threeStarPercentage: 5,
                twoStarPercentage: 3,
                oneStarPercentage: 2,
            },
        }
    );
    const params = useParams()
    return (
        <>
        <Header />
        <ProductDetail detail={detail} />
        <DescriptionReviews detail={detail} />
        <Footer />
        </>
    )
}
