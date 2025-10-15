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

async function testDeleteOrders() {
  try {
    console.log('🔍 Testing delete orders functionality...');
    
    // Check orders collection
    console.log('📊 Checking orders collection...');
    const ordersQuery = query(collection(db, 'true_religion_orders'));
    const ordersSnapshot = await getDocs(ordersQuery);
    
    console.log(`📋 Found ${ordersSnapshot.size} orders:`);
    ordersSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ID: ${doc.id}, Order ID: ${data.orderId}, Customer: ${data.customerName}`);
    });
    
    // Check user order links
    console.log('🔗 Checking user order links...');
    const linksQuery = query(collection(db, 'user_order_links'));
    const linksSnapshot = await getDocs(linksQuery);
    
    console.log(`🔗 Found ${linksSnapshot.size} user order links:`);
    linksSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ID: ${doc.id}, Order ID: ${data.orderId}, User: ${data.userId}`);
    });
    
    // Test deleting the first order if any exist
    if (ordersSnapshot.size > 0) {
      const firstOrder = ordersSnapshot.docs[0];
      const orderId = firstOrder.id;
      const orderData = firstOrder.data();
      
      console.log(`🗑️ Testing deletion of order: ${orderData.orderId} (ID: ${orderId})`);
      
      try {
        // Delete the order
        await deleteDoc(doc(db, 'true_religion_orders', orderId));
        console.log('✅ Order deleted successfully');
        
        // Delete associated links
        const orderLinksQuery = query(
          collection(db, 'user_order_links'),
          where('orderId', '==', orderData.orderId)
        );
        const orderLinksSnapshot = await getDocs(orderLinksQuery);
        
        console.log(`🔗 Found ${orderLinksSnapshot.size} links to delete for this order`);
        
        const deleteLinkPromises = orderLinksSnapshot.docs.map(async (linkDoc) => {
          await deleteDoc(doc(db, 'user_order_links', linkDoc.id));
          console.log(`✅ Deleted link: ${linkDoc.id}`);
        });
        
        await Promise.all(deleteLinkPromises);
        
        console.log('🎉 Test deletion completed successfully!');
        
      } catch (deleteError) {
        console.error('❌ Error during test deletion:', deleteError);
      }
    } else {
      console.log('ℹ️ No orders found to test deletion');
    }
    
  } catch (error) {
    console.error('❌ Error testing delete orders:', error);
  }
}

// Run the test
testDeleteOrders();


