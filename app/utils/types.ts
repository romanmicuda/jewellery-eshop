export interface Product {
    id: number;
    name: string;
    categories?: string[];
    description: string;
    price: number;
    imageUrl: string;
}

export interface ProductDetailType {
    id: number;
    name: string;
    color: string;
    price: number;
    freeShipping: boolean;
    image: string;
    description: string;
    reviews?: Review[];
    customerFeedback?: CustomerFeedback;
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
    isActiveNewsletterSubscriber: boolean;
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

export interface NewsletterPreferences {
    subscribed: boolean;
}