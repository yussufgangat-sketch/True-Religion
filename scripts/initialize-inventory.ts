import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { products } from '../src/data/products';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: 'true-religion-1363f.firebaseapp.com',
  projectId: 'true-religion-1363f',
  storageBucket: 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: '889271935394',
  appId: '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

interface InventoryItem {
  id: string;
  productId: string;
  ref: string;
  size: string;
  quantity: number;
  reserved: number;
  available: number;
  lastUpdated: string;
}

async function initializeInventory() {
  try {
    console.log('🚀 Starting inventory initialization...');
    console.log(`📦 Found ${products.length} products to process`);
    
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
    
    console.log('✅ Inventory initialization completed successfully!');
    console.log('📊 You can now view inventory at /admin/inventory');
    
  } catch (error) {
    console.error('❌ Error during inventory initialization:', error);
  }
}

// Run the initialization
initializeInventory();
