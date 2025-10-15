import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

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
const db = getFirestore(app);

async function resetAdminUser() {
  try {
    console.log('🔄 Resetting admin user...');
    
    const adminEmail = 'admin@truereligion.com';
    const adminPassword = 'admin123'; // Simple password for testing
    
    // First, check if user exists in Firestore
    const usersQuery = query(
      collection(db, 'users'),
      where('email', '==', adminEmail)
    );
    
    const snapshot = await getDocs(usersQuery);
    
    // Try to create user in Firebase Auth (this will work even if user exists)
    try {
      console.log('🔐 Creating/updating user in Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      console.log('✅ User created/updated in Firebase Auth:', userCredential.user.uid);
      
      // Update or create user document in Firestore
      if (!snapshot.empty) {
        console.log('📝 Updating existing user document in Firestore...');
        const userDoc = snapshot.docs[0];
        await updateDoc(doc(db, 'users', userDoc.id), {
          uid: userCredential.user.uid,
          email: adminEmail,
          role: 'admin',
          isActive: true,
          updatedAt: new Date().toISOString()
        });
        console.log('✅ User document updated in Firestore');
      } else {
        console.log('📝 Creating new user document in Firestore...');
        await addDoc(collection(db, 'users'), {
          uid: userCredential.user.uid,
          email: adminEmail,
          role: 'admin',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        console.log('✅ User document created in Firestore');
      }
      
      console.log('🎉 Admin user setup completed successfully!');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
      console.log('👑 Role: admin');
      console.log('🆔 UID:', userCredential.user.uid);
      
    } catch (authError: any) {
      if (authError.code === 'auth/email-already-in-use') {
        console.log('⚠️ User already exists in Firebase Auth');
        console.log('💡 The user exists but password might be different');
        console.log('📧 Email:', adminEmail);
        console.log('🔑 Try password:', adminPassword);
        console.log('🔧 If this doesn\'t work, you may need to reset the password in Firebase Console');
        
        // Still ensure Firestore document exists
        if (!snapshot.empty) {
          console.log('✅ User document exists in Firestore');
        } else {
          console.log('📝 Creating user document in Firestore...');
          await addDoc(collection(db, 'users'), {
            email: adminEmail,
            role: 'admin',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          console.log('✅ User document created in Firestore');
        }
        
      } else {
        console.error('❌ Error with Firebase Auth:', authError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error resetting admin user:', error);
  }
}

// Run the reset
resetAdminUser();


