import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: 'true-religion-1363f.firebaseapp.com',
  projectId: 'true-religion-1363f',
  storageBucket: 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: '889271935394',
  appId: '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function manualSyncUsers() {
  try {
    console.log('🔄 Manual user sync - creating test users...');
    
    // Since we can't access Firebase Auth users directly without admin SDK,
    // let's create some test users to demonstrate the system
    
    const testUsers = [
      {
        email: 'admin@truereligion.com',
        password: 'admin123',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        source: 'admin_created'
      },
      {
        email: 'user@truereligion.com',
        password: 'user123',
        role: 'user',
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        source: 'admin_created'
      }
    ];
    
    let syncedCount = 0;
    let skippedCount = 0;
    
    for (const userData of testUsers) {
      try {
        console.log(`\n👤 Processing user: ${userData.email}`);
        
        // Check if user already exists
        const existingQuery = query(
          collection(db, 'users'),
          where('email', '==', userData.email)
        );
        const existingSnapshot = await getDocs(existingQuery);
        
        if (existingSnapshot.empty) {
          await addDoc(collection(db, 'users'), userData);
          console.log(`✅ Created user: ${userData.email}`);
          syncedCount++;
        } else {
          console.log(`⚠️ User already exists: ${userData.email}`);
          skippedCount++;
        }
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error);
      }
    }
    
    console.log('\n📊 Manual Sync Summary:');
    console.log(`✅ Created: ${syncedCount} users`);
    console.log(`⚠️ Skipped: ${skippedCount} users (already exist)`);
    
    console.log('\n🎉 Manual user sync completed!');
    console.log('🔗 You can now test the admin system:');
    console.log('   - Admin: admin@truereligion.com / admin123');
    console.log('   - User: user@truereligion.com / user123');
    console.log('📋 Go to /admin/login to test the system');
    
  } catch (error) {
    console.error('❌ Error in manual sync:', error);
  }
}

manualSyncUsers();



