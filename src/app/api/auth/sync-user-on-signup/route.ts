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
    const { email, uid } = await req.json();

    if (!email || !uid) {
      return NextResponse.json(
        { success: false, error: 'Email and UID are required' },
        { status: 400 }
      );
    }

    console.log(`🔄 Syncing new user: ${email}`);

    // Check if user already exists in admin users collection
    const existingQuery = query(
      collection(db, 'users'),
      where('email', '==', email)
    );
    const existingSnapshot = await getDocs(existingQuery);
    
    if (existingSnapshot.empty) {
      // Create new user in admin collection
      const userData = {
        email: email,
        password: 'firebase_auth_user', // Placeholder since we can't get the password
        role: 'user', // Default role for Firebase Auth users
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        firebaseUid: uid, // Store Firebase UID for reference
        source: 'firebase_auth' // Mark as coming from Firebase Auth
      };
      
      const docRef = await addDoc(collection(db, 'users'), userData);
      console.log(`✅ Synced new user: ${email} with ID: ${docRef.id}`);
      
      return NextResponse.json({
        success: true,
        message: 'User synced successfully',
        userId: docRef.id
      });
    } else {
      console.log(`⚠️ User already exists in admin collection: ${email}`);
      return NextResponse.json({
        success: true,
        message: 'User already exists',
        userId: existingSnapshot.docs[0].id
      });
    }
    
  } catch (error) {
    console.error('❌ Error syncing user on signup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}



