import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

let app: any;
let db: any;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully for order status update');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Try to reinitialize if first attempt failed
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('✅ Firebase reinitialized successfully');
  } catch (retryError) {
    console.error('❌ Firebase reinitialization failed:', retryError);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('🔄 UPDATING ORDER STATUS...');
    
    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      console.error('❌ JSON parsing failed:', jsonError);
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }
    
    const { orderId, status, newStatus, notes } = body;
    const actualNewStatus = status || newStatus; // Support both parameter names
    
    console.log('📝 Update data:', { orderId, status, newStatus, actualNewStatus, notes });
    
    if (!orderId || !actualNewStatus) {
      console.error('❌ Missing required fields:', { orderId, actualNewStatus });
      return NextResponse.json(
        { success: false, error: 'Order ID and new status are required' },
        { status: 400 }
      );
    }
    
    if (!db) {
      console.error('❌ Firestore not initialized, attempting to reinitialize...');
      try {
        app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log('✅ Firestore reinitialized successfully');
      } catch (reinitError) {
        console.error('❌ Firestore reinitialization failed:', reinitError);
        return NextResponse.json(
          { success: false, error: 'Database connection failed' },
          { status: 500 }
        );
      }
    }
    
    // Update order in true_religion_orders database
    console.log('🔍 Searching for order in true_religion_orders...');
    const orderQuery = query(
      collection(db, 'true_religion_orders'),
      where('orderId', '==', orderId)
    );
    
    const orderSnapshot = await getDocs(orderQuery);
    console.log('🔍 Order query results:', orderSnapshot.docs.length, 'documents found');
    
    if (orderSnapshot.empty) {
      console.error('❌ Order not found in true_religion_orders:', orderId);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }
    
    const orderDoc = orderSnapshot.docs[0];
    console.log('🔍 Found order document:', orderDoc.id);
    
    const updateData: any = {
      status: actualNewStatus,
      updatedAt: new Date().toISOString(),
      updatedTimestamp: Date.now()
    };
    
    if (notes) {
      updateData.notes = notes;
    }
    
    console.log('📝 Updating order with data:', updateData);
    await updateDoc(orderDoc.ref, updateData);
    console.log('✅ Order status updated in true_religion_orders');
    
    // Also update the user_order_links database
    console.log('🔍 Searching for order in user_order_links...');
    const linkQuery = query(
      collection(db, 'user_order_links'),
      where('orderId', '==', orderId)
    );
    
    const linkSnapshot = await getDocs(linkQuery);
    console.log('🔍 Link query results:', linkSnapshot.docs.length, 'documents found');
    
    if (!linkSnapshot.empty) {
      const linkDoc = linkSnapshot.docs[0];
      console.log('🔍 Found link document:', linkDoc.id);
      console.log('📝 Updating link with status:', actualNewStatus);
      await updateDoc(linkDoc.ref, {
        status: actualNewStatus,
        updatedAt: new Date().toISOString(),
        updatedTimestamp: Date.now()
      });
      console.log('✅ Order status updated in user_order_links');
    } else {
      console.log('⚠️ No matching link found in user_order_links, continuing...');
    }
    
    console.log('✅ Order status update completed successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      orderId,
      newStatus
    });
    
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update order status'
      },
      { status: 500 }
    );
  }
}

// Add PUT method support (same as POST)
export async function PUT(req: NextRequest) {
  return POST(req);
}
