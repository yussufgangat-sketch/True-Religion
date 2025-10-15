import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function checkFirebaseStorage() {
  console.log('🔍 Checking Firebase Storage contents...');
  
  try {
    // Check the products folder
    const productsRef = ref(storage, 'products');
    const result = await listAll(productsRef);
    
    console.log(`📁 Found ${result.prefixes.length} product folders:`);
    result.prefixes.forEach(prefix => {
      console.log(`   - ${prefix.name}`);
    });
    
    console.log(`📸 Found ${result.items.length} image files:`);
    result.items.forEach(item => {
      console.log(`   - ${item.name}`);
    });
    
    // Check each product folder
    const productImages: { [key: string]: string[] } = {};
    
    for (const prefix of result.prefixes) {
      console.log(`\n📁 Checking folder: ${prefix.name}`);
      const folderRef = ref(storage, `products/${prefix.name}`);
      const folderResult = await listAll(folderRef);
      
      console.log(`   Found ${folderResult.items.length} images:`);
      const imageUrls: string[] = [];
      
      for (const item of folderResult.items) {
        try {
          const downloadURL = await getDownloadURL(item);
          imageUrls.push(downloadURL);
          console.log(`   ✅ ${item.name}: ${downloadURL.substring(0, 80)}...`);
        } catch (error) {
          console.log(`   ❌ ${item.name}: Failed to get URL`);
        }
      }
      
      productImages[prefix.name] = imageUrls;
    }
    
    // Save the mapping
    const fs = require('fs');
    const path = require('path');
    const mappingPath = path.join(process.cwd(), 'firebase-image-mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(productImages, null, 2));
    
    console.log('\n✅ Firebase Storage check complete!');
    console.log('📁 Updated firebase-image-mapping.json with actual Firebase URLs');
    
    return productImages;
    
  } catch (error) {
    console.error('❌ Error checking Firebase Storage:', error);
    return null;
  }
}

async function updateProductsWithRealFirebaseUrls() {
  console.log('🔄 Updating products with real Firebase URLs...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    const mappingPath = path.join(process.cwd(), 'firebase-image-mapping.json');
    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    
    const productsPath = path.join(process.cwd(), 'src/data/products.ts');
    const productsContent = fs.readFileSync(productsPath, 'utf8');
    
    // Extract and update products
    const productsMatch = productsContent.match(/export const products: Product\[\] = (\[[\s\S]*\]);/);
    if (!productsMatch) {
      throw new Error('Could not find products array');
    }
    
    const products = JSON.parse(productsMatch[1]);
    let updatedCount = 0;
    
    products.forEach((product: any) => {
      const productCode = product.ref;
      if (mapping[productCode] && mapping[productCode].length > 0) {
        product.image = mapping[productCode][0]; // Use first image as primary
        product.images = mapping[productCode];
        updatedCount++;
        console.log(`✅ Updated ${product.name} with real Firebase URLs`);
      } else {
        console.log(`⚠️  No Firebase images found for ${product.name} (${productCode})`);
      }
    });
    
    // Generate updated products.ts content
    const updatedContent = `export type Product = {
  id: string;
  ref?: string;
  supplierCode?: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice?: number;
  retailPrice?: number;
  originalPrice?: number;
  category: "male" | "female" | "denim" | "accessories";
  colour?: string;
  gender?: string;
  productCategory?: string;
  sizes?: { [key: string]: number };
  totalUnits?: number;
  image?: string;
  images?: string[];
  onSale?: boolean;
  salePercentage?: number;
};

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;
    
    fs.writeFileSync(productsPath, updatedContent);
    
    console.log(`✅ Updated ${updatedCount} products with real Firebase URLs`);
    console.log('📁 Updated src/data/products.ts');
    
  } catch (error) {
    console.error('❌ Error updating products:', error);
  }
}

async function main() {
  console.log('🚀 Checking Firebase Storage and fixing URLs...\n');
  
  try {
    // Step 1: Check what's actually in Firebase Storage
    const productImages = await checkFirebaseStorage();
    
    if (productImages) {
      // Step 2: Update products with real Firebase URLs
      await updateProductsWithRealFirebaseUrls();
      
      console.log('\n🎉 Firebase URLs fixed! Your images should now work.');
    } else {
      console.log('\n❌ Could not access Firebase Storage. Please check your configuration.');
    }
    
  } catch (error) {
    console.error('❌ Process failed:', error);
  }
}

main().catch(console.error);
