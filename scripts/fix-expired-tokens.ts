import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Fix expired Firebase Storage tokens by converting to public URLs
function fixExpiredTokens() {
  console.log('🔧 Fixing expired Firebase Storage tokens...');
  
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
      const decodedPath = decodeURIComponent(path);
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/${encodeURIComponent(decodedPath)}?alt=media`;
      console.log(`  🔄 Converting: ${match.substring(0, 80)}...`);
      console.log(`  ✅ To: ${publicUrl.substring(0, 80)}...`);
      return publicUrl;
    });
    
    // Write the updated content
    writeFileSync(productsPath, updatedContent);
    
    console.log('\n✅ Successfully converted all Firebase URLs to public URLs');
    console.log('📁 Updated src/data/products.ts');
    console.log('\n🎉 Your images should now load without token expiration issues!');
    
  } catch (error) {
    console.error('❌ Error fixing tokens:', error);
  }
}

// Run the script
fixExpiredTokens();
