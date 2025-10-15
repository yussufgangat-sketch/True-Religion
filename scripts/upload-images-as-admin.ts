import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

async function authenticateAdmin() {
  try {
    console.log('🔐 Authenticating as admin...');
    
    const adminEmail = 'admin@truereligion.com';
    const adminPassword = 'admin123456';
    
    const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log('✅ Successfully authenticated as admin');
    console.log('📧 Email:', userCredential.user.email);
    console.log('🆔 UID:', userCredential.user.uid);
    
    return userCredential.user;
  } catch (error) {
    console.error('❌ Authentication failed:', error);
    throw error;
  }
}

async function uploadImages() {
  console.log('📤 Uploading images to Firebase Storage...');
  
  const localImagesDir = path.join(process.cwd(), 'public/images');
  const images = fs.readdirSync(localImagesDir).filter(file => 
    file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
  );
  
  console.log(`📁 Found ${images.length} local images to upload`);
  
  // Group images by product code
  const productImages: { [key: string]: string[] } = {};
  
  images.forEach(image => {
    let productCode = '';
    if (image.startsWith('700217_1800')) productCode = 'TR1';
    else if (image.startsWith('109337_1001')) productCode = 'TR2';
    else if (image.startsWith('109337_1700')) productCode = 'TR3';
    else if (image.startsWith('109091_4004')) productCode = 'TR4';
    
    if (productCode) {
      if (!productImages[productCode]) productImages[productCode] = [];
      productImages[productCode].push(image);
    }
  });
  
  console.log('📦 Product image mapping:');
  Object.entries(productImages).forEach(([code, images]) => {
    console.log(`   ${code}: ${images.length} images`);
  });
  
  // Upload images to Firebase
  const uploadedUrls: { [key: string]: string[] } = {};
  
  for (const [productCode, imageFiles] of Object.entries(productImages)) {
    console.log(`\n📤 Uploading images for ${productCode}...`);
    uploadedUrls[productCode] = [];
    
    for (const imageFile of imageFiles) {
      try {
        const imagePath = path.join(localImagesDir, imageFile);
        const imageBuffer = fs.readFileSync(imagePath);
        
        // Upload to Firebase Storage
        const storageRef = ref(storage, `products/${productCode}/${imageFile}`);
        await uploadBytes(storageRef, imageBuffer);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        uploadedUrls[productCode].push(downloadURL);
        
        console.log(`   ✅ Uploaded: ${imageFile}`);
        console.log(`   🔗 URL: ${downloadURL.substring(0, 80)}...`);
      } catch (error) {
        console.error(`   ❌ Failed to upload ${imageFile}:`, error);
      }
    }
  }
  
  // Save the mapping
  const mappingPath = path.join(process.cwd(), 'firebase-image-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(uploadedUrls, null, 2));
  
  console.log('\n✅ Upload complete!');
  console.log('📁 Updated firebase-image-mapping.json');
  
  return uploadedUrls;
}

async function updateProductsWithNewUrls() {
  console.log('🔄 Updating products with new Firebase URLs...');
  
  try {
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
        console.log(`✅ Updated ${product.name} with Firebase URLs`);
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
    
    console.log(`✅ Updated ${updatedCount} products with new Firebase URLs`);
    console.log('📁 Updated src/data/products.ts');
    
  } catch (error) {
    console.error('❌ Error updating products:', error);
  }
}

async function main() {
  console.log('🚀 Starting Firebase image upload process with admin authentication...\n');
  
  try {
    // Step 1: Authenticate as admin
    await authenticateAdmin();
    
    // Step 2: Upload images
    await uploadImages();
    
    // Step 3: Update products with new URLs
    await updateProductsWithNewUrls();
    
    console.log('\n🎉 All done! Your images should now work in Firebase Storage.');
  } catch (error) {
    console.error('❌ Process failed:', error);
  }
}

main().catch(console.error);
