import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists in admin users collection with admin role
    const usersQuery = query(
      collection(db, 'users'),
      where('email', '==', email),
      where('role', '==', 'admin'),
      where('isActive', '==', true)
    );

    const snapshot = await getDocs(usersQuery);
    
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();
      
      return NextResponse.json({
        success: true,
        isAdmin: true,
        user: {
          id: userDoc.id,
          email: userData.email,
          role: userData.role,
          isActive: userData.isActive
        }
      });
    } else {
      // Check if user exists but is not admin
      const allUsersQuery = query(
        collection(db, 'users'),
        where('email', '==', email)
      );
      
      const allUsersSnapshot = await getDocs(allUsersQuery);
      
      if (!allUsersSnapshot.empty) {
        const userDoc = allUsersSnapshot.docs[0];
        const userData = userDoc.data();
        
        return NextResponse.json({
          success: true,
          isAdmin: false,
          user: {
            id: userDoc.id,
            email: userData.email,
            role: userData.role,
            isActive: userData.isActive
          }
        });
      } else {
        return NextResponse.json({
          success: true,
          isAdmin: false,
          user: null
        });
      }
    }

  } catch (error) {
    console.error('Check admin error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


