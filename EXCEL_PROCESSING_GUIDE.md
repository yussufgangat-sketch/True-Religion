# Excel Data Processing Guide

This guide explains how to process your Excel product data and match it with existing images in your True Religion e-commerce project.

## Overview

The system processes Excel/CSV files containing product data and automatically:
- Extracts product information (REF, Supplier Code, Gender, Colour, Description, etc.)
- Matches products with existing images from your image collections
- Generates updated TypeScript product files
- Creates inventory data with sizes and quantities

## Required Excel/CSV Format

Your Excel file should have these columns:

| Column | Description | Example |
|--------|-------------|---------|
| REF | Product reference code | TR1, TR2, TR100 |
| Supplier Code | Supplier identifier | 109637 1001 |
| Gender | MEN or WOMEN | MEN, WOMEN |
| Colour | Product color | BLACK, BLUE, WHITE |
| Description | Product name/description | True Religion SS Polo Optic White |
| Wholesale Price | Wholesale price (with R prefix) | R664.13 |
| Category | Product category | Golfers, Jeans, T-Shirts |
| Size columns | Individual size quantities | 28, 29, 30, 31, 32, 33, 34, 36, 38, 40, 42, 44 (Men) |
| | | XS, S, M, L, XL, 2XL, 3XL, 4XL (Women) |
| Total Unit | Total units across all sizes | 25, 27, 14 |

## Processing Methods

### Method 1: Web Interface (Recommended)

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the upload page:**
   ```
   http://localhost:3000/admin/upload-excel
   ```

3. **Upload your CSV file:**
   - Export your Excel file as CSV format
   - Upload using the web interface
   - Click "Process File"
   - Download the generated files

### Method 2: Command Line

1. **Export your Excel as CSV:**
   - Save your Excel file as CSV format
   - Place it in your project directory

2. **Run the processing script:**
   ```bash
   npm run process-excel data/your-products.csv
   ```

3. **Check the output:**
   - `src/data/products-updated.ts` - Updated products file
   - `processed-products.json` - Raw processed data

## Generated Files

After processing, you'll get:

### 1. Updated Products TypeScript File
```typescript
export type Product = {
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
```

### 2. Processed JSON Data
Contains the raw processed data with all product information and matched images.

## Image Matching

The system automatically matches products with images by:
1. **Keyword matching** - Searches image URLs for product keywords
2. **Color matching** - Matches product colors with image descriptions
3. **Category matching** - Matches product categories with image content
4. **Fallback** - Assigns random images from your collection if no match found

## Size Handling

### Men's Sizes
- 28, 29, 30, 31, 32, 33, 34, 36, 38, 40, 42, 44

### Women's Sizes  
- XS, S, M, L, XL, 2XL, 3XL, 4XL

The system automatically detects gender and applies appropriate size columns.

## Pricing

- **Wholesale Price**: Extracted from your Excel data
- **Retail Price**: Automatically calculated (typically 2.5x wholesale price)
- **Total Value**: Calculated as wholesale price × total units

## Example Usage

### Sample CSV Format:
```csv
REF,Supplier Code,Gender,Colour,Description,Wholesale Price,Category,28,29,30,31,32,33,34,36,38,40,42,44,XS,S,M,L,XL,2XL,3XL,4XL,Total Unit
TR1,109637 1001,MEN,BLACK,True Religion SS Polo Optic White,R664.13,Golfers,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
TR2,109638 1001,MEN,BLUE,True Religion SS Chest Patch Polo Jet Black,R390.87,Golfers,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
```

### Processing Command:
```bash
npm run process-excel templates/product-template.csv
```

## Troubleshooting

### Common Issues:

1. **"Could not find header row"**
   - Ensure your CSV has proper headers
   - Check that column names match expected format

2. **"Error processing row"**
   - Check for missing required fields (REF, Description)
   - Ensure price format is correct (R664.13)

3. **No images matched**
   - Verify your image collections are loaded
   - Check that image URLs are accessible

### File Requirements:
- CSV format (export from Excel)
- UTF-8 encoding
- Proper column headers
- Numeric values for prices and quantities

## Integration

After processing:

1. **Replace your products.ts file:**
   ```bash
   cp src/data/products-updated.ts src/data/products.ts
   ```

2. **Update your components** to use the new Product type with additional fields

3. **Test your application** to ensure all new fields work correctly

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify your CSV format matches the requirements
3. Ensure all required columns are present
4. Check that image collections are properly loaded

The system is designed to be robust and will skip invalid rows while processing valid ones.


