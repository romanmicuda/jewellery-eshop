'use client'

import { useGlobalContext } from "@/app/contexts/GlobalContext";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Pagination = () => {
    const { 
        currentPage, 
        totalPages, 
        totalElements, 
        pageSize, 
        goToPage, 
        nextPage, 
        previousPage, 
        changePageSize,
        isLoading 
    } = useGlobalContext();

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const start = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        const end = Math.min(totalPages, start + maxVisiblePages);

        for (let i = start; i < end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border bg-card">
            {/* Results info */}
            <div className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {totalElements} results
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                    onClick={previousPage}
                    disabled={currentPage === 0 || isLoading}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {currentPage > 2 && (
                        <>
                            <button
                                onClick={() => goToPage(0)}
                                disabled={isLoading}
                                className="px-3 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                            >
                                1
                            </button>
                            {currentPage > 3 && (
                                <span className="px-2 text-muted-foreground">...</span>
                            )}
                        </>
                    )}

                    {getPageNumbers().map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            disabled={isLoading}
                            className={`px-3 py-2 text-sm font-medium rounded-md border disabled:opacity-50 ${
                                pageNum === currentPage
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'text-muted-foreground bg-background border-border hover:bg-accent hover:text-accent-foreground'
                            }`}
                        >
                            {pageNum + 1}
                        </button>
                    ))}

                    {currentPage < totalPages - 3 && (
                        <>
                            {currentPage < totalPages - 4 && (
                                <span className="px-2 text-muted-foreground">...</span>
                            )}
                            <button
                                onClick={() => goToPage(totalPages - 1)}
                                disabled={isLoading}
                                className="px-3 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </div>

                {/* Next button */}
                <button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages - 1 || isLoading}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>

            {/* Page size selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show:</span>
                <select
                    value={pageSize}
                    onChange={(e) => changePageSize(Number(e.target.value))}
                    disabled={isLoading}
                    className="px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50"
                >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                </select>
                <span className="text-sm text-muted-foreground">per page</span>
            </div>
        </div>
    );
};
