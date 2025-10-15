import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = getAuth();
const db = getFirestore();

// User emails
const userEmails = [
  'david@fabulous.com.na',
  'matsimanel@gmail.com',
  'hdullabh@icloud.com',
  'info@delbropremium.co.za',
  'tuscanyoutfitters@gmail.com',
  'accounts@brandzz.co.za',
  'khiara.rama@gmail.com',
  'figo@fashionwalk.co.za',
  'riyaz@mweb.co.za',
  'legends01@webmail.co.za',
  'kamlesh@mweb.co.za',
  'dawjees@gmail.com',
];

// Generate 6-digit unique password
function generatePassword(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createUsersWithPasswords() {
  console.log('🚀 Starting user creation process...\n');

  const userCredentials: { email: string; password: string; uid?: string; status: string }[] = [];

  for (const email of userEmails) {
    const password = generatePassword();
    
    try {
      // Check if user already exists
      let user;
      try {
        user = await auth.getUserByEmail(email);
        console.log(`✅ User already exists: ${email}`);
        
        // Update password for existing user
        await auth.updateUser(user.uid, { password });
        console.log(`   🔄 Password updated for: ${email}`);
        
        userCredentials.push({
          email,
          password,
          uid: user.uid,
          status: 'Existing - Password Updated'
        });
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
          // Create new user
          user = await auth.createUser({
            email,
            password,
            emailVerified: false,
          });

          console.log(`✅ Created new user: ${email}`);
          console.log(`   UID: ${user.uid}`);
          console.log(`   Password: ${password}\n`);

          // Add user to Firestore
          await db.collection('users').doc(user.uid).set({
            email: user.email,
            role: 'user',
            createdAt: new Date().toISOString(),
            emailVerified: false,
          });

          console.log(`   📝 Added to Firestore\n`);

          userCredentials.push({
            email,
            password,
            uid: user.uid,
            status: 'New User Created'
          });
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      console.error(`❌ Error creating user ${email}:`, error.message);
      userCredentials.push({
        email,
        password,
        status: `Error: ${error.message}`
      });
    }
  }

  // Create Excel file
  console.log('\n📊 Creating Excel file...\n');

  const worksheetData = [
    ['Email', 'Password', 'User ID', 'Status'],
    ...userCredentials.map(cred => [cred.email, cred.password, cred.uid || 'N/A', cred.status])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'User Credentials');

  // Set column widths
  worksheet['!cols'] = [
    { wch: 35 }, // Email
    { wch: 15 }, // Password
    { wch: 30 }, // User ID
    { wch: 30 }, // Status
  ];

  // Write to file
  const fileName = 'user-credentials.xlsx';
  XLSX.writeFile(workbook, fileName);

  console.log(`✅ Excel file created: ${fileName}\n`);
  console.log('📋 User Credentials Summary:');
  console.log('═'.repeat(80));
  userCredentials.forEach(cred => {
    console.log(`Email: ${cred.email}`);
    console.log(`Password: ${cred.password}`);
    console.log(`Status: ${cred.status}`);
    console.log('─'.repeat(80));
  });

  console.log('\n✅ All users created successfully!');
  console.log(`📁 Credentials saved to: ${fileName}`);
}

createUsersWithPasswords().catch(console.error);


