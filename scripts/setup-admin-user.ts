import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

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

async function setupAdminUser() {
  try {
    console.log('🔧 Setting up admin user...');
    
    const adminEmail = 'admin@truereligion.com';
    const adminPassword = 'admin123456'; // You can change this password
    
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
      
      if (userData.role === 'admin') {
        console.log('✅ Admin user has correct role');
        return;
      } else {
        console.log('⚠️ User exists but is not admin, updating role...');
        // Update role to admin
        const { updateDoc, doc } = await import('firebase/firestore');
        await updateDoc(doc(db, 'users', userDoc.id), {
          role: 'admin',
          isActive: true,
          updatedAt: new Date().toISOString()
        });
        console.log('✅ User role updated to admin');
        return;
      }
    }
    
    // Try to create user in Firebase Auth
    try {
      console.log('🔐 Creating user in Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      console.log('✅ User created in Firebase Auth:', userCredential.user.uid);
      
      // Create user document in Firestore
      console.log('📝 Creating user document in Firestore...');
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        email: adminEmail,
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      console.log('✅ Admin user setup completed successfully!');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
      console.log('👑 Role: admin');
      
    } catch (authError: any) {
      if (authError.code === 'auth/email-already-in-use') {
        console.log('⚠️ User already exists in Firebase Auth, creating Firestore document...');
        
        // Try to sign in to get the user
        try {
          const signInResult = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
          console.log('✅ Successfully signed in existing user');
          
          // Create user document in Firestore
          await addDoc(collection(db, 'users'), {
            uid: signInResult.user.uid,
            email: adminEmail,
            role: 'admin',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          
          console.log('✅ Admin user document created in Firestore!');
          console.log('📧 Email:', adminEmail);
          console.log('🔑 Password:', adminPassword);
          console.log('👑 Role: admin');
          
        } catch (signInError) {
          console.error('❌ Error signing in existing user:', signInError);
          console.log('💡 Please check the password or reset it manually in Firebase Console');
        }
      } else {
        console.error('❌ Error creating user in Firebase Auth:', authError);
      }
    }
    
  } catch (error) {
    console.error('❌ Error setting up admin user:', error);
  }
}

// Run the setup
setupAdminUser();