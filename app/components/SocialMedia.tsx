'use client'
import { useState, useEffect } from "react";
import { colors } from "../lib/colors";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  product: string;
  avatar?: string;
  date: string;
}

export const SocialMedia = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review: "Absolutely stunning diamond necklace! The craftsmanship is exceptional and it arrived beautifully packaged. I've received so many compliments wearing it.",
      product: "Diamond Elegance Necklace",
      date: "September 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      review: "Bought this as an engagement ring and my fiancée loves it! The quality is outstanding and the customer service was amazing throughout the process.",
      product: "Classic Solitaire Ring",
      date: "August 2024"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 4,
      review: "Beautiful rose gold bracelet that goes with everything. Fast shipping and exactly as described. Would definitely shop here again!",
      product: "Rose Gold Tennis Bracelet",
      date: "October 2024"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      review: "Perfect anniversary gift! The earrings are elegant and timeless. My wife hasn't taken them off since she received them.",
      product: "Pearl Drop Earrings",
      date: "September 2024"
    },
    {
      id: 5,
      name: "Lisa Williams",
      rating: 5,
      review: "The quality exceeded my expectations. The gold chain is substantial and well-made. Highly recommend this jewelry store!",
      product: "18k Gold Chain",
      date: "July 2024"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className="text-lg"
        style={{
          color: index < rating ? colors.jewelry.gold : colors.secondary[300]
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div 
        className="relative w-full max-w-4xl mx-auto rounded-xl shadow-lg border overflow-hidden"
        style={{
          backgroundColor: colors.neutral[50],
          borderColor: colors.secondary[200]
        }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
      {/* Header */}
      <div 
        className="text-center p-6"
        style={{
          background: `linear-gradient(to right, ${colors.primary[500]}, ${colors.accent[500]})`,
          color: colors.neutral[50]
        }}
      >
        <h2 className="text-2xl font-bold mb-2">What Our Customers Say</h2>
        <p className="opacity-90">Real reviews from our valued customers</p>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden" style={{ height: '350px' }}>
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="w-full flex-shrink-0 p-8">
              <div className="h-full flex flex-col justify-center">
                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <blockquote 
                  className="text-center text-lg leading-relaxed mb-6 max-w-2xl mx-auto"
                  style={{ color: colors.neutral[800] }}
                >
                  "{review.review}"
                </blockquote>

                {/* Customer Info */}
                <div className="text-center">
                  <div className="mb-2">
                    <h4 
                      className="font-semibold text-lg"
                      style={{ color: colors.neutral[800] }}
                    >
                      {review.name}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: colors.neutral[600] }}
                    >
                      {review.date}
                    </p>
                  </div>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: colors.accent[100],
                      color: colors.neutral[700]
                    }}
                  >
                    {review.product}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: colors.primary[500],
          color: colors.neutral[50]
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary[600];
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary[500];
        }}
        aria-label="Previous review"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: colors.primary[500],
          color: colors.neutral[50]
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary[600];
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary[500];
        }}
        aria-label="Next review"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div 
        className="flex justify-center space-x-2 p-6"
        style={{ backgroundColor: colors.secondary[50] }}
      >
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-3 h-3 rounded-full transition-all duration-200"
            style={{
              backgroundColor: index === currentIndex ? colors.primary[500] : colors.secondary[300],
              transform: index === currentIndex ? 'scale(1.25)' : 'scale(1)'
            }}
            onMouseOver={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = colors.secondary[400];
              }
            }}
            onMouseOut={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.backgroundColor = colors.secondary[300];
              }
            }}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1"
        style={{ backgroundColor: colors.secondary[200] }}
      >
        <div 
          className="h-full transition-all duration-500"
          style={{ 
            background: `linear-gradient(to right, ${colors.primary[500]}, ${colors.accent[500]})`,
            width: `${((currentIndex + 1) / reviews.length) * 100}%` 
          }}
        />
      </div>
      </div>
    </div>
  );
};