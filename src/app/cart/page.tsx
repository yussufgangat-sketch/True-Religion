"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowLeft, Plus, Minus, Hash } from "lucide-react";
import { useState, useEffect } from "react";
import { getProductStock } from "@/lib/inventory";

export default function CartPage() {
  const { state, dispatch, addItemWithStockCheck } = useCart();
  const [stockData, setStockData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [quantityInputs, setQuantityInputs] = useState<Record<string, string>>({});

  const updateQuantity = (id: string, size: string, quantity: number, event?: React.MouseEvent) => {
    // Prevent any default behavior that might cause page refresh
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const itemIdentifier = `${id}|${size}`;
    const key = `${id}-${size}`;
    
    // If quantity is 0, clear the input state
    if (quantity === 0) {
      setQuantityInputs(prev => ({
        ...prev,
        [key]: ''
      }));
      
      // Clear any pending debounced updates for this input
      const existingTimeout = (window as any)[`debounce_${key}`];
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        delete (window as any)[`debounce_${key}`];
      }
    }
    
    // Don't auto-remove when quantity is 0 - user must click remove button
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemIdentifier, quantity: Math.max(0, quantity) } });
  };

  const addItem = async (productId: string, size: string, event?: React.MouseEvent) => {
    // Prevent any default behavior that might cause page refresh
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // First, check if there's a TBD item for this product that we can convert
    const tbdItem = state.items.find(item => item.id === productId && item.size === 'TBD');
    
    if (tbdItem) {
      // Convert the TBD item to the selected size
      const updatedItem = {
        ...tbdItem,
        size,
        quantity: 1
      };

      // Remove the TBD item and add the new sized item
      dispatch({ type: 'REMOVE_ITEM', payload: `${productId}|TBD` });
      
      const result = await addItemWithStockCheck(updatedItem);
      
      if (!result.success) {
        console.error('Failed to add item:', result.error);
        // You could show a toast notification here
      }
    } else {
      // If no TBD item exists, create a new one
      const product = state.items.find(item => item.id === productId);
      if (!product) return;

      const newItem = {
        ...product,
        size,
        quantity: 1
      };

      const result = await addItemWithStockCheck(newItem);
      
      if (!result.success) {
        console.error('Failed to add item:', result.error);
        // You could show a toast notification here
      }
    }
  };

  const removeItem = (id: string, event?: React.MouseEvent) => {
    // Prevent any default behavior that might cause page refresh
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Clear the input state for this item
    const [productId, size] = id.split('|');
    const key = `${productId}-${size}`;
    setQuantityInputs(prev => ({
      ...prev,
      [key]: ''
    }));
    
    // Clear any pending debounced updates for this input
    const existingTimeout = (window as any)[`debounce_${key}`];
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      delete (window as any)[`debounce_${key}`];
    }
    
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleQuantityInputChange = (productId: string, size: string, value: string, maxAvailable: number) => {
    const key = `${productId}-${size}`;
    const numValue = parseInt(value) || 0;
    
    // Don't allow input higher than available stock
    if (numValue > maxAvailable) {
      setQuantityInputs(prev => ({
        ...prev,
        [key]: maxAvailable.toString()
      }));
    } else {
      setQuantityInputs(prev => ({
        ...prev,
        [key]: value
      }));
    }

    // Real-time cart update with debouncing
    const debouncedUpdate = setTimeout(async () => {
      const finalValue = parseInt(value) || 0;
      const quantity = Math.max(0, Math.min(finalValue, maxAvailable));
      
      if (quantity > 0) {
        // Add or update item in cart immediately
        const tbdItem = state.items.find(item => item.id === productId && item.size === 'TBD');
        
        if (tbdItem) {
          // Convert TBD item to actual size
          const updatedItem = {
            ...tbdItem,
            size,
            quantity
          };
          
          dispatch({ type: 'REMOVE_ITEM', payload: `${productId}|TBD` });
          const result = await addItemWithStockCheck(updatedItem);
          
          if (!result.success) {
            console.error('Failed to add item:', result.error);
          }
        } else {
          // Add new item
          const product = state.items.find(item => item.id === productId);
          if (product) {
            const newItem = {
              ...product,
              size,
              quantity
            };

            const result = await addItemWithStockCheck(newItem);
            
            if (!result.success) {
              console.error('Failed to add item:', result.error);
            }
          }
        }
      } else if (quantity === 0) {
        // If quantity is 0, update the item to have 0 quantity (don't remove it)
        const itemIdentifier = `${productId}|${size}`;
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemIdentifier, quantity: 0 } });
        
        // Clear the input state immediately for 0 quantity
        setQuantityInputs(prev => ({
          ...prev,
          [key]: ''
        }));
      }
    }, 500); // 500ms debounce delay

    // Clear any existing timeout for this input
    const existingTimeout = (window as any)[`debounce_${key}`];
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }
    (window as any)[`debounce_${key}`] = debouncedUpdate;
  };

  const handleQuantityInputBlur = async (productId: string, size: string, available: number) => {
    const key = `${productId}-${size}`;
    
    // Clear any pending debounced updates for this input
    const existingTimeout = (window as any)[`debounce_${key}`];
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      delete (window as any)[`debounce_${key}`];
    }
    
    const inputValue = quantityInputs[key] || '0';
    const quantity = Math.max(0, Math.min(parseInt(inputValue) || 0, available));
    
    // Final update to ensure cart is in sync
    if (quantity > 0) {
      // Add or update item in cart
      const tbdItem = state.items.find(item => item.id === productId && item.size === 'TBD');
      
      if (tbdItem) {
        // Convert TBD item to actual size
        const updatedItem = {
          ...tbdItem,
          size,
          quantity
        };
        
        dispatch({ type: 'REMOVE_ITEM', payload: `${productId}|TBD` });
        const result = await addItemWithStockCheck(updatedItem);
        
        if (!result.success) {
          console.error('Failed to add item:', result.error);
        }
      } else {
        // Add new item
        const product = state.items.find(item => item.id === productId);
        if (product) {
          const newItem = {
            ...product,
            size,
            quantity
          };

          const result = await addItemWithStockCheck(newItem);
          
          if (!result.success) {
            console.error('Failed to add item:', result.error);
          }
        }
      }
    } else if (quantity === 0) {
      // If quantity is 0, update the item to have 0 quantity (don't remove it)
      const itemIdentifier = `${productId}|${size}`;
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemIdentifier, quantity: 0 } });
      
      // Clear the input state immediately for 0 quantity
      setQuantityInputs(prev => ({
        ...prev,
        [key]: ''
      }));
    } else {
      // Clear the input after a short delay to show the final value (only for non-zero quantities)
      setTimeout(() => {
        setQuantityInputs(prev => ({
          ...prev,
          [key]: ''
        }));
      }, 100);
    }
  };

  // Calculate subtotal only for items with sizes and quantities > 0
  const subtotal = state.items
    .filter(item => item.size !== 'TBD' && item.quantity > 0)
    .reduce((total, item) => total + (item.price * item.quantity), 0);
  const vatAmount = subtotal * 0.15; // 15% VAT
  const total = subtotal + vatAmount;

  // Load stock data for all products in cart
  useEffect(() => {
    const loadStockData = async () => {
      setLoading(true);
      const stockPromises = state.items.map(async (item) => {
        try {
          const stock = await getProductStock(item.id);
          return { productId: item.id, stock };
        } catch (error) {
          console.error(`Error loading stock for ${item.id}:`, error);
          return { productId: item.id, stock: null };
        }
      });
      
      const results = await Promise.all(stockPromises);
      const stockMap: Record<string, any> = {};
      results.forEach(({ productId, stock }) => {
        if (stock) {
          stockMap[productId] = stock;
        }
      });
      
      setStockData(stockMap);
      setLoading(false);
    };

    if (state.items.length > 0) {
      loadStockData();
    }
  }, [state.items]);

  // Group items by product - maintain insertion order
  const groupedItems = state.items.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        product: item,
        sizes: [],
        hasTBD: false
      };
    }
    acc[item.id].sizes.push(item);
    if (item.size === 'TBD') {
      acc[item.id].hasTBD = true;
    }
    return acc;
  }, {} as Record<string, { product: any; sizes: any[]; hasTBD: boolean }>);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some items to your cart to continue shopping</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <Link
            href="/products"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Cart Items ({state.items.length})</h2>
              <div className="space-y-6">
                {/* Show all items in order */}
                {Object.entries(groupedItems).map(([productId, { product, sizes, hasTBD }]) => (
                  <div key={productId} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm relative">
                    {/* Remove Product Button - Top Right */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Remove all sizes of this product
                        sizes.forEach(item => {
                          dispatch({ type: 'REMOVE_ITEM', payload: `${item.id}|${item.size}` });
                        });
                      }}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors z-10"
                      title="Remove product from cart"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>

                    {/* Product Header */}
                    <div className="flex items-start space-x-4 mb-4 pr-10">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>REF: {product.ref}</span>
                          <span>SUPPLIER: {product.supplierCode}</span>
                          <span>COLOUR: {product.colour}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-sm text-gray-500">WHOLESALE PRICE</span>
                            <p className="font-bold text-lg text-gray-900">R{product.wholesalePrice.toFixed(2)} ex VAT</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">RECOMMENDED RETAIL</span>
                            <p className="font-bold text-lg text-gray-900">R{product.retailPrice.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Size Grid */}
                    {hasTBD && (
                      <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800">⚠️ Select sizes and quantities below</p>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center mb-4">
                        <Hash className="h-5 w-5 text-gray-600 mr-2" />
                        <h4 className="text-lg font-bold text-gray-900">SIZE GRID</h4>
                      </div>
                      
                      {loading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                          {stockData[productId]?.sizes ? Object.entries(stockData[productId].sizes).sort((a, b) => {
                            const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40', '42', '44', '46', '48'];
                            const indexA = sizeOrder.indexOf(a[0]);
                            const indexB = sizeOrder.indexOf(b[0]);
                            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                            if (indexA !== -1) return -1;
                            if (indexB !== -1) return 1;
                            return a[0].localeCompare(b[0]);
                          }).map(([size, sizeData]: [string, any]) => {
                            const cartItem = sizes.find(item => item.size === size && item.size !== 'TBD');
                            const available = sizeData.available;
                            const isInCart = !!cartItem;
                            const cartQuantity = cartItem?.quantity || 0;
                            
                            return (
                              <div key={size} className={`border rounded-lg p-3 text-center transition-all ${
                                isInCart 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : available > 0 
                                    ? 'border-gray-300 hover:border-gray-400 cursor-pointer' 
                                    : 'border-gray-200 bg-gray-100 opacity-50'
                              }`}>
                                <div className="text-sm font-semibold text-gray-900 mb-2">{size}</div>
                                
                                {isInCart ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-center space-x-1">
                                      <button
                                        type="button"
                                        onClick={(e) => updateQuantity(productId, size, cartQuantity - 1, e)}
                                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors bg-white"
                                        disabled={cartQuantity <= 0}
                                      >
                                        <Minus className="h-3 w-3" />
                                      </button>
                                      <span className="w-10 text-center font-bold text-gray-900 text-base">{cartQuantity}</span>
                                      <button
                                        type="button"
                                        onClick={(e) => updateQuantity(productId, size, cartQuantity + 1, e)}
                                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-gray-400 transition-colors bg-white"
                                        disabled={cartQuantity >= available}
                                      >
                                        <Plus className="h-3 w-3" />
                                      </button>
                                    </div>
                                    <div className="text-xs text-blue-600 font-medium">
                                      AVAIL {available}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => removeItem(`${productId}|${size}`, e)}
                                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                                      title="Remove this size"
                                    >
                                      <Trash2 className="h-4 w-4 mx-auto" />
                                    </button>
                      </div>
                                ) : (
                                  <div className="space-y-2">
                                    <div className="text-xs font-medium text-gray-700">
                                      AVAIL {available > 300 ? '300+' : available}
                                    </div>
                                    <div className="text-xs text-gray-600 mb-1">Set Qty</div>
                                    {available > 0 && (
                                        <input
                                          type="text"
                                          inputMode="numeric"
                                          pattern="[0-9]*"
                                          placeholder="0"
                                          value={quantityInputs[`${productId}-${size}`] || ''}
                                          onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            handleQuantityInputChange(productId, size, value, available);
                                          }}
                                          onBlur={() => handleQuantityInputBlur(productId, size, available)}
                                          className="w-full py-2 px-3 text-center text-base font-bold border-2 border-gray-400 rounded focus:border-blue-500 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
                                          style={{
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'textfield'
                                          }}
                                        />
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          }) : (
                            <div className="col-span-full text-center py-4 text-gray-500">
                              Loading stock data...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:sticky lg:top-8">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-4 md:mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-black font-medium">Subtotal (ex VAT)</span>
                  <span className="font-bold text-black">R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-black font-medium">VAT (+15%)</span>
                  <span className="font-bold text-black">R{vatAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-base md:text-lg">
                    <span className="text-black">Total (inc VAT)</span>
                    <span className="text-black">R{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 md:py-4 font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 text-center block rounded-lg min-h-[44px] flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 md:mt-6 space-y-3">
                <div className="flex items-center text-xs md:text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
