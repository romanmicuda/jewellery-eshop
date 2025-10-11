import { ProductDetailType } from "@/utils/types"
import { colors } from "@/lib/colors"
import { useState } from "react"

export const DescriptionReviews = ({ detail }: { detail: ProductDetailType }) => {
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

    const tabs = [
        { id: 'description', label: 'Description', hasContent: true },
        { id: 'reviews', label: 'Reviews', hasContent: detail.reviews && detail.reviews.length > 0 }
    ].filter(tab => tab.hasContent)

    return (
        <div className="w-full max-w-4xl mx-auto mt-12">
            <div className="border-b" style={{ borderColor: colors.secondary[200] }}>
                <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'description' | 'reviews')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 focus:outline-none ${
                                activeTab === tab.id 
                                    ? 'border-current' 
                                    : 'border-transparent hover:border-current'
                            }`}
                            style={{
                                color: activeTab === tab.id ? colors.primary[600] : colors.neutral[600],
                                borderBottomColor: activeTab === tab.id ? colors.primary[600] : 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = colors.neutral[800];
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== tab.id) {
                                    e.currentTarget.style.color = colors.neutral[600];
                                }
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-8">
                {activeTab === 'description' && (
                    <div className="space-y-6">
                        <h2 
                            className="text-2xl font-bold"
                            style={{ color: colors.neutral[900] }}
                        >
                            Product Description
                        </h2>
                        <div 
                            className="text-base leading-relaxed prose max-w-none"
                            style={{ color: colors.neutral[700] }}
                        >
                            <p>{detail.description}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && detail.reviews && detail.reviews.length > 0 && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 
                                className="text-2xl font-bold"
                                style={{ color: colors.neutral[900] }}
                            >
                                Customer Reviews
                            </h2>
                            <span 
                                className="text-sm"
                                style={{ color: colors.neutral[600] }}
                            >
                                {detail.reviews.length} {detail.reviews.length === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {detail.reviews.map((review, index) => (
                                <div 
                                    key={index}
                                    className="p-6 rounded-lg border"
                                    style={{ 
                                        backgroundColor: colors.neutral[50],
                                        borderColor: colors.secondary[200]
                                    }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="space-y-1">
                                            <h3 
                                                className="font-semibold text-lg"
                                                style={{ color: colors.neutral[900] }}
                                            >
                                                {review.title}
                                            </h3>
                                            <p 
                                                className="text-sm"
                                                style={{ color: colors.neutral[600] }}
                                            >
                                                By {review.user}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className="w-5 h-5"
                                                    fill={star <= review.rating ? colors.jewelry.gold : colors.neutral[300]}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span 
                                                className="ml-2 text-sm font-medium"
                                                style={{ color: colors.neutral[700] }}
                                            >
                                                {review.rating}/5
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p 
                                        className="text-base leading-relaxed"
                                        style={{ color: colors.neutral[700] }}
                                    >
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t" style={{ borderColor: colors.secondary[200] }}>
                            <button
                                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                style={{
                                    backgroundColor: colors.secondary[200],
                                    color: colors.neutral[800]
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = colors.secondary[300];
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = colors.secondary[200];
                                }}
                            >
                                Write a Review
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}