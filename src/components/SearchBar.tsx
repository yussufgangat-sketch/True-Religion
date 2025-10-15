"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { products, Product } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export default function SearchBar({ className = "", placeholder = "Search products..." }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  // Generate search suggestions from product data
  const generateSuggestions = (query: string) => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const productMatches: { product: Product; score: number }[] = [];

    products.forEach(product => {
      let score = 0;
      const productName = product.name.toLowerCase();
      const productDescription = product.description?.toLowerCase() || "";
      const productRef = product.ref?.toLowerCase() || "";
      const supplierCode = product.supplierCode?.toLowerCase() || "";
      const productCategory = product.productCategory.toLowerCase();
      const productColour = product.colour?.toLowerCase() || "";

      // Score based on matches
      if (productName.includes(lowerQuery)) {
        if (productName.startsWith(lowerQuery)) score += 100;
        else score += 50;
      }
      
      if (productRef.includes(lowerQuery)) {
        if (productRef.startsWith(lowerQuery)) score += 80;
        else score += 40;
      }
      
      if (supplierCode.includes(lowerQuery)) {
        if (supplierCode.startsWith(lowerQuery)) score += 80;
        else score += 40;
      }
      
      if (productDescription.includes(lowerQuery)) {
        score += 20;
      }
      
      if (productCategory.includes(lowerQuery)) {
        score += 15;
      }
      
      if (productColour.includes(lowerQuery)) {
        score += 10;
      }

      // Only add products that have matches
      if (score > 0) {
        productMatches.push({ product, score });
      }
    });

    // Sort by score and limit to 6 suggestions (to fit with images)
    const sortedMatches = productMatches
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(match => match.product);
    
    setSuggestions(sortedMatches);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    generateSuggestions(value);
    setShowSuggestions(value.length >= 1); // Show suggestions after 1 character
    setSelectedIndex(-1);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (user) {
        // User is authenticated, navigate to search results
        router.push(`/products/search?q=${encodeURIComponent(searchQuery.trim())}`);
        // Clear the search input after navigation
        setTimeout(() => {
          setSearchQuery("");
          setSuggestions([]);
          setShowSuggestions(false);
          setSelectedIndex(-1);
        }, 100);
      } else {
        // User is not authenticated, redirect to login
        router.push('/login');
        // Clear the search input after navigation
        setTimeout(() => {
          setSearchQuery("");
          setSuggestions([]);
          setShowSuggestions(false);
          setSelectedIndex(-1);
        }, 100);
      }
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Clear the URL search if we're on search results page
    if (window.location.pathname.includes('/search')) {
      window.history.replaceState({}, '', '/products/search');
      // Navigate to show all products without refresh
      window.location.href = '/products/search';
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (user) {
      // User is authenticated, navigate to the product page
      const gender = product.gender === 'male' ? 'male' : 'female';
      router.push(`/products/${gender}/${product.id}`);
      // Clear the search input after navigation
      setTimeout(() => {
        setSearchQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }, 100);
    } else {
      // User is not authenticated, redirect to login
      router.push('/login');
      // Clear the search input after navigation
      setTimeout(() => {
        setSearchQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }, 100);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        if (searchQuery) {
          clearSearch();
        } else {
          setShowSuggestions(false);
          setSelectedIndex(-1);
        }
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.length >= 1 && setShowSuggestions(true)}
          className="w-full px-3 py-3 pl-9 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-500 min-h-[44px]"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Product Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-gray-100' : ''
              } ${
                index === 0 ? 'rounded-t-lg' : ''
              } ${
                index === suggestions.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Product Image */}
                <div className="w-12 h-12 flex-shrink-0 relative bg-gray-100 rounded-md overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Search className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {product.description || `${product.productCategory} • ${product.colour || 'Various colors'}`}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {product.ref && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {product.ref}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {product.productCategory}
                    </span>
                  </div>
                </div>
                
                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
