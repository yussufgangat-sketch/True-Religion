import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Temporarily use local images until Firebase upload is fixed
function useLocalImagesTemp() {
  console.log('🔄 Temporarily using local images...');
  
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
    
    // Map of supplier codes to local images
    const imageMapping: { [key: string]: string[] } = {
      '700217 1800': [
        '/images/700217_1800_dtl1_1759254679143.jpg',
        '/images/700217_1800_dtl2_1759254679050.jpg',
        '/images/700217_1800_dtl3_1759254679110.jpg',
        '/images/700217_1800_dtl4_1759254680068.jpg',
        '/images/700217_1800_dtl5_1759254680000.jpg'
      ],
      '109337 1001': [
        '/images/109337_1001_dtl1_1759254707197.jpg',
        '/images/109337_1001_dtl2_1759254707154.jpg',
        '/images/109337_1001_dtl3_1759254707115.jpg',
        '/images/109337_1001_dtl4_1759254707720.jpg'
      ],
      '109337 1700': [
        '/images/109337_1700_dtl1_1759254748793.jpg',
        '/images/109337_1700_dtl2_1759254748848.jpg',
        '/images/109337_1700_dtl3_1759254748890.jpg',
        '/images/109337_1700_dtl5_1759254749273.jpg'
      ],
      '109091 4004': [
        '/images/109091_4004_dtl1_1759253210405.jpg',
        '/images/109091_4004_dtl2_1759253210451.jpg',
        '/images/109091_4004_dtl3_1759253210433.jpg',
        '/images/109091_4004_dtl4_1759253210367.jpg'
      ]
    };
    
    // Update products with local images
    let updatedCount = 0;
    products.forEach((product: any) => {
      if (product.supplierCode && imageMapping[product.supplierCode]) {
        const images = imageMapping[product.supplierCode];
        product.image = images[0]; // Use first image as primary
        product.images = images;
        updatedCount++;
        console.log(`✅ Updated ${product.name} with local images`);
      } else {
        // Fallback to a default image
        product.image = '/images/700217_1800_dtl1_1759254679143.jpg';
        product.images = ['/images/700217_1800_dtl1_1759254679143.jpg'];
        console.log(`⚠️  Using fallback image for ${product.name}`);
      }
    });
    
    // Generate the updated products.ts content
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
    
    console.log('✅ Successfully updated products with local images');
    console.log(`📁 Updated ${updatedCount} products with local images`);
    console.log('🎉 Images should now load from local files!');
    console.log('\n📝 Note: This is a temporary solution. We can upload to Firebase later.');
    
  } catch (error) {
    console.error('❌ Error updating products:', error);
  }
}

// Run the script
useLocalImagesTemp();
