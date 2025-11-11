'use client'

import { useState } from "react"
import { colors, colorUtils } from "../lib/colors"

export const Category = () => {
    const [category, setCategory] = useState<string[]>([
        "Bangles",
        "Chains",
        "Earrings",
        "Neckwears",
        "Pendants",
        "Rings"
    ]);
    const [categoryImage, setCategoryImage] = useState<string[]>([
        "http://localhost:8080/uploads/bangles.png",
        "http://localhost:8080/uploads/chains.png",
        "http://localhost:8080/uploads/earrings.png",
        "http://localhost:8080/uploads/neckwears.png",
        "http://localhost:8080/uploads/pendants.png",
        "http://localhost:8080/uploads/rings.png"
    ]);
    
    return (
        <div className="flex">
            {category.map((cat, index) => (
                <div 
                    key={index} 
                    className="relative w-1/6 h-48 m-2 rounded-lg overflow-hidden cursor-pointer group"
                    style={{
                        backgroundColor: colors.neutral[50],
                        borderColor: colors.secondary[200],
                        borderWidth: '1px',
                        boxShadow: `0 4px 6px -1px ${colorUtils.withOpacity(colors.neutral[900], 0.1)}, 0 2px 4px -1px ${colorUtils.withOpacity(colors.neutral[900], 0.06)}`
                    }}
                >
                    <img
                        src={categoryImage[index]}
                        alt={cat}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div 
                        className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center"
                        style={{
                            background: `linear-gradient(to top, ${colorUtils.withOpacity(colors.neutral[900], 0.8)}, ${colorUtils.withOpacity(colors.neutral[900], 0.4)}, transparent)`
                        }}
                    >
                        <h2 
                            className="text-lg font-semibold text-center px-2"
                            style={{
                                color: colors.jewelry.gold
                            }}
                        >
                            {cat}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    )
}