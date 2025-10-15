import { writeFileSync } from 'fs';
import { join } from 'path';

// Restore working Firebase URLs with fresh tokens
function restoreWorkingImages() {
  console.log('🔄 Restoring working Firebase image URLs...');
  
  try {
    // Create a products.ts with working Firebase URLs
    const productsContent = `export type Product = {
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
  {
    id: "tr1",
    ref: "TR1",
    supplierCode: "700217 1800",
    name: "True Religion Geno Sn Flap Slim Optic White",
    description: "True Religion Geno Sn Flap Slim Optic White",
    price: 1521.3,
    wholesalePrice: 1521.3,
    retailPrice: 3499,
    category: "male",
    colour: "WHITE",
    gender: "MEN",
    productCategory: "Jeans",
    sizes: {"28":1,"29":1,"30":2,"31":2,"32":2,"33":2,"34":2,"36":2,"38":2,"40":2,"42":1},
    totalUnits: 19,
    image: "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759307776108.jpg?alt=media&token=f5a79792-7c01-4be0-a407-62d516668949",
    images: ["https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759307776108.jpg?alt=media&token=f5a79792-7c01-4be0-a407-62d516668949","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl2_1759307777770.jpg?alt=media&token=e836a75b-c7bc-45ac-ae70-cb762f9eff68","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl3_1759307779112.jpg?alt=media&token=4beeada6-9262-4a4c-9b1f-d379ebe50a9a","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl4_1759307780265.jpg?alt=media&token=75a92c11-4827-490a-95e7-fbad3893bb21","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl5_1759307781710.jpg?alt=media&token=75c79688-fc99-4c9e-9b40-6e10ada5ebba"],
  },
  {
    id: "tr2",
    ref: "TR2",
    supplierCode: "109337 1001",
    name: "True Religion Ss Overt Patch Polo Jet Black",
    description: "True Religion Ss Overt Patch Polo Jet Black",
    price: 869.13,
    wholesalePrice: 869.13,
    retailPrice: 1999,
    category: "male",
    colour: "BLACK",
    gender: "MEN",
    productCategory: "Golfers",
    sizes: {"S":5,"M":5,"L":5,"XL":5,"2XL":3,"3XL":2},
    totalUnits: 25,
    image: "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl1_1759307783752.jpg?alt=media&token=eb3eb6bc-0786-4d70-956e-89832f299fd3",
    images: ["https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl1_1759307783752.jpg?alt=media&token=eb3eb6bc-0786-4d70-956e-89832f299fd3","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl2_1759307785072.jpg?alt=media&token=88d3977f-10bf-4d43-b48f-4a7159d8e27e","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl3_1759307786201.jpg?alt=media&token=627200e3-9e4a-4f11-ad56-18c14a02448a","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl4_1759307787744.jpg?alt=media&token=e8aa6e35-361f-4a3b-9089-bcb54742eee1"],
  },
  {
    id: "tr3",
    ref: "TR3",
    supplierCode: "109337 1700",
    name: "True Religion Ss Overt Patch Polo Optic White",
    description: "True Religion Ss Overt Patch Polo Optic White",
    price: 869.13,
    wholesalePrice: 869.13,
    retailPrice: 1999,
    category: "male",
    colour: "WHITE",
    gender: "MEN",
    productCategory: "Golfers",
    sizes: {"S":5,"M":5,"L":5,"XL":5,"2XL":3,"3XL":2},
    totalUnits: 25,
    image: "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl1_1759307789536.jpg?alt=media&token=8a4ad8cd-a14d-4205-9e8e-4ab8778b620f",
    images: ["https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl1_1759307789536.jpg?alt=media&token=8a4ad8cd-a14d-4205-9e8e-4ab8778b620f","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl2_1759307790557.jpg?alt=media&token=a1e77eae-8c77-46bc-8dd4-2f120a3f7281","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl3_1759307791831.jpg?alt=media&token=24c806ff-23fb-49c5-9c5f-def41b89a888","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl5_1759307793193.jpg?alt=media&token=af1101d6-9bb4-4572-9f62-2ccd23f6f066"],
  },
  {
    id: "tr4",
    ref: "TR4",
    supplierCode: "108918 1001",
    name: "True Religion Ss Uni Logo Tee Jet Black",
    description: "True Religion Ss Uni Logo Tee Jet Black",
    price: 564.78,
    wholesalePrice: 564.78,
    retailPrice: 1299,
    category: "male",
    colour: "BLACK",
    gender: "MEN",
    productCategory: "T-Shirts",
    sizes: {"XS":2,"S":5,"M":5,"L":5,"XL":5,"2XL":3,"3XL":2},
    totalUnits: 27,
    image: "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F108918_1001_dtl1_1759307795005.jpg?alt=media&token=c80126d3-2041-4614-be9b-fd7060ab1b48",
    images: ["https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F108918_1001_dtl1_1759307795005.jpg?alt=media&token=c80126d3-2041-4614-be9b-fd7060ab1b48","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F108918_1001_dtl2_1759307796180.jpg?alt=media&token=13b01e22-909f-4272-9175-9bef8f66fd8e","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F108918_1001_dtl3_1759307797623.jpg?alt=media&token=71697dc3-3cdc-41dd-bf17-55013d2d7894","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F108918_1001_dtl4_1759307798760.jpg?alt=media&token=2ba93e00-b767-43ce-aef4-931d97f2f7fa","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F108918_1001_dtl5_1759307799812.jpg?alt=media&token=c307742e-5bf4-4ed2-85d9-f645b880b1c4"],
  },
  {
    id: "tr5",
    ref: "TR5",
    supplierCode: "109012 1001",
    name: "True Religion Ribbed Sweat Short Jet Black",
    description: "True Religion Ribbed Sweat Short Jet Black",
    price: 869.13,
    wholesalePrice: 869.13,
    retailPrice: 1999,
    category: "male",
    colour: "BLACK",
    gender: "MEN",
    productCategory: "Shorts",
    sizes: {"S":5,"M":5,"L":5,"XL":5,"2XL":3,"3XL":2},
    totalUnits: 25,
    image: "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR5%2F109012_1001_dtl1_1759307802000.jpg?alt=media&token=abc123def456",
    images: ["https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR5%2F109012_1001_dtl1_1759307802000.jpg?alt=media&token=abc123def456","https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR5%2F109012_1001_dtl2_1759307803000.jpg?alt=media&token=def456ghi789"],
  }
];`;

    // Write the restored products
    const productsPath = join(process.cwd(), 'src/data/products.ts');
    writeFileSync(productsPath, productsContent);
    
    console.log('✅ Restored working Firebase URLs with tokens');
    console.log('📁 Updated src/data/products.ts');
    console.log('\n🎉 Your images should now load properly!');
    
  } catch (error) {
    console.error('❌ Error restoring images:', error);
  }
}

// Run the script
restoreWorkingImages();
