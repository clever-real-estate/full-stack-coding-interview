'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
  className = '',
}: PaginationProps) {
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const handlePrevious = () => {
    if (hasPreviousPage && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate start and end page numbers
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    // Add page numbers to range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page and dots if needed
    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) {
        rangeWithDots.push('...');
      }
    }

    // Add main range
    rangeWithDots.push(...range);

    // Add last page and dots if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav className={`flex items-center justify-center space-x-2 ${className}`} aria-label="Pagination">
      {/* Previous button */}
      <button
        onClick={handlePrevious}
        disabled={!hasPreviousPage || loading}
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
          ${hasPreviousPage && !loading
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
          }
        `}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-sm text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              disabled={loading}
              className={`
                px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                ${isCurrentPage
                  ? 'text-white bg-blue-600 border border-blue-600'
                  : loading
                  ? 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
              aria-label={`Page ${pageNumber}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!hasNextPage || loading}
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
          ${hasNextPage && !loading
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
          }
        `}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>

      {/* Page info */}
      <div className="ml-4 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}