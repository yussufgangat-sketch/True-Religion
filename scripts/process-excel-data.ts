import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Enhanced Product type to match your Excel structure
export interface ExcelProduct {
  ref: string;
  supplierCode: string;
  gender: 'MEN' | 'WOMEN';
  colour: string;
  description: string;
  wholesalePrice: number;
  category: string;
  sizes: {
    [key: string]: number; // size -> quantity
  };
  totalUnits: number;
  image?: string; // Will be matched from existing images
}

// Size mapping for different product types
const SIZE_MAPPINGS = {
  MEN: ['28', '29', '30', '31', '32', '33', '34', '36', '38', '40', '42', '44'],
  WOMEN: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
};

export class ExcelDataProcessor {
  private imageUrls: string[] = [];
  private truereligionsaImages: string[] = [];
  private scrapedImages: any[] = [];

  constructor() {
    this.loadImageData();
  }

  private loadImageData() {
    try {
      // Load existing image collections
      const truereligionsaPath = path.join(process.cwd(), 'public', 'truereligionsa-images.json');
      const scrapedPath = path.join(process.cwd(), 'scraped-images.json');
      
      if (fs.existsSync(truereligionsaPath)) {
        this.truereligionsaImages = JSON.parse(fs.readFileSync(truereligionsaPath, 'utf8'));
      }
      
      if (fs.existsSync(scrapedPath)) {
        this.scrapedImages = JSON.parse(fs.readFileSync(scrapedPath, 'utf8'));
      }

      // Combine all image URLs
      this.imageUrls = [...this.truereligionsaImages, ...this.scrapedImages.flatMap(item => item.images || [])];
      
      console.log(`Loaded ${this.imageUrls.length} images for matching`);
    } catch (error) {
      console.error('Error loading image data:', error);
    }
  }

  /**
   * Process Excel file and extract product data
   */
  async processExcelFile(filePath: string): Promise<ExcelProduct[]> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Find header row
      const headerRow = this.findHeaderRow(jsonData);
      if (headerRow === -1) {
        throw new Error('Could not find header row in Excel file');
      }

      const headers = jsonData[headerRow] as string[];
      const products: ExcelProduct[] = [];

      // Process each data row
      for (let i = headerRow + 1; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        if (!row || row.length === 0) continue;

        try {
          const product = this.parseProductRow(headers, row);
          if (product) {
            // Match with existing images
            product.image = this.findMatchingImage(product);
            products.push(product);
          }
        } catch (error) {
          console.warn(`Error processing row ${i + 1}:`, error);
        }
      }

