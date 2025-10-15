"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";
import { ArrowRight, Star, Shield, Award } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  
  // Handle navigation to login for product pages (only when not authenticated)
  const handleProductNavigation = (e: React.MouseEvent, targetPath: string) => {
    e.preventDefault();
    if (user) {
      // User is signed in, navigate to the actual page
      router.push(targetPath);
    } else {
      // User is not signed in, redirect to login
      router.push('/login');
    }
  };

  // Select high-quality hero images
  const heroImage = products.find(p => 
    p.image && p.category === 'male' && 
    p.productCategory && (p.productCategory.toLowerCase().includes('jean') || p.productCategory.toLowerCase().includes('tee'))
  )?.image || products[0]?.image || '';
  
  // Get the best images for each category
  const mensImage = products.find(p => 
    p.category === 'male' && p.image && 
    p.productCategory && p.productCategory.toLowerCase().includes('jean')
  )?.image || products.find(p => p.category === 'male' && p.image)?.image || '';
  
  const womensImage = products.find(p => 
    p.category === 'female' && p.image && 
    p.productCategory && (p.productCategory.toLowerCase().includes('jean') || p.productCategory.toLowerCase().includes('tee'))
  )?.image || products.find(p => p.category === 'female' && p.image)?.image || '';
  
  // Get featured products for the homepage
  const featuredProducts = products
    .filter(p => p.image && p.productCategory && (p.productCategory.toLowerCase().includes('jean') || p.productCategory.toLowerCase().includes('tee')))
    .slice(0, 4);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
        {heroImage && (
          <Image
            src={heroImage}
            alt="True Religion - Authentic American Denim"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="relative z-20 flex items-center justify-start h-full text-white">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight tracking-tight">
                TRUE
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
                  RELIGION
                </span>
            </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light leading-relaxed text-gray-200 max-w-xl">
                Discover the legacy of authentic American denim. Premium craftsmanship meets bold style in every piece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={(e) => handleProductNavigation(e, '/products/male')}
                  className="group inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm tracking-wider uppercase hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[44px]"
                >
                  Shop Men's
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={(e) => handleProductNavigation(e, '/products/female')}
                  className="group inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-sm tracking-wider uppercase border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 min-h-[44px]"
                >
                  Shop Women's
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gender Categories */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-gray-900">
              SHOP BY
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">
                COLLECTION
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collections designed for every lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Men's Collection */}
            <button onClick={(e) => handleProductNavigation(e, '/products/male')} className="group w-full">
              <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={mensImage}
                  alt="Men's Collection - Premium Denim & Apparel"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs font-bold tracking-wider uppercase">
                      Men's Collection
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
                    AUTHENTIC
                    <span className="block text-red-400">DENIM</span>
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed max-w-md">
                    Premium denim, graphic tees, and streetwear essentials for the modern man.
                  </p>
                  <div className="inline-flex items-center text-red-400 font-semibold text-sm tracking-wider uppercase group-hover:text-red-300 transition-colors">
                    Shop Men's
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </button>

            {/* Women's Collection */}
            <button onClick={(e) => handleProductNavigation(e, '/products/female')} className="group w-full">
              <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={womensImage}
                  alt="Women's Collection - Premium Denim & Apparel"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs font-bold tracking-wider uppercase">
                      Women's Collection
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
                    BOLD
                    <span className="block text-red-400">STYLE</span>
                  </h3>
                  <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed max-w-md">
                    Statement denim, graphic tees, and activewear for confident women.
                  </p>
                  <div className="inline-flex items-center text-red-400 font-semibold text-sm tracking-wider uppercase group-hover:text-red-300 transition-colors">
                    Shop Women's
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-gray-900">
              FEATURED
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-700">
                PRODUCTS
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our most popular pieces from the latest collection
            </p>
          </div>

          {/* Men's Featured Products */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Men's Collection</h3>
              <button 
                onClick={(e) => handleProductNavigation(e, '/products/male')}
                className="text-red-600 hover:text-red-700 font-semibold text-sm tracking-wider uppercase flex items-center group"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.category === 'male' && p.image)
                .slice(0, 4)
                .map((product) => (
                  <button 
                    key={product.id} 
                    onClick={(e) => handleProductNavigation(e, `/products/male/${product.id}`)}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full text-left"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                        {product.name}
                      </h4>
                      {user ? (
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600">Wholesale:</span>
                            <span className="text-sm font-bold text-gray-900">R{product.wholesalePrice?.toFixed(2) || 'N/A'} ex VAT</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-600">Retail:</span>
                            <span className="text-sm font-bold text-red-600">R{product.retailPrice?.toFixed(2) || 'N/A'}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <span className="text-xs text-gray-500 italic">Sign in to view prices</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Women's Featured Products */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Women's Collection</h3>
              <button 
                onClick={(e) => handleProductNavigation(e, '/products/female')}
                className="text-red-600 hover:text-red-700 font-semibold text-sm tracking-wider uppercase flex items-center group"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.category === 'female' && p.image)
                .slice(0, 4)
                .map((product) => (
                  <button 
                    key={product.id} 
                    onClick={(e) => handleProductNavigation(e, `/products/female/${product.id}`)}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full text-left"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                        {product.name}
                      </h4>
                      {user ? (
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600">Wholesale:</span>
                            <span className="text-sm font-bold text-gray-900">R{product.wholesalePrice?.toFixed(2) || 'N/A'} ex VAT</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-600">Retail:</span>
                            <span className="text-sm font-bold text-red-600">R{product.retailPrice?.toFixed(2) || 'N/A'}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <span className="text-xs text-gray-500 italic">Sign in to view prices</span>
                        </div>
                      )}
              </div>
            </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <Star className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Authentic American denim crafted with the finest materials and attention to detail.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Authentic Brand</h3>
              <p className="text-gray-600 leading-relaxed">
                Established in 2002, True Religion represents the pinnacle of American streetwear culture.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Style Guarantee</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece is carefully curated to ensure you get the authentic True Religion look and feel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
