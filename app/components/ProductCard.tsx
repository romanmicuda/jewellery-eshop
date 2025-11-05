import { Product } from "@/utils/types"
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="group bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer">
            <div className="relative overflow-hidden bg-gradient-to-br from-secondary-50 to-secondary-100">
                <img 
                    src={product.images?.[0] || '/placeholder-product.jpg'} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <button className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-card">
                    <IoIosHeartEmpty className="w-4 h-4 text-muted-foreground hover:text-accent" />
                </button>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-card-foreground text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
                    {product.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-primary">
                            ${product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Free shipping
                        </span>
                    </div>
                    
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:shadow-sm">
                        Add to Cart
                    </button>
                </div>
                
                <div className="flex items-center mt-3 pt-3 border-t border-border">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <FaRegStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-accent' : 'text-secondary-300'}`} />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                        (24 reviews)
                    </span>
                </div>
            </div>
        </div>
    )
}