      console.log(`Processed ${products.length} products from Excel file`);
      return products;
    } catch (error) {
      console.error('Error processing Excel file:', error);
      throw error;
    }
  }

  private findHeaderRow(data: any[][]): number {
    // Look for common header patterns
    const headerPatterns = ['REF', 'Supplier Code', 'Gender', 'Colour', 'Description'];
    
    for (let i = 0; i < Math.min(10, data.length); i++) {
      const row = data[i];
      if (row && Array.isArray(row)) {
        const rowText = row.join(' ').toUpperCase();
        const matches = headerPatterns.filter(pattern => 
          rowText.includes(pattern.toUpperCase())
        );
        
        if (matches.length >= 3) {
          return i;
        }
      }
    }
    
    return -1;
  }

  private parseProductRow(headers: string[], row: any[]): ExcelProduct | null {
    try {
      // Create a map of column index to header name
      const columnMap = new Map<number, string>();
      headers.forEach((header, index) => {
        if (header) {
          columnMap.set(index, header.trim());
        }
      });

      // Extract basic product information
      const ref = this.getCellValue(row, headers, 'REF') || this.getCellValue(row, headers, 'Ref') || '';
      const supplierCode = this.getCellValue(row, headers, 'Supplier Code') || '';
      const gender = (this.getCellValue(row, headers, 'Gender') || '').toUpperCase() as 'MEN' | 'WOMEN';
      const colour = this.getCellValue(row, headers, 'Colour') || this.getCellValue(row, headers, 'Color') || '';
      const description = this.getCellValue(row, headers, 'Description') || '';
      const wholesalePriceStr = this.getCellValue(row, headers, 'Wholesale Price') || '';
      const category = this.getCellValue(row, headers, 'Category') || '';
      
      // Parse wholesale price (remove 'R' and commas)
      const wholesalePrice = parseFloat(wholesalePriceStr.replace(/[R,\s]/g, '')) || 0;

      // Extract sizes and quantities
      const sizes: { [key: string]: number } = {};
      let totalUnits = 0;

      // Get size columns based on gender
      const sizeColumns = gender === 'MEN' ? SIZE_MAPPINGS.MEN : SIZE_MAPPINGS.WOMEN;
      
      sizeColumns.forEach(size => {
        const quantity = this.getCellValue(row, headers, size);
        if (quantity && !isNaN(Number(quantity))) {
          const qty = Number(quantity);
          sizes[size] = qty;
          totalUnits += qty;
        }
      });

      // Also check for total units column
      const totalUnitsFromColumn = this.getCellValue(row, headers, 'Total Unit') || this.getCellValue(row, headers, 'Total Units');
      if (totalUnitsFromColumn && !isNaN(Number(totalUnitsFromColumn))) {
        totalUnits = Number(totalUnitsFromColumn);
      }

      if (!ref || !description) {
        return null; // Skip products without essential data
      }

      return {
        ref,
        supplierCode,
        gender,
        colour,
        description,
        wholesalePrice,
        category,
        sizes,
        totalUnits
      };
    } catch (error) {
      console.error('Error parsing product row:', error);
      return null;
    }
  }

  private getCellValue(row: any[], headers: string[], columnName: string): string | null {
    const index = headers.findIndex(header => 
      header && header.trim().toLowerCase() === columnName.toLowerCase()
    );
    
    if (index >= 0 && index < row.length) {
      const value = row[index];
      return value ? String(value).trim() : null;
    }
    
    return null;
  }

  /**
   * Find matching image for a product based on description and color
   */
  private findMatchingImage(product: ExcelProduct): string | undefined {
    if (this.imageUrls.length === 0) return undefined;

    // Create search terms from product description and color
    const searchTerms = [
      product.description.toLowerCase(),
      product.colour.toLowerCase(),
      product.category.toLowerCase()
    ].join(' ');

    // Simple keyword matching
    const keywords = searchTerms.split(/\s+/).filter(term => term.length > 2);
    
    for (const imageUrl of this.imageUrls) {
      const urlLower = imageUrl.toLowerCase();
      
      // Check for keyword matches
      const matches = keywords.filter(keyword => 
        urlLower.includes(keyword)
      );
      
      if (matches.length > 0) {
        return imageUrl;
      }
    }

    // Fallback: return a random image from the collection
    return this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
  }

  /**
   * Generate updated products.ts content
   */
  generateProductsFile(products: ExcelProduct[]): string {
    const productObjects = products.map((product, index) => {
      // Calculate retail price (typically 2-3x wholesale)
      const retailPrice = Math.round(product.wholesalePrice * 2.5);
      
      return `    {
      id: "${product.ref.toLowerCase()}",
      ref: "${product.ref}",
      supplierCode: "${product.supplierCode}",
      name: "${product.description}",
      description: "${product.description} - ${product.colour}",
      price: ${retailPrice},
      wholesalePrice: ${product.wholesalePrice},
      category: "${product.gender.toLowerCase() === 'men' ? 'male' : 'female'}",
      colour: "${product.colour}",
      productCategory: "${product.category}",
      sizes: ${JSON.stringify(product.sizes)},
      totalUnits: ${product.totalUnits},
      image: "${product.image || ''}",
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
  category: "male" | "female";
  colour: string;
  productCategory: string;
  sizes: { [key: string]: number };
  totalUnits: number;
  image?: string;
};

export const products: Product[] = [
${productObjects}
];`;
  }

  /**
   * Save processed data to JSON file
   */
  async saveProcessedData(products: ExcelProduct[], outputPath: string): Promise<void> {
    try {
      const data = {
        processedAt: new Date().toISOString(),
        totalProducts: products.length,
        products: products
      };

      await fs.promises.writeFile(outputPath, JSON.stringify(data, null, 2));
      console.log(`Saved processed data to ${outputPath}`);
    } catch (error) {
      console.error('Error saving processed data:', error);
      throw error;
    }
  }
}

// Usage example
async function main() {
  const processor = new ExcelDataProcessor();
  
  try {
    // Process Excel file (you'll need to provide the path to your Excel file)
    const excelPath = 'path/to/your/excel/file.xlsx';
    const products = await processor.processExcelFile(excelPath);
    
    // Save processed data
    await processor.saveProcessedData(products, 'processed-products.json');
    
    // Generate updated products.ts
    const productsFileContent = processor.generateProductsFile(products);
    await fs.promises.writeFile('src/data/products-updated.ts', productsFileContent);
    
    console.log(`Successfully processed ${products.length} products`);
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

export { ExcelDataProcessor };

