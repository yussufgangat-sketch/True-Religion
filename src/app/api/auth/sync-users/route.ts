import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function POST(req: NextRequest) {
  try {
    console.log('🔄 Starting user sync process...');
    
    // Create some default admin users for testing
    const defaultUsers = [
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
    
    for (const userData of defaultUsers) {
      try {
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
    
    return NextResponse.json({
      success: true,
      message: 'Default users created successfully',
      stats: {
        totalAuthUsers: defaultUsers.length,
        synced: syncedCount,
        skipped: skippedCount
      }
    });
    
  } catch (error) {
    console.error('❌ Error syncing users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync users' },
      { status: 500 }
    );
  }
}
