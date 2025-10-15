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

const defaultUsers = [
  {
    email: 'admin@truereligion.com',
    password: 'admin123',
    role: 'admin',
    isActive: true
  },
  {
    email: 'manager@truereligion.com',
    password: 'manager123',
    role: 'admin',
    isActive: true
  },
  {
    email: 'user@truereligion.com',
    password: 'user123',
    role: 'user',
    isActive: true
  }
];

async function initializeAdminUsers() {
  try {
    console.log('🚀 Initializing admin users...');

    for (const user of defaultUsers) {
      // Check if user already exists
      const existingQuery = query(
        collection(db, 'users'),
        where('email', '==', user.email)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        await addDoc(collection(db, 'users'), {
          ...user,
          createdAt: new Date().toISOString()
        });
        console.log(`✅ Created user: ${user.email} (${user.role})`);
      } else {
        console.log(`⚠️ User already exists: ${user.email}`);
      }
    }

    console.log('✅ Admin users initialization completed!');
    console.log('\n📋 Default Login Credentials:');
    console.log('Admin: admin@truereligion.com / admin123');
    console.log('Manager: manager@truereligion.com / manager123');
    console.log('User: user@truereligion.com / user123');
    console.log('\n🔗 Access admin panel at: /admin/login');

  } catch (error) {
    console.error('❌ Error initializing admin users:', error);
  }
}

initializeAdminUsers();



