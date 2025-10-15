import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
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
    console.log('🔧 Setting up admin user via API...');
    
    const adminEmail = 'admin@truereligion.com';
    const adminPassword = 'admin123'; // Simple password
    
    // Check if user already exists in Firestore
    const usersQuery = query(
      collection(db, 'users'),
      where('email', '==', adminEmail)
    );
    
    const snapshot = await getDocs(usersQuery);
    
    if (!snapshot.empty) {
      console.log('✅ Admin user already exists in Firestore');
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();
      
      // Ensure user has admin role
      if (userData.role !== 'admin') {
        await updateDoc(doc(db, 'users', userDoc.id), {
          role: 'admin',
          isActive: true,
          updatedAt: new Date().toISOString()
        });
        console.log('✅ User role updated to admin');
      }
      
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists and is properly configured',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
    }
    
    // Create new admin user in Firestore
    console.log('📝 Creating new admin user in Firestore...');
    const userRef = await addDoc(collection(db, 'users'), {
      email: adminEmail,
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log('✅ Admin user created successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      userId: userRef.id
    });
    
  } catch (error) {
    console.error('❌ Error setting up admin user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to setup admin user' },
      { status: 500 }
    );
  }
}