import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // First, try Firebase Auth login
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Check if user exists in admin users collection
      const usersQuery = query(
        collection(db, 'users'),
        where('email', '==', email)
      );
      const snapshot = await getDocs(usersQuery);
      
      let userData;
      if (!snapshot.empty) {
        // User exists in admin collection
        const userDoc = snapshot.docs[0];
        userData = userDoc.data();
        
        // Update last login
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(userDoc.ref, {
          lastLogin: new Date().toISOString()
        });
      } else {
        // User doesn't exist in admin collection, create them
        const { addDoc } = await import('firebase/firestore');
        const newUserData = {
          email: firebaseUser.email,
          password: 'firebase_auth_user',
          role: 'user', // Default role for Firebase Auth users
          isActive: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          firebaseUid: firebaseUser.uid,
          source: 'firebase_auth'
        };
        
        const docRef = await addDoc(collection(db, 'users'), newUserData);
        userData = newUserData;
        userData.id = docRef.id;
      }
      
      return NextResponse.json({
        success: true,
        user: {
          id: userData.id || snapshot.docs[0]?.id,
          email: userData.email,
          role: userData.role,
          isActive: userData.isActive
        }
      });
      
    } catch (firebaseAuthError) {
      // If Firebase Auth fails, try admin users collection
      console.log('Firebase Auth failed, trying admin users collection...');
      
      const usersQuery = query(
        collection(db, 'users'),
        where('email', '==', email),
        where('password', '==', password),
        where('isActive', '==', true)
      );

      const snapshot = await getDocs(usersQuery);
      
      if (snapshot.empty) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      // Update last login
      const { updateDoc } = await import('firebase/firestore');
      await updateDoc(userDoc.ref, {
        lastLogin: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        user: {
          id: userDoc.id,
          email: userData.email,
          role: userData.role,
          isActive: userData.isActive
        }
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
