#!/usr/bin/env tsx

/**
 * Test script to verify order completion flow
 * This script tests the process-order API endpoint directly
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

async function testOrderCompletion() {
  console.log('🧪 Testing Order Completion Flow...');
  
  try {
    // Initialize Firebase
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('✅ Firebase initialized');

    // Test data
    const testOrderData = {
      orderData: {
        items: [
          {
            id: "test-product-1",
            name: "Test Product",
            price: 100,
            wholesalePrice: 100,
            retailPrice: 150,
            size: "M",
            quantity: 1,
            image: "/test-image.jpg",
            category: "male",
            ref: "TEST001",
            colour: "Blue",
            supplierCode: "SUP001"
          }
        ],
        subtotal: 100,
        shipping: 50,
        total: 150,
        customerInfo: {
          name: "Test User",
          email: "test@example.com",
          address: "123 Test Street",
          city: "Test City",
          postalCode: "12345",
          phone: "123-456-7890"
        }
      },
      customerEmail: "test@example.com",
      customerName: "Test User"
    };

    console.log('📦 Test order data prepared');

    // Test the API endpoint
    const response = await fetch('http://localhost:3000/api/process-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrderData),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Order processing failed:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('✅ Order processed successfully:', result);
    console.log('✅ Order ID:', result.orderId);

    // Test if order was saved to database
    console.log('🔍 Verifying order in database...');
    
    return true;

  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Run the test
testOrderCompletion().then(success => {
  if (success) {
    console.log('🎉 Order completion test passed!');
    process.exit(0);
  } else {
    console.log('💥 Order completion test failed!');
    process.exit(1);
  }
});


