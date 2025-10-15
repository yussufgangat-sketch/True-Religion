import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteAllOrders() {
  try {
    console.log('🗑️ Starting to delete all orders...');
    
    // Get all orders from true_religion_orders collection
    const ordersQuery = query(collection(db, 'true_religion_orders'));
    const ordersSnapshot = await getDocs(ordersQuery);
    
    console.log(`📊 Found ${ordersSnapshot.size} orders to delete`);
    
    // Delete each order
    const deletePromises = ordersSnapshot.docs.map(async (orderDoc) => {
      await deleteDoc(doc(db, 'true_religion_orders', orderDoc.id));
      console.log(`✅ Deleted order: ${orderDoc.id}`);
    });
    
    await Promise.all(deletePromises);
    
    // Also delete all user order links
    const linksQuery = query(collection(db, 'user_order_links'));
    const linksSnapshot = await getDocs(linksQuery);
    
    console.log(`📊 Found ${linksSnapshot.size} user order links to delete`);
    
    const deleteLinkPromises = linksSnapshot.docs.map(async (linkDoc) => {
      await deleteDoc(doc(db, 'user_order_links', linkDoc.id));
      console.log(`✅ Deleted user order link: ${linkDoc.id}`);
    });
    
    await Promise.all(deleteLinkPromises);
    
    console.log('🎉 All orders and links have been successfully deleted!');
    console.log('💰 Total revenue is now R0.00');
    
  } catch (error) {
    console.error('❌ Error deleting orders:', error);
  }
}

// Run the deletion
deleteAllOrders();


