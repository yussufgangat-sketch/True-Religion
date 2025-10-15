"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, Filter } from "lucide-react";
import { getCategoriesForGender, filterProductsByCategory, getAllCategories, Category } from "@/lib/categories";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  const [categories, setCategories] = useState<Category[]>([]);

  // Smart category suggestion based on search term
  const suggestCategory = (searchTerm: string) => {
    const term = searchTerm.toLowerCase();
    const categoryMap = {
      'jeans': 'Jeans',
      'pants': 'Pants',
      'shorts': 'Shorts',
      'tee': 'T-Shirts',
      'shirt': 'T-Shirts',
      'top': 'Tops And Tanks',
      'tank': 'Tops And Tanks',
      'hoodie': 'Hoodies And Sweaters',
      'sweater': 'Hoodies And Sweaters',
      'jacket': 'Jackets',
      'golf': 'Golfers',
      'skirt': 'Skirts',
      'jogger': 'Joggers And Swetpants',
      'sweatpant': 'Joggers And Swetpants'
    };
    
    for (const [keyword, category] of Object.entries(categoryMap)) {
      if (term.includes(keyword)) {
        return category;
      }
    }
    return null;
  };

  // Clear search and redirect to main products page
  const clearSearch = () => {
    // Redirect to main products page to clear search history
    router.push('/products');
  };

  // Scroll position restoration
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('search-scroll-position');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem('search-scroll-position');
    }
  }, []);

  // Save scroll position before leaving the page
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('search-scroll-position', window.scrollY.toString());
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

  const sortOptions = [
    { id: "relevance", name: "Most Relevant" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "name-asc", name: "Name: A to Z" },
    { id: "name-desc", name: "Name: Z to A" },
  ];

  // Smart search function that integrates with category filters
  const searchProducts = (searchQuery: string) => {
    setLoading(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      
      let filteredProducts = products;
      
      // Smart category suggestion - only when there's an actual search query
      if (searchQuery.trim()) {
        const suggestedCategory = suggestCategory(searchQuery);
        if (suggestedCategory && selectedCategory === "all") {
          // Auto-select the suggested category for better results
          const categoryId = categories.find(cat => cat.name === suggestedCategory)?.id;
          if (categoryId) {
            setSelectedCategory(categoryId);
          }
        }
      }
      
      // Apply category filter first
      if (selectedCategory !== "all") {
        // Find the category name from the categories list
        const categoryObj = categories.find(cat => cat.id === selectedCategory);
        const categoryName = categoryObj ? categoryObj.name : selectedCategory;
        
        filteredProducts = products.filter(product => {
          const matches = product.productCategory === categoryName;
          return matches;
        });
      } else {
        // When "All Products" is selected, use all products
        filteredProducts = products;
      }
      
      // If no search query, return filtered products
      if (!searchQuery.trim()) {
        setSearchResults(filteredProducts);
        setLoading(false);
        return;
      }

      const searchTerm = searchQuery.toLowerCase().trim();
      const searchWords = searchTerm.split(/\s+/); // Split into individual words
      
      // Enhanced search with smart matching
      const results = filteredProducts.filter((product) => {
        const productName = product.name.toLowerCase();
        const productDescription = product.description?.toLowerCase() || "";
        const productRef = product.ref?.toLowerCase() || "";
        const supplierCode = product.supplierCode?.toLowerCase() || "";
        const productColour = product.colour?.toLowerCase() || "";
        const productCategory = product.productCategory?.toLowerCase() || "";
        const gender = product.gender?.toLowerCase() || "";
        
        // Enhanced search fields
        const searchFields = [
          productName,
          productDescription,
          productRef,
          supplierCode,
          productColour,
          productCategory,
          gender
        ];
        
        // Smart search: check if all search words are found in any field
        const matchesAllWords = searchWords.every(word => 
          searchFields.some(field => field.includes(word))
        );
        
        // Bonus: exact phrase matching for better results
        const exactPhraseMatch = searchFields.some(field => field.includes(searchTerm));
        
        // Smart category matching - if search term matches a category, boost results
        const categoryMatch = productCategory.includes(searchTerm);
        
        return matchesAllWords || exactPhraseMatch || categoryMatch;
      });
      
      setSearchResults(results);
      setLoading(false);
    }, 300);
  };

  // Search function that accepts a specific category
  const searchProductsWithCategory = (searchQuery: string, categoryId: string) => {
    setLoading(true);
    
    setTimeout(() => {
      let filteredProducts = products;
      
      // Apply category filter
      if (categoryId !== "all") {
        const categoryObj = categories.find(cat => cat.id === categoryId);
        const categoryName = categoryObj ? categoryObj.name : categoryId;
        
        filteredProducts = products.filter(product => {
          const matches = product.productCategory === categoryName;
          return matches;
        });
      } else {
        filteredProducts = products;
      }
      
      // If no search query, return filtered products
      if (!searchQuery.trim()) {
        setSearchResults(filteredProducts);
        setLoading(false);
        return;
      }

      const searchTerm = searchQuery.toLowerCase().trim();
      const searchWords = searchTerm.split(/\s+/);
      
      const results = filteredProducts.filter((product) => {
        const productName = product.name.toLowerCase();
        const productDescription = product.description?.toLowerCase() || "";
        const productRef = product.ref?.toLowerCase() || "";
        const supplierCode = product.supplierCode?.toLowerCase() || "";
        const productCategory = product.productCategory?.toLowerCase() || "";
        const gender = product.gender?.toLowerCase() || "";
        
        // Check for exact phrase match
        const exactPhraseMatch = productName.includes(searchTerm) || 
                                productDescription.includes(searchTerm) ||
                                productRef.includes(searchTerm) ||
                                supplierCode.includes(searchTerm);
        
        // Check for individual word matches
        const wordMatches = searchWords.every(word => 
          productName.includes(word) || 
          productDescription.includes(word) ||
          productRef.includes(word) ||
          supplierCode.includes(word) ||
          productCategory.includes(word) ||
          gender.includes(word)
        );
        
        return exactPhraseMatch || wordMatches;
      });
      
      setSearchResults(results);
      setLoading(false);
    }, 300);
  };

  // Initialize categories
  useEffect(() => {
    const allCategories = getAllCategories();
    setCategories([
      { id: "all", name: "All Products", count: products.length, icon: "🛍️" },
      ...allCategories
    ]);
  }, []);

  // Sort results (category filtering is already done in searchProducts)
  const sortedResults = [...searchResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "relevance":
      default:
        // For relevance, prioritize matches by field importance and position
        const searchTerm = query.toLowerCase();
        const searchWords = searchTerm.split(/\s+/);
        
        const calculateRelevanceScore = (product: Product) => {
          const name = product.name.toLowerCase();
          const ref = product.ref?.toLowerCase() || "";
          const supplierCode = product.supplierCode?.toLowerCase() || "";
          const category = product.productCategory?.toLowerCase() || "";
          const color = product.colour?.toLowerCase() || "";
          const description = product.description?.toLowerCase() || "";
          
          let score = 0;
          
          searchWords.forEach(word => {
            // Exact match in name gets highest score
            if (name === word) score += 100;
            else if (name.startsWith(word)) score += 50;
            else if (name.includes(word)) score += 25;
            
            // REF match gets high score
            if (ref === word) score += 80;
            else if (ref.includes(word)) score += 20;
            
            // Supplier code match gets high score
            if (supplierCode === word) score += 80;
            else if (supplierCode.includes(word)) score += 20;
            
            // Category match gets medium score
            if (category.includes(word)) score += 15;
            
            // Color match gets medium score
            if (color.includes(word)) score += 15;
            
            // Description match gets lower score
            if (description.includes(word)) score += 5;
          });
          
          return score;
        };
        
        const aScore = calculateRelevanceScore(a);
        const bScore = calculateRelevanceScore(b);
        
        return bScore - aScore;
    }
  });

  useEffect(() => {
    searchProducts(query);
  }, [query]);

  // Initial load - if no query, show all products
  useEffect(() => {
    if (!query && searchResults.length === 0) {
      searchProducts("");
    }
  }, [query, searchResults.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {query && (
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
              </div>
              <div className="mb-6">
                <div className="flex flex-col items-center justify-center gap-3 mb-4">
                  <div className="text-lg text-gray-700">
                    <span>Showing results for </span>
                    <span className="font-bold text-black">"{query}"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm bg-gray-800 text-white px-4 py-2 rounded-full font-medium shadow-sm">
                      {sortedResults.length} {sortedResults.length === 1 ? 'result' : 'results'}
                    </span>
                    <button
                      onClick={clearSearch}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:border-red-300 flex items-center gap-1.5"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center">
                  <span>Results from both men's and women's collections</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

          {/* Filters and Controls */}
          {query && (
            <div className="bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                      <button
                        key={`${category.id}-${selectedCategory}`}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          // Force immediate search with new category
                          searchProductsWithCategory(query, category.id);
                          // Just change the category filter, don't clear the search
                        }}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] ${
                          selectedCategory === category.id
                            ? "bg-gradient-to-r from-black to-gray-800 text-white shadow-lg transform scale-105 border-2 border-gray-300"
                            : "bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border-2 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  {/* Sort Dropdown - Moved back to categories section */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.id} value={option.id} className="text-gray-900 bg-white">
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
            <p className="mt-6 text-lg text-gray-600 font-medium">Searching products...</p>
          </div>
        ) : sortedResults.length === 0 && query ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Results Found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try different keywords or check your spelling.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm font-medium text-gray-700 mb-3">Search tips:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  Try different keywords
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  Check your spelling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  Use more general terms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  Browse our categories instead
                </li>
              </ul>
            </div>
          </div>
        ) : sortedResults.length > 0 ? (
          <div className="space-y-8">
            {/* Results Summary */}
            {query && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Displaying <span className="font-semibold text-gray-900">{sortedResults.length}</span> of <span className="font-semibold text-gray-900">{sortedResults.length}</span> results
                </p>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Start Your Search</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Enter a search term to find products in our collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
