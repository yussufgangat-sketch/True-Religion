import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Fix all product images - use available images where possible, remove broken URLs
function fixAllProductImages() {
  console.log('🔧 Fixing all product images...');
  
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
    
    // Available images mapping
    const availableImages: { [key: string]: string[] } = {
      'TR1': [
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl2_1759254679050.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl3_1759254679110.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl4_1759254680068.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl5_1759254680000.jpg?alt=media'
      ],
      'TR2': [
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl1_1759254707197.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl2_1759254707154.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl3_1759254707115.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl4_1759254707720.jpg?alt=media'
      ],
      'TR3': [
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl1_1759254748793.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl2_1759254748848.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl3_1759254748890.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl5_1759254749273.jpg?alt=media'
      ],
      'TR4': [
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl1_1759253210405.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl2_1759253210451.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl3_1759253210433.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl4_1759253210367.jpg?alt=media'
      ]
    };
    
    // Default placeholder image
    const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media';
    
    let productsWithImages = 0;
    let productsWithoutImages = 0;
    
    // Update products
    products.forEach((product: any) => {
      const productCode = product.ref;
      
      if (availableImages[productCode]) {
        // Use the available images for this product
        product.image = availableImages[productCode][0];
        product.images = availableImages[productCode];
        productsWithImages++;
        console.log(`✅ ${product.name} - Using available images`);
      } else {
        // Remove broken URLs and use default or no image
        product.image = defaultImage; // Use a working image as placeholder
        product.images = [defaultImage];
        productsWithoutImages++;
        console.log(`⚠️  ${product.name} - Using placeholder image`);
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
    
    // Write the updated products
    writeFileSync(productsPath, updatedContent);
    
    console.log('\n✅ Successfully fixed all product images!');
    console.log(`📊 Summary:`);
    console.log(`   Products with real images: ${productsWithImages}`);
    console.log(`   Products with placeholder: ${productsWithoutImages}`);
    console.log(`   Total products: ${products.length}`);
    console.log('\n🎉 All products now have working images!');
    
  } catch (error) {
    console.error('❌ Error fixing product images:', error);
  }
}

// Run the script
fixAllProductImages();
