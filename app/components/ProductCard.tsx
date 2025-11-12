import { Product } from "@/utils/types"
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { useCart } from "@/app/contexts/CartContext";
import { useState } from "react";
import Link from "next/link";

export const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();
    const { user, toggleFavorite } = useGlobalContext();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        
        try {
            addToCart(product);
            // Simple feedback - could be enhanced with a toast notification
            setTimeout(() => setIsAdding(false), 500);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setIsAdding(false);
        }
    };

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (user) {
            toggleFavorite(product.id);
        }
    };

    const isFavorite = user?.favorites?.some(fav => fav.id === product.id);
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);
    
    return (
        <Link href={`/detail/${product.id}`} className="block">
            <div className="group bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden bg-gradient-to-br from-secondary-50 to-secondary-100">
                    <img 
                        src={`${process.env.NEXT_PUBLIC_URL}${product.images?.[0] || 'placeholder-product.jpg'}`} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200"
                    >
                        {isFavorite ? (
                            <IoIosHeart className="w-5 h-5 text-red-500" />
                        ) : (
                            <IoIosHeartEmpty className="w-5 h-5 text-gray-600" />
                        )}
                    </button>

                    {/* Discount Badge */}
                    {product.discountPercentage > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                            -{product.discountPercentage}%
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-card-foreground text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
                        {product.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-primary">
                                    ${discountedPrice.toFixed(2)}
                                </span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-sm text-muted-foreground line-through">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                                Free shipping
                            </span>
                        </div>
                        
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAdding || product.stockQuantity === 0}
                            className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                product.stockQuantity === 0 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : isAdding
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-sm'
                            }`}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {product.stockQuantity === 0 
                                ? 'Out of Stock' 
                                : isAdding 
                                    ? 'Added!' 
                                    : 'Add to Cart'
                            }
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <FaRegStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-accent' : 'text-secondary-300'}`} />
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">
                                (24 reviews)
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Stock: {product.stockQuantity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}