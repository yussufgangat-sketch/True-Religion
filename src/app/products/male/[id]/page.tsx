"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { products, Product } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getProductStock, checkAvailability } from "@/lib/inventory";

export default function MaleProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [stockData, setStockData] = useState<any>(null);
  const [loadingStock, setLoadingStock] = useState(false);
  
  const { addItemWithStockCheck } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    params.then(async (resolvedParams) => {
      const productId = resolvedParams.id;
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct || null);
      if (foundProduct) {
        setSelectedImage(foundProduct.image || "");
        
        // Load stock data
        setLoadingStock(true);
        try {
          const stock = await getProductStock(foundProduct.id);
          setStockData(stock);
        } catch (error) {
          console.error('Error loading stock:', error);
        } finally {
          setLoadingStock(false);
        }
      }
      setIsLoading(false);
    });
  }, [params]);
  
  // Check if any sizes are available
  const hasAvailableSizes = () => {
    if (!stockData || !stockData.sizes) return true; // Default to true if no stock data
    return Object.values(stockData.sizes).some((sizeData: any) => sizeData.available > 0);
  };

  const addToCart = async () => {
    if (!user) {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
      setTimeout(() => router.push('/login'), 3000);
      return;
    }

    if (!product) return;

    // Create a basic cart item without size - size will be selected in cart
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.wholesalePrice || product.price, // This is used for calculations
      wholesalePrice: product.wholesalePrice || product.price,
      retailPrice: product.retailPrice || product.price,
      size: 'TBD', // Temporary size - will be updated in cart
      quantity: 1,
      image: product.image || "",
      category: 'male' as const,
      ref: (product as any).ref,
      colour: (product as any).colour,
      supplierCode: (product as any).supplierCode
    };

    try {
      const result = await addItemWithStockCheck(cartItem);
      
      if (result.success) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        console.error('Failed to add to cart:', result.error);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                      <Link href="/products" className="text-blue-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Notifications */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Added to cart successfully!</span>
          </div>
        </div>
      )}
      
      
      {authError && (
        <div className="fixed top-20 right-4 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="font-medium">Please sign in to add items to cart</span>
          </div>
        </div>
      )}
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
                      <Link href="/products" className="hover:text-black">All Products</Link>
          <span>/</span>
          <Link href={`/products/${product.category}`} className="hover:text-black">
            {product.category === "male" ? "Men" : "Women"}
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 bg-gray-100 overflow-hidden rounded-lg">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {(product.images || [product.image]).filter(Boolean).map((img, index) => (
                <div 
                  key={index} 
                  className={`relative h-24 bg-gray-100 overflow-hidden rounded-lg cursor-pointer border-2 transition-all ${
                    selectedImage === img ? 'border-black' : 'border-transparent hover:border-gray-400'
                  }`}
                  onClick={() => img && setSelectedImage(img)}
                >
                  {img && (
                    <Image
                      src={img}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>
              <div className="space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">REF:</span> {(product as any).ref || 'N/A'}</p>
                <p><span className="font-semibold">Supplier Code:</span> {(product as any).supplierCode || 'N/A'}</p>
                <p><span className="font-semibold">Colour:</span> {(product as any).colour || 'N/A'}</p>
                <p><span className="font-semibold">Gender:</span> {(product as any).gender || 'MEN'}</p>
                <p><span className="font-semibold">Category:</span> {(product as any).productCategory || 'N/A'}</p>
              </div>
            </div>

            {/* Price Display */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Wholesale Price:</span>
                <span className="text-xl font-bold text-black">R{product.wholesalePrice?.toFixed(2) || 'N/A'} ex VAT</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium text-blue-700">Recommended Retail:</span>
                <span className="text-xl font-bold text-blue-900">R{product.retailPrice?.toFixed(2) || 'N/A'}</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-black">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              {loadingStock ? (
                <div className="w-full bg-gray-300 text-gray-600 py-4 font-bold text-lg text-center rounded">
                  Loading stock...
                </div>
              ) : hasAvailableSizes() ? (
                <>
                  <button 
                    onClick={addToCart}
                    className="w-full bg-black text-white py-4 font-bold hover:bg-gray-800 transition-colors text-lg"
                  >
                    Add to cart
                  </button>
                  <p className="text-sm text-gray-600 text-center">
                    Select sizes and quantities in your cart
                  </p>
                </>
              ) : (
                <>
                  <button 
                    disabled
                    className="w-full bg-gray-400 text-gray-600 py-4 font-bold text-lg cursor-not-allowed"
                  >
                    Out of stock
                  </button>
                  <p className="text-sm text-red-600 text-center">
                    This product is currently out of stock
                  </p>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
