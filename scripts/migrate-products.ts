import fs from 'fs';
import path from 'path';

// Current product structure (before migration)
interface OldProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "male" | "female";
  image?: string;
}

// New product structure (after migration)
interface NewProduct {
  id: string;
  ref: string;
  supplierCode: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number;
  category: "male" | "female";
  colour: string;
  productCategory: string;
  sizes: { [key: string]: number };
  totalUnits: number;
  image?: string;
}

export function migrateOldProducts(oldProducts: OldProduct[]): NewProduct[] {
  return oldProducts.map((product, index) => {
    // Extract color from description or name
    const colorMatch = product.description.match(/(Black|Blue|White|Red|Green|Grey|Gray|Navy|Coral|Cream|Orange|Yellow|Pink|Purple|Brown)/i);
    const colour = colorMatch ? colorMatch[1] : 'Black';

    // Extract product category from description
    const categoryMatch = product.description.match(/(Jeans|T-Shirt|Hoodie|Jacket|Pants|Shorts|Polo|Sweater|Tank|Top)/i);
    const productCategory = categoryMatch ? categoryMatch[1] : 'Clothing';

    // Generate supplier code
    const supplierCode = `TR${String(index + 1).padStart(4, '0')}`;

    // Generate ref
    const ref = product.id.toUpperCase();

    // Calculate wholesale price (typically 40% of retail)
    const wholesalePrice = Math.round(product.price * 0.4);

    // Generate default sizes based on category
    const sizes = product.category === 'male' 
      ? { '28': 5, '30': 8, '32': 10, '34': 8, '36': 6, '38': 4, '40': 3, '42': 2 }
      : { 'XS': 3, 'S': 8, 'M': 10, 'L': 8, 'XL': 6, '2XL': 4, '3XL': 2 };

    const totalUnits = Object.values(sizes).reduce((sum, qty) => sum + qty, 0);

    return {
      id: product.id,
      ref,
      supplierCode,
      name: product.name,
      description: product.description,
      price: product.price,
      wholesalePrice,
      category: product.category,
      colour,
      productCategory,
      sizes,
      totalUnits,
      image: product.image
    };
  });
}

// Function to update the products.ts file
export async function updateProductsFile() {
  try {
    // Read current products.ts
    const productsPath = path.join(process.cwd(), 'src', 'data', 'products.ts');
    const content = fs.readFileSync(productsPath, 'utf8');
    
    // Extract the baseProducts array (this is a simplified approach)
    // In a real scenario, you'd want to parse the TypeScript more carefully
    console.log('Current products.ts file structure needs manual migration');
    console.log('Please use the upload interface to process your Excel data instead');
    
  } catch (error) {
    console.error('Error updating products file:', error);
  }
}

// Export for use in other scripts
export { migrateOldProducts, updateProductsFile };


