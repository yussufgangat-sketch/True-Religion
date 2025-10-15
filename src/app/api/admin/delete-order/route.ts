import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

let app;
let db;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('✅ Firebase initialized successfully for delete-order API');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('🗑️ DELETE request received');
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    const { orderId } = body;

    if (!orderId) {
      console.error('❌ Order ID is missing');
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    if (!db) {
      console.error('❌ Database not initialized');
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    console.log(`🗑️ Deleting order: ${orderId}`);

    try {
      // Delete the order from true_religion_orders collection
      await deleteDoc(doc(db, 'true_religion_orders', orderId));
      console.log(`✅ Deleted order: ${orderId}`);

      // Delete associated user order links
      const linksQuery = query(
        collection(db, 'user_order_links'),
        where('orderId', '==', orderId)
      );
      const linksSnapshot = await getDocs(linksQuery);
      
      console.log(`📊 Found ${linksSnapshot.size} user order links to delete`);
      
      const deleteLinkPromises = linksSnapshot.docs.map(async (linkDoc) => {
        await deleteDoc(doc(db, 'user_order_links', linkDoc.id));
        console.log(`✅ Deleted user order link: ${linkDoc.id}`);
      });
      
      await Promise.all(deleteLinkPromises);

      console.log('🎉 Order deletion completed successfully');
      return NextResponse.json({ 
        success: true, 
        message: 'Order deleted successfully',
        deletedLinks: linksSnapshot.size
      });
      
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error deleting order:', error);
    return NextResponse.json(
      { error: `Failed to delete order: ${error.message}` },
      { status: 500 }
    );
  }
}

// API to delete all orders
export async function POST(request: NextRequest) {
  try {
    console.log('🗑️ POST request received for delete all orders');
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    const { action } = body;

    if (action !== 'delete-all') {
      console.error('❌ Invalid action:', action);
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (!db) {
      console.error('❌ Database not initialized');
      return NextResponse.json({ error: 'Database not initialized' }, { status: 500 });
    }

    console.log('🗑️ Starting to delete all orders...');

    try {
      // Get all orders
      const ordersQuery = query(collection(db, 'true_religion_orders'));
      const ordersSnapshot = await getDocs(ordersQuery);
      
      console.log(`📊 Found ${ordersSnapshot.size} orders to delete`);
      
      // Delete each order
      const deletePromises = ordersSnapshot.docs.map(async (orderDoc) => {
        await deleteDoc(doc(db, 'true_religion_orders', orderDoc.id));
        console.log(`✅ Deleted order: ${orderDoc.id}`);
      });
      
      await Promise.all(deletePromises);

      // Delete all user order links
      const linksQuery = query(collection(db, 'user_order_links'));
      const linksSnapshot = await getDocs(linksQuery);
      
      console.log(`📊 Found ${linksSnapshot.size} user order links to delete`);
      
      const deleteLinkPromises = linksSnapshot.docs.map(async (linkDoc) => {
        await deleteDoc(doc(db, 'user_order_links', linkDoc.id));
        console.log(`✅ Deleted user order link: ${linkDoc.id}`);
      });
      
      await Promise.all(deleteLinkPromises);

      console.log('🎉 All orders and links have been successfully deleted!');

      return NextResponse.json({ 
        success: true, 
        message: `Successfully deleted ${ordersSnapshot.size} orders and ${linksSnapshot.size} user order links`,
        deletedOrders: ordersSnapshot.size,
        deletedLinks: linksSnapshot.size
      });
      
    } catch (dbError) {
      console.error('❌ Database error during bulk delete:', dbError);
      return NextResponse.json(
        { error: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error deleting all orders:', error);
    return NextResponse.json(
      { error: `Failed to delete all orders: ${error.message}` },
      { status: 500 }
    );
  }
}
