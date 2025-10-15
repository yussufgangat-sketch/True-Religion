async function syncFirebaseUsers() {
  try {
    console.log('🔄 Starting Firebase Auth user sync...');
    console.log('📡 Calling sync API endpoint...');
    
    const response = await fetch('http://localhost:3000/api/auth/sync-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('\n📊 Sync Summary:');
      console.log(`✅ Synced: ${result.stats?.synced || 0} users`);
      console.log(`⚠️ Skipped: ${result.stats?.skipped || 0} users (already exist)`);
      console.log(`📈 Total Firebase Auth users: ${result.stats?.totalAuthUsers || 0}`);
      
      console.log('\n🎉 Firebase Auth user sync completed!');
      console.log('🔗 You can now access the admin panel at /admin/login');
      console.log('📋 Your Firebase Auth users can now log in to the admin system');
    } else {
      console.error('❌ Sync failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Error syncing Firebase Auth users:', error);
    console.log('\n💡 Alternative: Use the web interface at /admin/sync-users');
  }
}

syncFirebaseUsers();
