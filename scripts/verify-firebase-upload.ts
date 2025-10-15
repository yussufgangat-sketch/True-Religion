import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import fs from 'fs';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function verifyUpload() {
  console.log('🔍 Checking Firebase Storage...\n');

  try {
    // List all items in products folder
    const productsRef = ref(storage, 'products');
    const result = await listAll(productsRef);

    console.log(`📁 Found ${result.prefixes.length} product folders in Firebase\n`);

    const mapping: Record<string, any> = {};

    for (const folderRef of result.prefixes) {
      const refCode = folderRef.name;
      console.log(`📦 Checking ${refCode}...`);

      const folderContents = await listAll(folderRef);
      const images: string[] = [];

      for (const item of folderContents.items) {
        const url = await getDownloadURL(item);
        images.push(url);
      }

      if (images.length > 0) {
        mapping[refCode] = {
          ref: refCode,
          folderName: `TR ${refCode.replace('TR', '')}`,
          images: images,
          primaryImage: images[0]
        };
        console.log(`   ✓ ${images.length} images found`);
      } else {
        console.log(`   ⚠️  No images found`);
      }
    }

    // Save mapping
    fs.writeFileSync('firebase-image-mapping.json', JSON.stringify(mapping, null, 2));

    console.log('\n✅ Verification complete!');
    console.log(`📊 Total folders with images: ${Object.keys(mapping).length}`);
    console.log(`📄 Mapping saved to: firebase-image-mapping.json\n`);

    // Show sample
    const sampleRefs = Object.keys(mapping).slice(0, 5);
    if (sampleRefs.length > 0) {
      console.log('📋 Sample mappings:');
      sampleRefs.forEach(ref => {
        console.log(`   ${ref}: ${mapping[ref].images.length} images`);
      });
    }

  } catch (error) {
    console.error('❌ Error verifying upload:', error);
  }
}

verifyUpload();



