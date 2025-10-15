import { readFileSync } from 'fs';

async function createUsers() {
  console.log('🚀 Creating users in Firebase...\n');

  // Read the credentials JSON
  const credentialsData = JSON.parse(readFileSync('user-credentials.json', 'utf-8'));
  
  try {
    const response = await fetch('http://localhost:3000/api/admin/create-bulk-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        users: credentialsData.users
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Users created successfully!\n');
      console.log('📊 Summary:');
      console.log(`   Total: ${result.summary.total}`);
      console.log(`   Successful: ${result.summary.successful}`);
      console.log(`   Failed: ${result.summary.failed}\n`);

      console.log('📋 Results:');
      result.results.forEach((r: any) => {
        if (r.status === 'success') {
          console.log(`   ✅ ${r.email} - ${r.message}`);
        } else {
          console.log(`   ❌ ${r.email} - ${r.message}`);
        }
      });
    } else {
      console.error('❌ Error:', result.error);
    }
  } catch (error: any) {
    console.error('❌ Failed to create users:', error.message);
    console.log('\n⚠️  Make sure the development server is running:');
    console.log('   npm run dev');
  }
}

createUsers();


