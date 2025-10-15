import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Restore the original Firebase-based products from processed-products.json
function restoreOriginalProducts() {
  console.log('🔄 Restoring your original Firebase-based products...');
  
  try {
    // Read the processed products data
    const processedData = JSON.parse(readFileSync('processed-products.json', 'utf8'));
    const products = processedData.products;
    
    console.log(`📁 Found ${products.length} original products with Firebase URLs`);
    
    // Convert to the format needed for products.ts
    const productsArray = products.map((product: any) => ({
      id: product.ref.toLowerCase(),
      ref: product.ref,
      supplierCode: product.supplierCode,
      name: product.description,
      description: product.description,
      price: product.wholesalePrice,
      wholesalePrice: product.wholesalePrice,
      retailPrice: product.retailPrice,
      category: product.gender === 'MEN' ? 'male' : 'female',
      colour: product.colour,
      gender: product.gender,
      productCategory: product.category,
      sizes: product.sizes,
      totalUnits: Object.values(product.sizes).reduce((sum: number, count: any) => sum + count, 0),
      image: product.images?.[0] || '',
      images: product.images || []
    }));
    
    // Generate the products.ts content
    const productsContent = `export type Product = {
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

export const products: Product[] = ${JSON.stringify(productsArray, null, 2)};
`;
    
    // Write the restored products
    const productsPath = join(process.cwd(), 'src/data/products.ts');
    writeFileSync(productsPath, productsContent);
    
    console.log('✅ Successfully restored your original Firebase-based products');
    console.log('📁 Updated src/data/products.ts');
    console.log(`🎉 Restored ${productsArray.length} products with Firebase URLs`);
    
  } catch (error) {
    console.error('❌ Error restoring products:', error);
  }
}

// Run the script
restoreOriginalProducts();
