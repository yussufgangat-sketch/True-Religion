import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('🔥 WORKING FIREBASE TEST...');
    
    const body = await req.json();
    console.log('📝 Request body:', JSON.stringify(body, null, 2));
    
    // Test Firebase with proper error handling
    try {
      console.log('🔥 Importing Firebase...');
      
      // Dynamic imports to avoid build issues
      const { initializeApp, getApps } = await import('firebase/app');
      const { getFirestore, collection, addDoc } = await import('firebase/firestore');
      
      console.log('🔥 Firebase imports successful');
      
      const firebaseConfig = {
        apiKey: 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
        authDomain: 'true-religion-1363f.firebaseapp.com',
        projectId: 'true-religion-1363f',
        storageBucket: 'true-religion-1363f.firebasestorage.app',
        messagingSenderId: '889271935394',
        appId: '1:889271935394:web:74ef8072cdf1fc3877d2fb',
      };
      
      console.log('🔥 Config created:', firebaseConfig);
      
      // Initialize Firebase app
      let app;
      if (getApps().length === 0) {
        console.log('🔥 Creating new Firebase app...');
        app = initializeApp(firebaseConfig);
      } else {
        console.log('🔥 Using existing Firebase app...');
        app = getApps()[0];
      }
      
      console.log('🔥 Firebase app ready');
      
      // Get Firestore with default database
      console.log('🔥 Getting Firestore with default database...');
      const db = getFirestore(app); // Use default database
      console.log('🔥 Firestore ready with default database');
      
      // Create test document
      console.log('🔥 Creating test document...');
      const testDoc = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'Working Firebase test',
        orderId: `TEST-${Date.now()}`
      };
      
      console.log('🔥 Test document data:', testDoc);
      
      const docRef = await addDoc(collection(db, 'test-orders'), testDoc);
      console.log('✅ Firebase SUCCESS - Document ID:', docRef.id);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Firebase test successful',
        docId: docRef.id,
        config: {
          projectId: firebaseConfig.projectId,
          authDomain: firebaseConfig.authDomain
        }
      });
      
    } catch (firebaseError) {
      console.log('❌ Firebase ERROR:', firebaseError);
      console.log('❌ Firebase ERROR details:', {
        name: firebaseError.name,
        message: firebaseError.message,
        code: firebaseError.code,
        stack: firebaseError.stack
      });
      
      return NextResponse.json({ 
        success: false, 
        error: firebaseError.message,
        details: {
          name: firebaseError.name,
          code: firebaseError.code,
          message: firebaseError.message
        }
      });
    }

  } catch (error) {
    console.error('❌ WORKING FIREBASE ERROR:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Working Firebase test failed' 
      },
      { status: 500 }
    );
  }
}
