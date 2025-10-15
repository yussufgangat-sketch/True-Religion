"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    category: string;
  };
  viewMode?: "grid" | "list";
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);



  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click wasn't on a button
    if (!(e.target as HTMLElement).closest('button')) {
      // Allow the Link to handle navigation
      return;
    }
    e.preventDefault();
  };

  if (viewMode === "list") {
    return (
      <Link href={`/products/${product.category === "male" ? "male" : "female"}/${product.id}`} onClick={handleCardClick}>
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-lg font-bold text-gray-900">R {product.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleWishlist}
                className={`p-2 rounded-full transition-colors ${
                  isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              

            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.category === "male" ? "male" : "female"}/${product.id}`} onClick={handleCardClick}>
      <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative">
          <div className="aspect-square bg-gray-100 overflow-hidden">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 ${
              isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          

        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-lg font-bold text-gray-900">R {product.price.toFixed(2)}</p>
          
          <div className="mt-3 text-center">
            <span className="text-sm text-gray-600 hover:text-black transition-colors">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}


