import { writeFileSync } from 'fs';
import { join } from 'path';

// Generate public URLs without tokens for Firebase Storage
function generatePublicUrls() {
  console.log('🔄 Generating public Firebase Storage URLs...');
  
  try {
    // Read the existing mapping
    const existingMapping = JSON.parse(require('fs').readFileSync('firebase-image-mapping.json', 'utf8'));
    
    const newMapping: any = {};
    let processedProducts = 0;
    const totalProducts = Object.keys(existingMapping).length;
    
    console.log(`📁 Processing ${totalProducts} products...`);
    
    for (const [productRef, productData] of Object.entries(existingMapping)) {
      console.log(`🔄 Processing ${productRef}...`);
      
      // Convert token-based URLs to public URLs
      const publicImages = (productData as any).images.map((url: string) => {
        // Extract the path from the token-based URL
        const urlMatch = url.match(/\/o\/([^?]+)/);
        if (urlMatch) {
          const path = decodeURIComponent(urlMatch[1]);
          // Generate public URL without token
          return `https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/${encodeURIComponent(path)}?alt=media`;
        }
        return url; // Fallback to original URL
      });
      
      newMapping[productRef] = {
        ref: productRef,
        folderName: productRef,
        images: publicImages,
        primaryImage: publicImages[0]
      };
      
      console.log(`  ✅ Generated ${publicImages.length} public URLs for ${productRef}`);
      processedProducts++;
    }
    
    // Save the new mapping
    const outputPath = join(process.cwd(), 'firebase-image-mapping.json');
    writeFileSync(outputPath, JSON.stringify(newMapping, null, 2));
    
    console.log(`\n✅ Successfully generated public URLs for ${processedProducts} products`);
    console.log(`📁 Saved to: ${outputPath}`);
    
    // Update products.ts with public URLs
    updateProductsWithPublicUrls(newMapping);
    
  } catch (error) {
    console.error('❌ Error generating public URLs:', error);
  }
}

function updateProductsWithPublicUrls(mapping: any) {
  console.log('\n🔄 Updating products.ts with public URLs...');
  
  try {
    // Read existing products
    const productsPath = join(process.cwd(), 'src/data/products.ts');
    const productsContent = require('fs').readFileSync(productsPath, 'utf8');
    
    let updatedContent = productsContent;
    
    // Update each product with public URLs
    for (const [ref, imageData] of Object.entries(mapping)) {
      const productId = ref.toLowerCase();
      
      // Update the image field
      const imageRegex = new RegExp(`(id: "${productId}"[\\s\\S]*?image: ")[^"]*(")`, 'g');
      updatedContent = updatedContent.replace(imageRegex, `$1${(imageData as any).primaryImage}$2`);
      
      // Update the images array
      const imagesRegex = new RegExp(`(id: "${productId}"[\\s\\S]*?images: \\[)[^\\]]*(\\])`, 'g');
      const imagesArray = (imageData as any).images.map((url: string) => `"${url}"`).join(',');
      updatedContent = updatedContent.replace(imagesRegex, `$1${imagesArray}$2`);
    }
    
    // Write updated products.ts
    writeFileSync(productsPath, updatedContent);
    console.log('✅ Updated src/data/products.ts with public URLs');
    
  } catch (error) {
    console.error('❌ Error updating products.ts:', error);
  }
}

// Run the script
generatePublicUrls();
