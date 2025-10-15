"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { getProductStock } from '@/lib/inventory';

export interface CartItem {
  id: string;
  name: string;
  price: number; // This will be the wholesale price for calculations
  wholesalePrice: number;
  retailPrice: number;
  size: string;
  quantity: number;
  image: string;
  category: 'male' | 'female';
  ref?: string;
  colour?: string;
  supplierCode?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItemWithStockCheck: (item: CartItem) => Promise<{ success: boolean; error?: string }>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: state.total + (action.payload.price * action.payload.quantity)
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + (action.payload.price * action.payload.quantity)
      };
    }

    case 'REMOVE_ITEM': {
      // action.payload should be a unique identifier for the item (id + size)
      const [itemId, itemSize] = action.payload.split('|');
      const itemToRemove = state.items.find(item => item.id === itemId && item.size === itemSize);
      return {
        ...state,
        items: state.items.filter(item => !(item.id === itemId && item.size === itemSize)),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      const [itemId, itemSize] = action.payload.id.split('|');
      const item = state.items.find(item => item.id === itemId && item.size === itemSize);
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId && item.size === itemSize
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });

  const addItemWithStockCheck = async (item: CartItem): Promise<{ success: boolean; error?: string }> => {
    try {
      // Skip stock checking for temporary sizes (TBD) - these will be handled in cart
      if (item.size === 'TBD') {
        dispatch({ type: 'ADD_ITEM', payload: item });
        return { success: true };
      }

      // Get current stock for the product
      const stockData = await getProductStock(item.id);
      
      if (!stockData || !stockData.sizes[item.size]) {
        return { success: false, error: 'Product not found in inventory' };
      }

      const availableStock = stockData.sizes[item.size].available;
      
      // Check if we're trying to add more than available
      if (availableStock < item.quantity) {
        return { 
          success: false, 
          error: `Only ${availableStock} items available in size ${item.size}` 
        };
      }

      // Check existing cart items for the same product/size
      const existingItem = state.items.find(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItem) {
        const totalQuantity = existingItem.quantity + item.quantity;
        if (totalQuantity > availableStock) {
          return { 
            success: false, 
            error: `Only ${availableStock} items available in size ${item.size}. You already have ${existingItem.quantity} in your cart.` 
          };
        }
      }

      // If all checks pass, add the item
      dispatch({ type: 'ADD_ITEM', payload: item });
      return { success: true };
    } catch (error) {
      console.error('Error checking stock:', error);
      return { success: false, error: 'Failed to check stock availability' };
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addItemWithStockCheck }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

