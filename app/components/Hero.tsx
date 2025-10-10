'use client'

import { useState, useEffect } from "react"

export const Hero = () => {
    const [images, setImages] = useState<string[]>([
        "index/hero/hero1.jpg",
        "index/hero/hero2.jpg",
        "index/hero/hero3.jpg"
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    const handleImageError = (index: number) => {
        setImageError(prev => {
            const newError = [...prev];
            newError[index] = true;
            return newError;
        });
    };

    return (
        <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg shadow-2xl bg-background">
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="relative min-w-full h-full">
                        {imageError[index] ? (
                            <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ 
                                    background: `linear-gradient(135deg, oklch(0.48 0.08 48), oklch(0.70 0.045 25))` 
                                }}
                            >
                            </div>
                        ) : (
                            <img 
                                src={image} 
                                alt={`Hero Image ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(index)}
                                onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
                            />
                        )}
                        {/* Elegant overlay using your color system */}
                        <div 
                            className="absolute inset-0"
                            style={{ 
                                background: `linear-gradient(45deg, oklch(0.24 0.03 30 / 0.4), oklch(0.24 0.03 30 / 0.2))` 
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="text-foreground px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-primary-foreground">
                        Timeless Elegance Awaits
                    </h1>
                    <p className="text-lg md:text-xl mb-8 drop-shadow-md opacity-90 text-primary-foreground">
                        Discover our exquisite collection of fine jewelry crafted with passion and precision
                    </p>
                    <div className="space-x-4 flex flex-wrap justify-center gap-4">
                        <button 
                            className="text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            style={{ 
                                background: `oklch(0.48 0.08 48)`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = `oklch(0.38 0.08 48)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = `oklch(0.48 0.08 48)`;
                            }}
                        >
                            Explore Collection
                        </button>
                        <button 
                            className="text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 border-2 hover:shadow-lg"
                            style={{ 
                                borderColor: `oklch(0.70 0.045 25)`,
                                background: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = `oklch(0.70 0.045 25)`;
                                e.currentTarget.style.color = `oklch(0.14 0.02 30)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = `oklch(0.989 0.012 68.8)`;
                            }}
                        >
                            Our Story
                        </button>
                    </div>
                </div>
            </div>

            <button 
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 backdrop-blur-sm border"
                style={{ 
                    background: `oklch(0.989 0.012 68.8 / 0.2)`,
                    borderColor: `oklch(0.48 0.08 48 / 0.3)`,
                    color: `oklch(0.989 0.012 68.8)`
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = `oklch(0.48 0.08 48 / 0.8)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = `oklch(0.989 0.012 68.8 / 0.2)`;
                }}
                aria-label="Previous image"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            
            <button 
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all duration-300 backdrop-blur-sm border"
                style={{ 
                    background: `oklch(0.989 0.012 68.8 / 0.2)`,
                    borderColor: `oklch(0.48 0.08 48 / 0.3)`,
                    color: `oklch(0.989 0.012 68.8)`
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = `oklch(0.48 0.08 48 / 0.8)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = `oklch(0.989 0.012 68.8 / 0.2)`;
                }}
                aria-label="Next image"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot indicators with jewelry store colors */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="w-3 h-3 rounded-full transition-all duration-300 border"
                        style={{ 
                            background: index === currentIndex 
                                ? `oklch(0.70 0.045 25)` 
                                : `oklch(0.989 0.012 68.8 / 0.5)`,
                            borderColor: `oklch(0.48 0.08 48 / 0.5)`,
                            transform: index === currentIndex ? 'scale(1.25)' : 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                            if (index !== currentIndex) {
                                e.currentTarget.style.background = `oklch(0.989 0.012 68.8 / 0.8)`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (index !== currentIndex) {
                                e.currentTarget.style.background = `oklch(0.989 0.012 68.8 / 0.5)`;
                            }
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}