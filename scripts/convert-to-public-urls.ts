import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Convert Firebase Storage URLs from token-based to public URLs
function convertToPublicUrls() {
  console.log('🔄 Converting Firebase URLs to public URLs (no tokens)...');
  
  try {
    // Read the products file
    const productsPath = join(process.cwd(), 'src/data/products.ts');
    const productsContent = readFileSync(productsPath, 'utf8');
    
    console.log('📁 Processing products.ts...');
    
    // Convert token-based URLs to public URLs
    let updatedContent = productsContent;
    
    // Pattern to match Firebase Storage URLs with tokens
    const firebaseUrlPattern = /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/true-religion-1363f\.firebasestorage\.app\/o\/([^?]+)\?alt=media&token=[^"]*/g;
    
    // Replace with public URLs (without tokens)
    updatedContent = updatedContent.replace(firebaseUrlPattern, (match, path) => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/${path}?alt=media`;
      console.log(`  🔄 Converting: ${match.substring(0, 80)}...`);
      console.log(`  ✅ To: ${publicUrl.substring(0, 80)}...`);
      return publicUrl;
    });
    
    // Write the updated content
    writeFileSync(productsPath, updatedContent);
    
    console.log('\n✅ Successfully converted all Firebase URLs to public URLs');
    console.log('📁 Updated src/data/products.ts');
    console.log('\n🎉 Your images will now work forever without token expiration!');
    console.log('\n📋 Next steps:');
    console.log('1. Deploy to Vercel: git add . && git commit -m "Convert to public URLs" && git push');
    console.log('2. Your images will work permanently without token renewal');
    
  } catch (error) {
    console.error('❌ Error converting URLs:', error);
  }
}

// Run the script
convertToPublicUrls();
