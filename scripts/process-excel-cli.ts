#!/usr/bin/env node

import { CSVDataProcessor } from './process-csv-data';
import fs from 'fs';
import path from 'path';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage: npm run process-excel <csv-file-path>

Example:
  npm run process-excel data/products.csv

This will:
1. Process your CSV file with product data
2. Match products with existing images
3. Generate updated products.ts file
4. Save processed data as JSON
    `);
    process.exit(1);
  }

  const csvFilePath = args[0];
  
  if (!fs.existsSync(csvFilePath)) {
    console.error(`Error: File ${csvFilePath} does not exist`);
    process.exit(1);
  }

  try {
    console.log(`Processing ${csvFilePath}...`);
    
    const processor = new CSVDataProcessor();
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const products = processor.processCSVData(csvContent);

    console.log(`✅ Successfully processed ${products.length} products`);

    // Generate updated products.ts
    const productsFileContent = processor.generateProductsFile(products);
    const outputPath = path.join(process.cwd(), 'src', 'data', 'products-updated.ts');
    fs.writeFileSync(outputPath, productsFileContent);
    console.log(`✅ Generated updated products file: ${outputPath}`);

    // Save processed data
    const jsonOutputPath = path.join(process.cwd(), 'processed-products.json');
    await processor.saveProcessedData(products, jsonOutputPath);
    console.log(`✅ Saved processed data: ${jsonOutputPath}`);

    // Show summary
    console.log('\n📊 Summary:');
    console.log(`- Total products: ${products.length}`);
    console.log(`- Men's products: ${products.filter(p => p.gender === 'MEN').length}`);
    console.log(`- Women's products: ${products.filter(p => p.gender === 'WOMEN').length}`);
    console.log(`- Products with images: ${products.filter(p => p.image).length}`);
    
    const totalValue = products.reduce((sum, p) => sum + (p.wholesalePrice * p.totalUnits), 0);
    console.log(`- Total inventory value: R${totalValue.toLocaleString()}`);

  } catch (error) {
    console.error('❌ Error processing file:', error);
    process.exit(1);
  }
}

main();


