import fs from 'fs';
import path from 'path';

interface TRProduct {
  ref: string;
  supplierCode: string;
  gender: string;
  colour: string;
  description: string;
  wholesalePrice: number;
  retailPrice: number;
  category: string;
  sizes: { [key: string]: number };
  totalUnits: number;
  totalValue: number;
  image?: string;
}

// Load Firebase image mapping
const loadFirebaseMapping = (): Record<string, any> => {
  try {
    const mappingPath = path.join(process.cwd(), 'firebase-image-mapping.json');
    if (fs.existsSync(mappingPath)) {
      return JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading Firebase mapping:', error);
  }
  return {};
};

// Parse CSV
const parseCSV = (csvPath: string): TRProduct[] => {
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // Parse size curve headers (rows 0-2)
  const menDenimSizes = parseCSVLine(lines[0]).filter(s => s && /^\d+$/.test(s));
  const womenDenimSizes = parseCSVLine(lines[1]).filter(s => s && /^\d+$/.test(s));
  const topsSizes = parseCSVLine(lines[2]).filter(s => s && (s === 'XS' || s === 'S' || s === 'M' || s === 'L' || s === 'XL' || s === '2XL' || s === '3XL' || s === '4XL'));
  
  console.log('Size curves found:');
  console.log('  Men Denim:', menDenimSizes.join(', '));
  console.log('  Women Denim:', womenDenimSizes.join(', '));
  console.log('  Tops:', topsSizes.join(', '));
  
  // Find the header row (starts with REF)
  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('REF,')) {
      headerIndex = i;
      break;
    }
  }
  
  if (headerIndex === -1) {
    throw new Error('Could not find header row starting with REF');
  }
  
  const headers = parseCSVLine(lines[headerIndex]);
  console.log(`Found headers at line ${headerIndex + 1}`);
  
  const products: TRProduct[] = [];
  
  // Process data rows
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || !line.startsWith('TR')) continue;
    
    try {
      const values = parseCSVLine(line);
      const product = parseProduct(headers, values, menDenimSizes, womenDenimSizes, topsSizes);
      if (product) {
        products.push(product);
      }
    } catch (error) {
      console.error(`Error parsing line ${i + 1}:`, error);
    }
  }
  
  return products;
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  
  return result;
};

const parseProduct = (headers: string[], values: string[], menDenimSizes: string[], womenDenimSizes: string[], topsSizes: string[]): TRProduct | null => {
  try {
    const getVal = (header: string) => {
      const index = headers.findIndex(h => h.toLowerCase() === header.toLowerCase());
      return index >= 0 ? values[index] : '';
    };
    
    const getValByIndex = (index: number) => {
      return index >= 0 && index < values.length ? values[index] : '';
    };
    
    const ref = getVal('REF');
    if (!ref || !ref.startsWith('TR')) return null;
    
    const supplierCode = getVal('Supplier Code');
    const gender = getVal('Gender');
    const colour = getVal('COLOUR');
    const description = getVal('Description');
    const wholesalePriceStr = getVal('Wholesale Price').replace(/[R,\s]/g, '');
    const retailPriceStr = getVal('Recommended Retail Price').replace(/[R,\s]/g, '');
    const category = getVal('Category');
    const totalUnitsStr = getVal('Total Units');
    const totalValueStr = getVal('Total Value').replace(/[R,\s]/g, '');
    
    // Determine which size curve to use based on category
    const isTops = category.toLowerCase().includes('shirt') || 
                   category.toLowerCase().includes('polo') || 
                   category.toLowerCase().includes('golfer') ||
                   category.toLowerCase().includes('tee') ||
                   category.toLowerCase().includes('hoodie') ||
                   category.toLowerCase().includes('sweater') ||
                   category.toLowerCase().includes('jacket') ||
                   category.toLowerCase().includes('top') ||
                   category.toLowerCase().includes('tank');
    
    // Parse sizes - sizes start at index 8 (after Category column)
    const sizes: { [key: string]: number } = {};
    const sizeStartIndex = 8; // Category is at index 7, sizes start at index 8
    
    let sizeArray: string[];
    if (isTops) {
      sizeArray = topsSizes; // XS, S, M, L, XL, 2XL, 3XL, 4XL
    } else if (gender.toUpperCase() === 'WOMEN') {
      sizeArray = womenDenimSizes; // 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34
    } else {
      sizeArray = menDenimSizes; // 28, 29, 30, 31, 32, 33, 34, 36, 38, 40, 42
    }
    
    // Map size values from the data row
    sizeArray.forEach((size, idx) => {
      const valueIndex = sizeStartIndex + idx;
      const val = getValByIndex(valueIndex);
      if (val && !isNaN(Number(val)) && Number(val) > 0) {
        sizes[size] = Number(val);
      }
    });
    
    return {
      ref,
      supplierCode,
      gender: gender.toUpperCase(),
      colour,
      description,
      wholesalePrice: parseFloat(wholesalePriceStr) || 0,
      retailPrice: parseFloat(retailPriceStr) || 0,
      category,
      sizes,
      totalUnits: parseInt(totalUnitsStr) || 0,
      totalValue: parseFloat(totalValueStr) || 0
    };
  } catch (error) {
    return null;
  }
};

