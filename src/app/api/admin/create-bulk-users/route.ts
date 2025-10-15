import { NextRequest, NextResponse } from 'next/server';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { users } = body; // Array of { email, password }

    if (!users || !Array.isArray(users)) {
      return NextResponse.json(
        { error: 'Invalid request. Expected array of users.' },
        { status: 400 }
      );
    }

    const results = [];

    for (const userData of users) {
      try {
        const { email, password } = userData;

        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: 'user',
          createdAt: new Date().toISOString(),
          emailVerified: false,
        });

        results.push({
          email,
          uid: user.uid,
          status: 'success',
          message: 'User created successfully'
        });

        console.log(`✅ Created user: ${email}`);
      } catch (error: any) {
        console.error(`❌ Error creating user ${userData.email}:`, error.message);
        
        results.push({
          email: userData.email,
          status: 'error',
          message: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      summary: {
        total: users.length,
        successful: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'error').length,
      }
    });

  } catch (error: any) {
    console.error('❌ Bulk user creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create users', details: error.message },
      { status: 500 }
    );
  }
}


