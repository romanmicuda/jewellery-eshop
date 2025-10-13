import { ProductDetailType } from "@/utils/types"
import { colors } from "@/lib/colors"

const ProductDetail = ({detail}: {detail: ProductDetailType}) => {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div className="space-y-6">

                    <div className="relative group">
                        <div 
                            className="aspect-square rounded-lg overflow-hidden shadow-lg"
                            style={{ 
                                backgroundColor: colors.neutral[100],
                                border: `1px solid ${colors.secondary[200]}`
                            }}
                        >
                            <img 
                                src={detail.image} 
                                alt={detail.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>


                    <div className="flex space-x-4">
                        {[1, 2, 3].map((_, index) => (
                            <div 
                                key={index}
                                className="w-20 h-20 rounded-md overflow-hidden cursor-pointer border transition-all duration-200 hover:shadow-md"
                                style={{ 
                                    backgroundColor: colors.neutral[100],
                                    borderColor: colors.secondary[200]
                                }}
                            >
                                <img 
                                    src={detail.image} 
                                    alt={`${detail.name} view ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="space-y-8">

                    <div className="space-y-4">
                        <h1 
                            className="text-4xl font-bold tracking-tight"
                            style={{ color: colors.neutral[900] }}
                        >
                            {detail.name}
                        </h1>
                        
                        <div className="flex items-center space-x-4">
                            <p 
                                className="text-3xl font-semibold"
                                style={{ color: colors.primary[600] }}
                            >
                                ${detail.price.toLocaleString()}
                            </p>
                            
                            {detail.freeShipping && (
                                <span 
                                    className="px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ 
                                        backgroundColor: colors.accent[100],
                                        color: colors.accent[700]
                                    }}
                                >
                                    Free Shipping
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="space-y-2">
                        <p 
                            className="text-sm font-medium"
                            style={{ color: colors.neutral[600] }}
                        >
                            Color
                        </p>
                        <p 
                            className="text-lg"
                            style={{ color: colors.neutral[800] }}
                        >
                            {detail.color}
                        </p>
                    </div>


                    <div className="space-y-4">
                        <h3 
                            className="text-lg font-semibold"
                            style={{ color: colors.neutral[800] }}
                        >
                            Description
                        </h3>
                        <p 
                            className="text-base leading-relaxed"
                            style={{ color: colors.neutral[600] }}
                        >
                            {detail.description}
                        </p>
                    </div>


                    <div className="space-y-4 pt-6">
                        <button
                            className="w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            style={{
                                backgroundColor: colors.primary[500],
                                color: colors.neutral[50]
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.primary[600];
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.primary[500];
                            }}
                        >
                            Add to Cart
                        </button>
                        
                        <button
                            className="w-full py-4 px-6 rounded-lg text-lg font-semibold border transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            style={{
                                backgroundColor: colors.neutral[50],
                                color: colors.primary[600],
                                borderColor: colors.primary[300]
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.primary[50];
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.neutral[50];
                            }}
                        >
                            Add to Wishlist
                        </button>
                    </div>


                    {detail.customerFeedback && (
                        <div 
                            className="p-6 rounded-lg space-y-4"
                            style={{ 
                                backgroundColor: colors.secondary[50],
                                border: `1px solid ${colors.secondary[200]}`
                            }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className="w-5 h-5"
                                            fill={star <= detail.customerFeedback!.productRating ? colors.jewelry.gold : colors.neutral[300]}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span 
                                    className="text-lg font-semibold"
                                    style={{ color: colors.neutral[800] }}
                                >
                                    {detail.customerFeedback.productRating}/5
                                </span>
                                <span 
                                    className="text-sm"
                                    style={{ color: colors.neutral[600] }}
                                >
                                    ({detail.customerFeedback.totalReviews} reviews)
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;