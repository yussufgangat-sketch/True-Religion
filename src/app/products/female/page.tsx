"use client";

import { useState, useEffect } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { getCategoriesForGender, filterProductsByCategory, Category } from "@/lib/categories";

export default function FemaleProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products.filter(product => product.category === "female"));
  const [groupedProducts, setGroupedProducts] = useState<Record<string, typeof products>>({});

  // Scroll position restoration
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('female-products-scroll-position');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem('female-products-scroll-position');
    }
  }, []);

  // Save scroll position before leaving the page
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('female-products-scroll-position', window.scrollY.toString());
    };

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      handleRouteChange();
      return originalPushState.apply(history, args);
    };
    
    history.replaceState = function(...args) {
      handleRouteChange();
      return originalReplaceState.apply(history, args);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  useEffect(() => {
    // Get categories for women
    const femaleCategories = getCategoriesForGender("female");
    setCategories([
      { id: "all", name: "All Products", count: products.filter(p => p.category === "female").length, icon: "🛍️" },
      ...femaleCategories
    ]);
    
    // Initialize grouped products with all female products
    const initialGrouped = products
      .filter(product => product.category === "female")
      .reduce((acc, product) => {
        const category = product.productCategory;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {} as Record<string, typeof products>);
    
    setGroupedProducts(initialGrouped);
  }, []);

  useEffect(() => {
    // Filter products based on selected category
    const filtered = filterProductsByCategory(products, selectedCategory === "all" ? null : selectedCategory, "female");
    setFilteredProducts(filtered);
    
    // Group products by productCategory
    const grouped = filtered.reduce((acc, product) => {
      const category = product.productCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, typeof products>);
    
    setGroupedProducts(grouped);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">
              WOMEN'S
            </h1>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-red-600 mb-6 tracking-tight">
              COLLECTION
            </h2>
            <p className="text-lg text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
              Premium denim for the confident woman
            </p>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Browse Collections</h2>
            <p className="text-lg text-gray-600 font-normal">Filter by category and sort your way</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="space-y-16">
              {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
                <div key={categoryName}>
                  {/* Category Header */}
                  <div className="mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                      {categoryName}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto"></div>
                  </div>
                  
                  {/* Category Products */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-6xl">🔍</div>
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">No Products Found</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                We couldn't find any products in this category. Try exploring our other collections.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white font-bold rounded-2xl hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


