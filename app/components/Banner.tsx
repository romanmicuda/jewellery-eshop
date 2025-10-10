'use client'
import { useState } from "react";
import { colors } from "../lib/colors";

export const Banner = () => {
    const [image, setImage] = useState<string>("index/banner/banner.jpg");

    return (
        <div className="flex min-h-[500px] overflow-hidden rounded-lg shadow-lg" 
             style={{ backgroundColor: colors.neutral[50] }}>
            <div className="flex-1">
                <img src={image} alt="Banner" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 p-8 flex flex-col justify-center space-y-6"
                 style={{ backgroundColor: colors.neutral[50] }}>
                <div className="text-sm font-medium tracking-wide uppercase"
                     style={{ color: colors.accent[600] }}>
                    Lorem ipsum dolor sit.
                </div>
                
                <div>
                    <h1 className="text-4xl font-bold leading-tight"
                        style={{ color: colors.primary[700] }}>
                        Lorem ipsum dolor sit amet
                    </h1>
                </div>
                
                <div className="text-base leading-relaxed"
                     style={{ color: colors.neutral[700] }}>
                    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id doloremque dolores harum voluptatem magnam adipisci sed aut perspiciatis, incidunt at, consectetur qui sapiente inventore quos eius recusandae dolorum delectus ipsam, voluptatum rerum impedit ratione quae saepe eveniet? Blanditiis saepe optio iste recusandae perferendis. Itaque magnam minus ipsa sequi, nam optio molestias, ipsam non obcaecati enim, exercitationem mollitia officiis.
                </div>
                
                <div className="pt-4">
                    <button className="px-6 py-3 rounded-lg font-medium transition-colors duration-200 hover:shadow-md"
                            style={{ 
                                backgroundColor: colors.primary[500],
                                color: colors.neutral[50]
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.primary[600];
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.primary[500];
                            }}>
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    )
}