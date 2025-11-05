'use client'

import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export const SortControls = () => {
    const { sort, updateSort, totalElements, isLoading } = useGlobalContext();

    const sortOptions = [
        { value: 'name', label: 'Name' },
        { value: 'price', label: 'Price' },
        { value: 'brand', label: 'Brand' },
        { value: 'category', label: 'Category' }
    ];

    const handleSortChange = (sortBy: string) => {
        if (sort.sortBy === sortBy) {
            // Toggle direction if same field
            updateSort({ sortDir: sort.sortDir === 'asc' ? 'desc' : 'asc' });
        } else {
            // Change field and default to ascending
            updateSort({ sortBy, sortDir: 'asc' });
        }
    };

    const getSortIcon = (field: string) => {
        if (sort.sortBy !== field) {
            return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
        }
        return sort.sortDir === 'asc' 
            ? <ArrowUp className="w-4 h-4 text-primary" />
            : <ArrowDown className="w-4 h-4 text-primary" />;
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 bg-card border-b border-border">
            <div className="text-sm text-muted-foreground">
                {totalElements} products found
            </div>
            
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Sort by:</span>
                <div className="flex items-center gap-1">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            disabled={isLoading}
                            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md border transition-colors disabled:opacity-50 ${
                                sort.sortBy === option.value
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'text-muted-foreground bg-background border-border hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                            {option.label}
                            {getSortIcon(option.value)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
