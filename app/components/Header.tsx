'use client'

import { Input } from "./ui/input";
import { LuSearch } from "react-icons/lu";
import Image from 'next/image';
import { RiAccountCircleLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from 'next/link';
import { NavigationMenu } from "./ui/navigation-menu";
import { NavigationMenuDemo } from "./NavigationMenuDemo";
import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-card shadow-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex items-center lg:hidden">
                    </div>

                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    <div className="hidden md:block flex-1 max-w-md mx-8">
                        <SearchBar />
                    </div>

                    <div className="flex items-center space-x-4">
                        <Account />
                        <Favorites />
                        <ShoppingCart />
                    </div>
                </div>

                <div className="md:hidden pb-4">
                    <SearchBar />
                </div>
                <div className="hidden md:flex justify-center pb-4">
                    <NavigationMenuDemo />
                </div>
            </div>

        </header>
    );
}

const SearchBar = () => {
    const { search, filters } = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const router = useRouter();
    
    // Sync local state with global filters state
    useEffect(() => {
        setSearchQuery(filters.search || '');
    }, [filters.search]);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            search(searchQuery.trim());
            // Navigate to product-list page if not already there
            if (window.location.pathname !== '/product-list') {
                router.push('/product-list');
            }
        } else {
            // If search query is empty, clear the search filter
            search('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        
        // If the input is cleared, immediately clear the search filter
        if (value === '') {
            search('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LuSearch className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
                type="text" 
                placeholder="What are you looking for?" 
                value={searchQuery}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 w-full rounded-full border-border focus:border-primary focus:ring-primary"
            />
        </form>
    );
}

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <img 
                src="/jewellery-logo.png" 
                alt="Jewelry Store Logo" 
                height={60} 
                width={80} 
                className="h-12 w-auto lg:h-16"
            />
        </Link>
    );
}

const Account = () => {
    return (
        <Link 
            href="/dashboard/account-information" 
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors duration-200"
            aria-label="Account"
        >
            <RiAccountCircleLine className="h-6 w-6" />
        </Link>
    );
}

const ShoppingCart = () => {
    return (
        <Link 
            href="/cart" 
            className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors duration-200"
            aria-label="Shopping Cart"
        >
            <MdOutlineShoppingCart className="h-6 w-6" />
        </Link>
    );
}

const Favorites = () => {
    return (
        <Link 
            href="/favorites" 
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors duration-200"
            aria-label="Favorites"
        >
            <FaRegHeart className="h-6 w-6" />
        </Link>
    );
}