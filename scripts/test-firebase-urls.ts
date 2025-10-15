import { readFileSync } from 'fs';
import { join } from 'path';

// Test if the current Firebase URLs in products.ts actually work
function testFirebaseUrls() {
  console.log('🔍 Testing current Firebase URLs in products...');
  
  try {
    const productsPath = join(process.cwd(), 'src/data/products.ts');
    const productsContent = readFileSync(productsPath, 'utf8');
    
    // Extract the products array
    const productsMatch = productsContent.match(/export const products: Product\[\] = (\[[\s\S]*\]);/);
    if (!productsMatch) {
      throw new Error('Could not find products array');
    }
    
    const products = JSON.parse(productsMatch[1]);
    console.log(`📁 Found ${products.length} products`);
    
    // Test the first few products' image URLs
    const testProducts = products.slice(0, 5);
    
    console.log('\n🧪 Testing image URLs:');
    testProducts.forEach((product: any, index: number) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Image: ${product.image ? product.image.substring(0, 80) + '...' : 'No image'}`);
      
      if (product.images && product.images.length > 0) {
        console.log(`   Images (${product.images.length}):`);
        product.images.slice(0, 2).forEach((img: string, imgIndex: number) => {
          console.log(`     ${imgIndex + 1}. ${img.substring(0, 80)}...`);
        });
        if (product.images.length > 2) {
          console.log(`     ... and ${product.images.length - 2} more`);
        }
      }
    });
    
    // Check if URLs are Firebase URLs
    const firebaseUrls = products.filter((p: any) => 
      p.image && p.image.includes('firebasestorage.googleapis.com')
    );
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total products: ${products.length}`);
    console.log(`   Products with Firebase URLs: ${firebaseUrls.length}`);
    console.log(`   Products without images: ${products.filter((p: any) => !p.image).length}`);
    
    // Show some example URLs
    if (firebaseUrls.length > 0) {
      console.log(`\n🔗 Example Firebase URLs:`);
      firebaseUrls.slice(0, 3).forEach((product: any, index: number) => {
        console.log(`   ${index + 1}. ${product.name}:`);
        console.log(`      ${product.image}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error testing URLs:', error);
  }
}

// Run the script
testFirebaseUrls();
