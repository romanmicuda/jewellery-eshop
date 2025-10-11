export interface Product {
    id: number;
    name: string;
    categories?: string[];
    description: string;
    price: number;
    imageUrl: string;
}