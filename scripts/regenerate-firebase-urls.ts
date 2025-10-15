import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

interface ImageMapping {
  [key: string]: {
    ref: string;
    folderName: string;
    images: string[];
    primaryImage: string;
  };
}

async function regenerateFirebaseUrls() {
  console.log('🔄 Regenerating Firebase Storage URLs...');
  
  try {
    // Read the existing mapping to get the folder structure
    const existingMapping = JSON.parse(require('fs').readFileSync('firebase-image-mapping.json', 'utf8'));
    
    const newMapping: ImageMapping = {};
    let processedFolders = 0;
    const totalFolders = Object.keys(existingMapping).length;
    
    console.log(`📁 Processing ${totalFolders} product folders...`);
    
    for (const [productRef, productData] of Object.entries(existingMapping)) {
      console.log(`\n🔄 Processing ${productRef}...`);
      
      try {
        // List all files in the product folder
        const folderRef = ref(storage, `products/${productRef}`);
        const { listAll } = await import('firebase/storage');
        const result = await listAll(folderRef);
        
        const imageUrls: string[] = [];
        
        // Get download URLs for all images
        for (const itemRef of result.items) {
          try {
            const downloadURL = await getDownloadURL(itemRef);
            imageUrls.push(downloadURL);
            console.log(`  ✅ ${itemRef.name}`);
          } catch (error) {
            console.error(`  ❌ Failed to get URL for ${itemRef.name}:`, error);
          }
        }
        
        if (imageUrls.length > 0) {
          newMapping[productRef] = {
            ref: productRef,
            folderName: productRef,
            images: imageUrls,
            primaryImage: imageUrls[0] // Use first image as primary
          };
          
          console.log(`  ✅ Generated ${imageUrls.length} fresh URLs for ${productRef}`);
        } else {
          console.log(`  ⚠️  No images found for ${productRef}`);
        }
        
        processedFolders++;
        console.log(`  📊 Progress: ${processedFolders}/${totalFolders} folders`);
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error processing ${productRef}:`, error);
      }
    }
    
    // Save the new mapping
    const outputPath = join(process.cwd(), 'firebase-image-mapping.json');
    writeFileSync(outputPath, JSON.stringify(newMapping, null, 2));
    
    console.log(`\n✅ Successfully regenerated URLs for ${Object.keys(newMapping).length} products`);
    console.log(`📁 Saved to: ${outputPath}`);
    
    // Generate updated products.ts
    await generateUpdatedProducts(newMapping);
    
  } catch (error) {
    console.error('❌ Error regenerating URLs:', error);
  }
}

async function generateUpdatedProducts(mapping: ImageMapping) {
  console.log('\n🔄 Generating updated products.ts...');
  
  try {
    // Read existing products
    const productsPath = join(process.cwd(), 'src/data/products.ts');
    const productsContent = require('fs').readFileSync(productsPath, 'utf8');
    
    // Extract the products array
    const productsMatch = productsContent.match(/export const products: Product\[\] = \[([\s\S]*?)\];/);
    if (!productsMatch) {
      throw new Error('Could not find products array in products.ts');
    }
    
    const productsArray = productsMatch[1];
    
    // Update each product with new image URLs
    let updatedContent = productsContent;
    
    for (const [ref, imageData] of Object.entries(mapping)) {
      const productId = ref.toLowerCase();
      
      // Update the image field
      const imageRegex = new RegExp(`(id: "${productId}"[\\s\\S]*?image: ")[^"]*(")`, 'g');
      updatedContent = updatedContent.replace(imageRegex, `$1${imageData.primaryImage}$2`);
      
      // Update the images array
      const imagesRegex = new RegExp(`(id: "${productId}"[\\s\\S]*?images: \\[)[^\\]]*(\\])`, 'g');
      const imagesArray = imageData.images.map(url => `"${url}"`).join(',');
      updatedContent = updatedContent.replace(imagesRegex, `$1${imagesArray}$2`);
    }
    
    // Write updated products.ts
    writeFileSync(productsPath, updatedContent);
    console.log('✅ Updated src/data/products.ts with fresh URLs');
    
  } catch (error) {
    console.error('❌ Error updating products.ts:', error);
  }
}

// Run the script
regenerateFirebaseUrls().catch(console.error);
