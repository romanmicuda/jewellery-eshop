export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    material: string;
    gemstone?: string;
    size: string;
    stockQuantity: number;
    discountPercentage: number;
    images: string[];
    reviews?: Review[];
    customerFeedback?: CustomerFeedback;
}

export interface FilterState {
    categories: string[];
    materials: string[];
    gemstones: string[];
    sizes: string[];
    priceRange: {
        min?: number;
        max?: number;
    };
    brand?: string;
}

export interface SortState {
    sortBy: string;
    sortDir: 'asc' | 'desc';
}

export interface CustomerFeedback {
    productRating: number;
    totalReviews: number;
    fiveStarPercentage: number;
    fourStarPercentage: number;
    threeStarPercentage: number;
    twoStarPercentage: number;
    oneStarPercentage: number;
}

export interface Review {
    user: string;
    title: string;
    comment: string;
    rating: number;
}

export interface UserType {
    id?: string;
    fullName: string;
    mobile: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    location: string;
    alternateMobile: string;
    shippingAddress?: AddressRequest;
    billingAddress?: AddressRequest;
    activeNewsletterSubscriber: boolean;
    wishlist: Product[];
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    retypePassword: string;
}

export interface AddressRequest {
    streetAddress: string;
    city: string;
    zipCode: string;
}

export interface NewsletterPreferencesRequest {
    subscribed: boolean;
}
