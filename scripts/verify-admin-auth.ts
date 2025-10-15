import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function verifyAdminAuth() {
  try {
    console.log('🔐 Verifying admin authentication...');
    
    const adminEmail = 'admin@truereligion.com';
    const adminPassword = 'admin123456';
    
    // Try to sign in first
    try {
      console.log('🔑 Attempting to sign in with existing credentials...');
      const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      console.log('✅ Successfully signed in!');
      console.log('📧 Email:', userCredential.user.email);
      console.log('🆔 UID:', userCredential.user.uid);
      console.log('✅ Admin authentication is working correctly!');
      
    } catch (signInError: any) {
      console.log('❌ Sign in failed:', signInError.message);
      
      if (signInError.code === 'auth/user-not-found') {
        console.log('🔧 User not found in Firebase Auth, creating new user...');
        
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
          console.log('✅ Admin user created successfully!');
          console.log('📧 Email:', userCredential.user.email);
          console.log('🆔 UID:', userCredential.user.uid);
          console.log('🔑 Password:', adminPassword);
          
        } catch (createError: any) {
          console.error('❌ Error creating user:', createError.message);
        }
        
      } else if (signInError.code === 'auth/wrong-password') {
        console.log('❌ Wrong password. Please check the password or reset it in Firebase Console.');
        console.log('💡 Current password being tested:', adminPassword);
        
      } else {
        console.error('❌ Authentication error:', signInError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error verifying admin auth:', error);
  }
}

// Run the verification
verifyAdminAuth();


