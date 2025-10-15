import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function uploadImagesViaCLI() {
  console.log('📤 Uploading images via Firebase CLI...');
  
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
  
  // Upload images using Firebase CLI
  const uploadedUrls: { [key: string]: string[] } = {};
  
  for (const [productCode, imageFiles] of Object.entries(productImages)) {
    console.log(`\n📤 Uploading images for ${productCode}...`);
    uploadedUrls[productCode] = [];
    
    for (const imageFile of imageFiles) {
      try {
        const localPath = path.join(localImagesDir, imageFile);
        const remotePath = `products/${productCode}/${imageFile}`;
        
        console.log(`   📤 Uploading: ${imageFile}`);
        
        // Use Firebase CLI to upload
        const { stdout, stderr } = await execAsync(
          `firebase storage:upload "${localPath}" "${remotePath}"`
        );
        
        if (stderr && !stderr.includes('Uploaded successfully')) {
          console.error(`   ❌ Error uploading ${imageFile}:`, stderr);
          continue;
        }
        
        // Construct the public URL
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2F${productCode}%2F${imageFile}?alt=media`;
        uploadedUrls[productCode].push(publicUrl);
        
        console.log(`   ✅ Uploaded: ${imageFile}`);
        console.log(`   🔗 URL: ${publicUrl.substring(0, 80)}...`);
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
  console.log('🚀 Starting Firebase image upload via CLI...\n');
  
  try {
    // Step 1: Upload images
    await uploadImagesViaCLI();
    
    // Step 2: Update products with new URLs
    await updateProductsWithNewUrls();
    
    console.log('\n🎉 All done! Your images should now work in Firebase Storage.');
  } catch (error) {
    console.error('❌ Process failed:', error);
  }
}

main().catch(console.error);
