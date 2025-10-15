import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('🔥 SIMPLE FIREBASE TEST...');
    
    const body = await req.json();
    console.log('📝 Request body:', JSON.stringify(body, null, 2));
    
    // Test Firebase with minimal setup
    try {
      console.log('🔥 Initializing Firebase...');
      
      // Use dynamic imports to avoid build-time issues
      const { initializeApp, getApps } = await import('firebase/app');
      const { getFirestore, collection, addDoc } = await import('firebase/firestore');
      
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
      };
      
      console.log('🔥 Creating Firebase app...');
      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      
      console.log('🔥 Getting Firestore with default database...');
      const db = getFirestore(app); // Use default database
      
      console.log('🔥 Creating test document...');
      const testDoc = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'Simple Firebase test'
      };
      
      const docRef = await addDoc(collection(db, 'test-orders'), testDoc);
      console.log('✅ Firebase SUCCESS:', docRef.id);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Firebase test successful',
        docId: docRef.id
      });
      
    } catch (firebaseError) {
      console.log('❌ Firebase ERROR:', firebaseError);
      return NextResponse.json({ 
        success: false, 
        error: firebaseError.message,
        details: firebaseError.toString()
      });
    }

  } catch (error) {
    console.error('❌ SIMPLE FIREBASE ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Simple Firebase test failed' 
      },
      { status: 500 }
    );
  }
}
