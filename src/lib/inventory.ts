import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs, orderBy, Firestore } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

// Initialize Firebase with the same config as process-order API
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

let app: any;
let db: Firestore | undefined;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app); // Use default database where inventory exists
  console.log('✅ Firebase initialized successfully with default database');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

export interface InventoryItem {
  id: string;
  productId: string;
  ref: string;
  supplierCode?: string; // Add supplier code field
  size: string;
  quantity: number;
  reserved: number; // Items in carts but not yet purchased
  available: number; // quantity - reserved
  lastUpdated: string;
}

export interface ProductStock {
  productId: string;
  ref: string;
  sizes: { [size: string]: InventoryItem };
  totalStock: number;
  totalAvailable: number;
  isOutOfStock: boolean;
}

// Initialize inventory from product data
export async function initializeInventoryFromProducts(products: any[]) {
  try {
    console.log('🔄 Initializing inventory from products...');
    
    if (!db) {
      throw new Error('Firebase database not initialized');
    }
    
    for (const product of products) {
      const productId = product.id;
      const ref = product.ref;
      
      // Create inventory items for each size
      for (const [size, quantity] of Object.entries(product.sizes || {})) {
        const inventoryId = `${productId}_${size}`;
        const inventoryItem: InventoryItem = {
          id: inventoryId,
          productId,
          ref,
          size,
          quantity: quantity as number,
          reserved: 0,
          available: quantity as number,
          lastUpdated: new Date().toISOString()
        };
        
        await setDoc(doc(db, 'inventory', inventoryId), inventoryItem);
        console.log(`✅ Created inventory for ${ref} size ${size}: ${quantity} units`);
      }
    }
    
    console.log('✅ Inventory initialization completed');
    return { success: true, message: 'Inventory initialized successfully' };
  } catch (error) {
    console.error('❌ Error initializing inventory:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get product stock information
export async function getProductStock(productId: string): Promise<ProductStock | null> {
  try {
    console.log('🔍 Getting stock for product:', productId);
    
    if (!db) {
      console.error('❌ Database not initialized');
      return null;
    }
    
    const inventoryQuery = query(
      collection(db, 'inventory'),
      where('productId', '==', productId)
    );
    
    const snapshot = await getDocs(inventoryQuery);
    console.log('📊 Found', snapshot.size, 'inventory items for product', productId);
    
    const sizes: { [size: string]: InventoryItem } = {};
    let totalStock = 0;
    let totalAvailable = 0;
    
    snapshot.forEach((doc) => {
      const item = doc.data() as InventoryItem;
      console.log('📦 Inventory item:', item.size, 'available:', item.available);
      sizes[item.size] = item;
      totalStock += item.quantity;
      totalAvailable += item.available;
    });
    
    const result = {
      productId,
      ref: sizes[Object.keys(sizes)[0]]?.ref || '',
      sizes,
      totalStock,
      totalAvailable,
      isOutOfStock: totalAvailable <= 0
    };
    
    console.log('✅ Stock data for', productId, ':', result);
    return result;
  } catch (error) {
    console.error('❌ Error getting product stock:', error);
    return null;
  }
}

// Check if product size is available
export async function checkAvailability(productId: string, size: string, requestedQuantity: number = 1): Promise<boolean> {
  try {
    console.log('🔍 Checking availability for:', productId, size, 'quantity:', requestedQuantity);
    
    if (!db) {
      console.error('❌ Database not initialized');
      return false;
    }
    
    const inventoryId = `${productId}_${size}`;
    console.log('📋 Looking for inventory ID:', inventoryId);
    
    const inventoryDoc = await getDoc(doc(db, 'inventory', inventoryId));
    
    if (!inventoryDoc.exists()) {
      console.log('❌ Inventory document not found:', inventoryId);
      return false;
    }
    
    const item = inventoryDoc.data() as InventoryItem;
    console.log('📦 Found inventory item:', item);
    console.log('✅ Available:', item.available, 'Requested:', requestedQuantity);
    
    const isAvailable = item.available >= requestedQuantity;
    console.log('🎯 Is available:', isAvailable);
    return isAvailable;
  } catch (error) {
    console.error('❌ Error checking availability:', error);
    return false;
  }
}

// Reserve stock (when item added to cart)
export async function reserveStock(productId: string, size: string, quantity: number): Promise<boolean> {
  try {
    if (!db) {
      console.error('❌ Database not initialized');
      return false;
    }
    const inventoryId = `${productId}_${size}`;
    const inventoryRef = doc(db, 'inventory', inventoryId);
    const inventoryDoc = await getDoc(inventoryRef);
    
    if (!inventoryDoc.exists()) {
      return false;
    }
    
    const item = inventoryDoc.data() as InventoryItem;
    
    if (item.available < quantity) {
      return false;
    }
    
    await updateDoc(inventoryRef, {
      reserved: item.reserved + quantity,
      available: item.available - quantity,
      lastUpdated: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error reserving stock:', error);
    return false;
  }
}

// Release reserved stock (when item removed from cart)
export async function releaseStock(productId: string, size: string, quantity: number): Promise<boolean> {
  try {
    if (!db) {
      console.error('❌ Database not initialized');
      return false;
    }
    const inventoryId = `${productId}_${size}`;
    const inventoryRef = doc(db, 'inventory', inventoryId);
    const inventoryDoc = await getDoc(inventoryRef);
    
    if (!inventoryDoc.exists()) {
      return false;
    }
    
    const item = inventoryDoc.data() as InventoryItem;
    
    await updateDoc(inventoryRef, {
      reserved: Math.max(0, item.reserved - quantity),
      available: item.available + quantity,
      lastUpdated: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error releasing stock:', error);
    return false;
  }
}

// Deduct stock (when order is completed)
export async function deductStock(productId: string, size: string, quantity: number): Promise<boolean> {
  try {
    if (!db) {
      console.error('❌ Database not initialized');
      return false;
    }
    const inventoryId = `${productId}_${size}`;
    const inventoryRef = doc(db, 'inventory', inventoryId);
    const inventoryDoc = await getDoc(inventoryRef);
    
    if (!inventoryDoc.exists()) {
      return false;
    }
    
    const item = inventoryDoc.data() as InventoryItem;
    
    const newQuantity = item.quantity - quantity;
    const newReserved = Math.max(0, item.reserved - quantity);
    const newAvailable = newQuantity - newReserved;

    await updateDoc(inventoryRef, {
      quantity: newQuantity,
      reserved: newReserved,
      available: newAvailable,
      lastUpdated: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error deducting stock:', error);
    return false;
  }
}

// Get all inventory for admin
export async function getAllInventory(): Promise<InventoryItem[]> {
  try {
    if (!db) {
      console.error('❌ Database not initialized');
      return [];
    }
    
    // Get inventory data (no server-side sorting to allow client-side sorting)
    const inventoryQuery = query(collection(db, 'inventory'));
    const inventorySnapshot = await getDocs(inventoryQuery);
    
    // Get products data to enrich with supplier codes
    const productsQuery = query(collection(db, 'products'));
    const productsSnapshot = await getDocs(productsQuery);
    
    // Create a map of productId to supplierCode
    const productMap = new Map<string, string>();
    productsSnapshot.docs.forEach(doc => {
      const product = doc.data();
      productMap.set(product.id, product.supplierCode || '');
    });
    
    // Map inventory items and add supplier codes
    return inventorySnapshot.docs.map(doc => {
      const item = doc.data() as InventoryItem;
      return {
        ...item,
        supplierCode: productMap.get(item.productId) || ''
      };
    });
  } catch (error) {
    console.error('❌ Error getting all inventory:', error);
    return [];
  }
}

// Update stock levels (admin function)
export async function updateStock(productId: string, size: string, newQuantity: number): Promise<boolean> {
  try {
    if (!db) {
      console.error('❌ Database not initialized');
      return false;
    }
    const inventoryId = `${productId}_${size}`;
    const inventoryRef = doc(db, 'inventory', inventoryId);
    const inventoryDoc = await getDoc(inventoryRef);
    
    if (!inventoryDoc.exists()) {
      return false;
    }
    
    const item = inventoryDoc.data() as InventoryItem;
    const newAvailable = newQuantity - item.reserved;
    
    await updateDoc(inventoryRef, {
      quantity: newQuantity,
      available: Math.max(0, newAvailable),
      lastUpdated: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error updating stock:', error);
    return false;
  }
}

// Deduct stock for multiple items (for order processing)
export async function deductStockForOrder(items: any[]): Promise<{ success: boolean; errors: string[] }> {
  const errors: string[] = [];
  let successCount = 0;
  
  console.log('📦 Deducting stock for', items.length, 'items');
  
  for (const item of items) {
    try {
      console.log(`📦 Deducting ${item.quantity} of ${item.id} size ${item.size}`);
      const success = await deductStock(item.id, item.size, item.quantity);
      if (success) {
        successCount++;
        console.log(`✅ Stock deducted for ${item.id} size ${item.size}`);
      } else {
        errors.push(`Failed to deduct stock for ${item.name} (${item.size})`);
        console.error(`❌ Failed to deduct stock for ${item.id} size ${item.size}`);
      }
    } catch (error) {
      errors.push(`Error deducting stock for ${item.name} (${item.size}): ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error(`❌ Error deducting stock for ${item.id} size ${item.size}:`, error);
    }
  }
  
  const success = successCount === items.length;
  console.log(`📦 Stock deduction complete: ${successCount}/${items.length} items processed successfully`);
  
  return { success, errors };
}