// Match with Firebase images - get ALL images, not just primary
const matchWithFirebase = (products: TRProduct[], firebaseMapping: Record<string, any>): TRProduct[] => {
  return products.map(product => {
    const mapping = firebaseMapping[product.ref];
    if (mapping && mapping.images && mapping.images.length > 0) {
      // Store all images, not just primary
      product.image = mapping.images[0]; // Primary image
      (product as any).images = mapping.images; // All images for gallery
      console.log(`✓ Matched ${product.ref} with ${mapping.images.length} Firebase images`);
    } else {
      console.log(`⚠ No Firebase image for ${product.ref}`);
    }
    return product;
  });
};

// Generate products.ts file
const generateProductsFile = (products: TRProduct[]): string => {
  const productStrings = products.map(p => {
    const category = p.gender === 'MEN' ? 'male' : 'female';
    const allImages = (p as any).images || [p.image];
    return `  {
    id: "${p.ref.toLowerCase()}",
    ref: "${p.ref}",
    supplierCode: "${p.supplierCode}",
    name: "${p.description}",
    description: "${p.description}",
    price: ${p.wholesalePrice},
    wholesalePrice: ${p.wholesalePrice},
    retailPrice: ${p.retailPrice},
    category: "${category}",
    colour: "${p.colour}",
    gender: "${p.gender}",
    productCategory: "${p.category}",
    sizes: ${JSON.stringify(p.sizes)},
    totalUnits: ${p.totalUnits},
    image: "${p.image || ''}",
    images: ${JSON.stringify(allImages)},
  }`;
  }).join(',\n');
  
  return `export type Product = {
  id: string;
  ref: string;
  supplierCode: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number;
  retailPrice: number;
  category: "male" | "female";
  colour: string;
  gender: string;
  productCategory: string;
  sizes: { [key: string]: number };
  totalUnits: number;
  image?: string;
  images?: string[];
};

export const products: Product[] = [
${productStrings}
];
`;
};

// Main
async function main() {
  const csvPath = process.argv[2] || 'products.csv';
  
  console.log(`\n🚀 Processing True Religion Excel data...\n`);
  
  // Load Firebase mapping
  console.log('📁 Loading Firebase image mapping...');
  const firebaseMapping = loadFirebaseMapping();
  console.log(`   Found ${Object.keys(firebaseMapping).length} Firebase image folders\n`);
  
  // Parse CSV
  console.log('📊 Parsing CSV data...');
  const products = parseCSV(csvPath);
  console.log(`   Parsed ${products.length} products\n`);
  
  // Match with Firebase
  console.log('🔗 Matching products with Firebase images...');
  const productsWithImages = matchWithFirebase(products, firebaseMapping);
  const matchedCount = productsWithImages.filter(p => p.image).length;
  console.log(`   Matched ${matchedCount}/${products.length} products with images\n`);
  
  // Generate products file
  console.log('💾 Generating products.ts file...');
  const productsFileContent = generateProductsFile(productsWithImages);
  fs.writeFileSync('src/data/products.ts', productsFileContent);
  console.log(`   ✅ Updated src/data/products.ts\n`);
  
  // Save processed data
  fs.writeFileSync('processed-products.json', JSON.stringify({
    processedAt: new Date().toISOString(),
    totalProducts: products.length,
    productsWithImages: matchedCount,
    products: productsWithImages
  }, null, 2));
  console.log(`   ✅ Saved processed-products.json\n`);
  
  // Summary
  console.log('📊 Summary:');
  console.log(`   Total products: ${products.length}`);
  console.log(`   Men's products: ${products.filter(p => p.gender === 'MEN').length}`);
  console.log(`   Women's products: ${products.filter(p => p.gender === 'WOMEN').length}`);
  console.log(`   With Firebase images: ${matchedCount}`);
  console.log(`   Total inventory: ${products.reduce((sum, p) => sum + p.totalUnits, 0)} units`);
  console.log(`\n✅ Processing complete!\n`);
}

main().catch(console.error);
