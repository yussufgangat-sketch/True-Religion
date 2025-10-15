import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

console.log('Firebase Config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey.substring(0, 10) + '...'
});

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

async function uploadFolder(folderPath: string, folderName: string) {
  const results: any[] = [];
  const ref_code = extractRefFromFolder(folderName);
  
  console.log(`📁 Processing folder: ${folderName} (REF: ${ref_code})`);
  
  const files = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)
    .filter(fileName => supportedFormats.some(ext => fileName.toLowerCase().endsWith(ext)));

  console.log(`   Found ${files.length} images`);

  for (const file of files) {
    try {
      const filePath = path.join(folderPath, file);
      const fileBuffer = fs.readFileSync(filePath);
      
      const timestamp = Date.now();
      const fileExtension = path.extname(file);
      const baseName = path.basename(file, fileExtension);
      const uniqueFileName = `${baseName}_${timestamp}${fileExtension}`;
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, `products/${ref_code}/${uniqueFileName}`);
      await uploadBytes(storageRef, fileBuffer);
      const downloadURL = await getDownloadURL(storageRef);
      
      results.push({
        fileName: file,
        folderName,
        ref: ref_code,
        firebaseURL: downloadURL,
        success: true
      });
      
      console.log(`   ✓ Uploaded: ${file}`);
    } catch (error) {
      console.error(`   ✗ Failed: ${file}`, error);
      results.push({
        fileName: file,
        folderName,
        ref: ref_code,
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      });
    }
  }
  
  return results;
}

function extractRefFromFolder(folderName: string): string {
  const match = folderName.match(/TR\s*[-_]?\s*(\d+)/i);
  if (match) {
    return `TR${match[1]}`;
  }
  return folderName;
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: npm run firebase-upload <path-to-tr-folders>

Example:
  npm run firebase-upload "C:\\Users\\YourName\\Desktop\\TR Images"

This will upload all TR folders to Firebase Storage with public URLs.
    `);
    process.exit(1);
  }

  const sourcePath = args[0];
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source path does not exist: ${sourcePath}`);
    process.exit(1);
  }

  console.log('🚀 Starting Firebase bulk upload...\n');

  // Get all TR folders
  const folders = fs.readdirSync(sourcePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => /TR\s*[-_]?\s*\d+/i.test(name))
    .sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/)?.[0] || '999999');
      const bNum = parseInt(b.match(/\d+/)?.[0] || '999999');
      return aNum - bNum;
    });

  console.log(`📊 Found ${folders.length} TR folders\n`);

  const allResults: any[] = [];
  let processed = 0;

  for (const folder of folders) {
    const folderPath = path.join(sourcePath, folder);
    const results = await uploadFolder(folderPath, folder);
    allResults.push(...results);
    
    processed++;
    console.log(`\n📈 Progress: ${processed}/${folders.length} folders\n`);
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Generate mapping
  const mapping: Record<string, any> = {};
  allResults.forEach(result => {
    if (result.success) {
      if (!mapping[result.ref]) {
        mapping[result.ref] = {
          ref: result.ref,
          folderName: result.folderName,
          images: []
        };
      }
      mapping[result.ref].images.push(result.firebaseURL);
    }
  });

  Object.keys(mapping).forEach(ref => {
    if (mapping[ref].images.length > 0) {
      mapping[ref].primaryImage = mapping[ref].images[0];
    }
  });

  // Save mapping
  fs.writeFileSync('firebase-image-mapping.json', JSON.stringify(mapping, null, 2));

  console.log('\n✅ Upload complete!');
  console.log(`📊 Statistics:`);
  console.log(`   - Folders processed: ${folders.length}`);
  console.log(`   - Images uploaded: ${allResults.filter(r => r.success).length}`);
  console.log(`   - Failed: ${allResults.filter(r => !r.success).length}`);
  console.log(`   - Mapping saved: firebase-image-mapping.json\n`);
}

main().catch(console.error);
