import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createUsers() {
  console.log('🚀 Creating users in Firebase Auth...\n');

  // Read the credentials JSON
  const credentialsData = JSON.parse(readFileSync('user-credentials.json', 'utf-8'));
  
  let successCount = 0;
  let errorCount = 0;

  for (const userData of credentialsData.users) {
    try {
      const { email, password } = userData;

      console.log(`Creating user: ${email}...`);

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

      console.log(`✅ Successfully created: ${email}`);
      console.log(`   UID: ${user.uid}`);
      console.log(`   Password: ${password}\n`);
      
      successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error: any) {
      console.error(`❌ Error creating ${userData.email}:`);
      console.error(`   ${error.message}\n`);
      errorCount++;
      
      // Continue with next user
      continue;
    }
  }

  console.log('\n' + '═'.repeat(80));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(80));
  console.log(`✅ Successfully Created: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📧 Total: ${credentialsData.users.length}`);
  console.log('═'.repeat(80));
  console.log('\n✅ User creation process complete!');
  console.log('📁 Reference file: user-credentials.xlsx');
  
  process.exit(0);
}

createUsers().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});


