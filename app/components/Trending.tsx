'use client'

import { useState } from "react";
import { colors, colorUtils } from "../lib/colors";

export const Trending = () => {
    const [images, setImages] = useState<string[]>([
        "index/trending/trending1.jpg",
        "index/trending/trending2.jpg",
        "index/trending/trending3.jpg",
        "index/trending/trending4.jpg",
        "index/trending/trending5.jpg"
    ]);
    
    return (
        <div 
            className="p-8"
            style={{ backgroundColor: colors.neutral[50] }}
        >
            <h1 
                className="text-3xl font-bold mb-8 text-center"
                style={{ color: colors.neutral[900] }}
            >
                Trending Now
            </h1>
            <div className="flex gap-6 overflow-x-auto">
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 w-64 h-80 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group"
                        style={{ 
                            backgroundColor: colorUtils.combinations.card.background,
                            border: `1px solid ${colors.secondary[200]}`,
                            boxShadow: `0 4px 6px -1px ${colorUtils.withOpacity(colors.neutral[900], 0.1)}, 0 2px 4px -1px ${colorUtils.withOpacity(colors.neutral[900], 0.06)}`
                        }}
                    >
                        <div className="relative w-full h-full">
                            <img
                                src={image}
                                alt={`Trending ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                style={{ backgroundColor: colors.primary[500] }}
                            />
                            <div 
                                className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                style={{ 
                                    background: `linear-gradient(to top, ${colors.neutral[900]}, transparent)`,
                                    color: colors.neutral[50]
                                }}
                            >
                                <p className="text-sm font-medium">Featured Item {index + 1}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
