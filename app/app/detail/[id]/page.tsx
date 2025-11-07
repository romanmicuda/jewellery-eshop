'use client'

import { useGlobalContext } from '@/app/contexts/GlobalContext'
import { DescriptionReviews } from '@/components/DescriptionReviews'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProductDetail from '@/components/ProductDetail'
import { Product } from '@/utils/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function page() {
    const { product, fetchProduct } = useGlobalContext()
    const params = useParams()

    useEffect(() => {
        fetchProduct?.(params.id)
    }, [])

    return (
        <>
            {product && (
                <>
                    <Header />
                    <ProductDetail detail={product} />
                    <DescriptionReviews detail={product} />
                    <Footer />
                </>
            )}
        </>
    )
}