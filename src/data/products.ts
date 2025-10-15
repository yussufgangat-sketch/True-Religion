export type Product = {
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

export const products: Product[] = [
  {
    "id": "tr1",
    "ref": "TR1",
    "supplierCode": "700217 1800",
    "name": "True Religion Geno Sn Flap Slim Optic White",
    "description": "True Religion Geno Sn Flap Slim Optic White",
    "price": 1521.3,
    "wholesalePrice": 1521.3,
    "retailPrice": 3499,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 1,
      "29": 1,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 2,
      "34": 2,
      "36": 2,
      "38": 2,
      "40": 2,
      "42": 1
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl2_1759254679050.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl3_1759254679110.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl4_1759254680068.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl5_1759254680000.jpg?alt=media"
    ]
  },
  {
    "id": "tr2",
    "ref": "TR2",
    "supplierCode": "109337 1001",
    "name": "True Religion Ss Overt Patch Polo Jet Black",
    "description": "True Religion Ss Overt Patch Polo Jet Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl1_1759254707197.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl1_1759254707197.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl2_1759254707154.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl3_1759254707115.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR2%2F109337_1001_dtl4_1759254707720.jpg?alt=media"
    ]
  },
  {
    "id": "tr3",
    "ref": "TR3",
    "supplierCode": "109337 1700",
    "name": "True Religion Ss Overt Patch Polo Optic White",
    "description": "True Religion Ss Overt Patch Polo Optic White",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl1_1759254748793.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl1_1759254748793.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl2_1759254748848.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl3_1759254748890.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR3%2F109337_1700_dtl5_1759254749273.jpg?alt=media"
    ]
  },
  {
    "id": "tr4",
    "ref": "TR4",
    "supplierCode": "108918 1001",
    "name": "True Religion Ss Uni Logo Tee Jet Black",
    "description": "True Religion Ss Uni Logo Tee Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl1_1759253210405.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl1_1759253210405.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl2_1759253210451.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl3_1759253210433.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR4%2F109091_4004_dtl4_1759253210367.jpg?alt=media"
    ]
  },
  {
    "id": "tr5",
    "ref": "TR5",
    "supplierCode": "109012 1001",
    "name": "True Religion Ribbed Sweat Short Jet Black",
    "description": "True Religion Ribbed Sweat Short Jet Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "31": 2,
      "34": 1
    },
    "totalUnits": 3,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr6",
    "ref": "TR6",
    "supplierCode": "109020 IWFR",
    "name": "True Religion Rocco Super T Flap 32 In Blue Mariner Wash With Rips",
    "description": "True Religion Rocco Super T Flap 32 In Blue Mariner Wash With Rips",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "BLUE MARINE",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 3,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 2,
      "42": 2
    },
    "totalUnits": 37,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr7",
    "ref": "TR7",
    "supplierCode": "109021 IWID",
    "name": "True Religion Ricky Super T Flap 34In Midnight Warehouse Dark Wash",
    "description": "True Religion Ricky Super T Flap 34In Midnight Warehouse Dark Wash",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 3,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 2,
      "42": 2
    },
    "totalUnits": 37,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr8",
    "ref": "TR8",
    "supplierCode": "109028 IWFL",
    "name": "True Religion Ricky Sn Flap Short Fray Blue Mariner Light Wash",
    "description": "True Religion Ricky Sn Flap Short Fray Blue Mariner Light Wash",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "male",
    "colour": "FADED BLUE",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 1,
      "32": 2,
      "33": 2,
      "34": 2,
      "36": 2,
      "38": 2,
      "40": 2,
      "42": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr9",
    "ref": "TR9",
    "supplierCode": "109404 2SB",
    "name": "True Religion Rocco Super T Nf 32In 2Sb Black Rinse",
    "description": "True Religion Rocco Super T Nf 32In 2Sb Black Rinse",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 3,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 2,
      "42": 2
    },
    "totalUnits": 37,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr10",
    "ref": "TR10",
    "supplierCode": "109407 1001",
    "name": "True Religion Ss True Vintage No1 Tee Jet Black",
    "description": "True Religion Ss True Vintage No1 Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr11",
    "ref": "TR11",
    "supplierCode": "109407 1501",
    "name": "True Religion Ss True Vintage No1 Tee Heather Grey",
    "description": "True Religion Ss True Vintage No1 Tee Heather Grey",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "GREY",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 1,
      "2XL": 1
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr12",
    "ref": "TR12",
    "supplierCode": "109407 1700",
    "name": "True Religion Ss True Vintage No1 Tee Optic White",
    "description": "True Religion Ss True Vintage No1 Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 4,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 26,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr13",
    "ref": "TR13",
    "supplierCode": "109407 4004",
    "name": "True Religion Ss True Vintage No1 Tee Mazarine Blue",
    "description": "True Religion Ss True Vintage No1 Tee Mazarine Blue",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLUE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 1,
      "2XL": 1
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr14",
    "ref": "TR14",
    "supplierCode": "208753 IUVM",
    "name": "True Religion Joey Lr Short Flap Lunar Bleach",
    "description": "True Religion Joey Lr Short Flap Lunar Bleach",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 2,
      "25": 1,
      "26": 2,
      "27": 2,
      "28": 1,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 2,
      "34": 2
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr15",
    "ref": "TR15",
    "supplierCode": "209029 1001",
    "name": "True Religion Crystal Tr Buddha Crew Tee Jet Black",
    "description": "True Religion Crystal Tr Buddha Crew Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr16",
    "ref": "TR16",
    "supplierCode": "209029 1700",
    "name": "True Religion Crystal Tr Buddha Crew Tee Optic White",
    "description": "True Religion Crystal Tr Buddha Crew Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 2,
      "M": 2,
      "L": 2
    },
    "totalUnits": 8,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr17",
    "ref": "TR17",
    "supplierCode": "209055 IUTM",
    "name": "True Religion Crystal Wing Becca Boot Flap Marina",
    "description": "True Religion Crystal Wing Becca Boot Flap Marina",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "MARINA",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 3,
      "31": 2,
      "32": 2,
      "33": 2,
      "34": 2
    },
    "totalUnits": 23,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr18",
    "ref": "TR18",
    "supplierCode": "208746 IVNM",
    "name": "True Religion Becca Mr Bootcut Super T Crowd Surf Blue",
    "description": "True Religion Becca Mr Bootcut Super T Crowd Surf Blue",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 2,
      "34": 2
    },
    "totalUnits": 22,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr19",
    "ref": "TR19",
    "supplierCode": "208750 IUMG",
    "name": "True Religion Twist Seam Jennie Mr Flap Bigt Stage Dive",
    "description": "True Religion Twist Seam Jennie Mr Flap Bigt Stage Dive",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "female",
    "colour": "STAGE DIVE",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 2,
      "34": 2
    },
    "totalUnits": 22,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr20",
    "ref": "TR20",
    "supplierCode": "109091 1001",
    "name": "True Religion Ss Buddha Patch Polo Jet Black",
    "description": "True Religion Ss Buddha Patch Polo Jet Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr21",
    "ref": "TR21",
    "supplierCode": "109091 1700",
    "name": "True Religion Ss Buddha Patch Polo Optic White",
    "description": "True Religion Ss Buddha Patch Polo Optic White",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr22",
    "ref": "TR22",
    "supplierCode": "109091 4004",
    "name": "True Religion Ss Buddha Patch Polo Mazarine Blue",
    "description": "True Religion Ss Buddha Patch Polo Mazarine Blue",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "MAZARINE BLUE",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr23",
    "ref": "TR23",
    "supplierCode": "109091 6909",
    "name": "True Religion Ss Buddha Patch Polo Trv Red",
    "description": "True Religion Ss Buddha Patch Polo Trv Red",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "RED",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr24",
    "ref": "TR24",
    "supplierCode": "109217 IRWL",
    "name": "True Religion Ovr Dtrs Jacqrd Ropestitch Jkt City Lights Light Wash",
    "description": "True Religion Ovr Dtrs Jacqrd Ropestitch Jkt City Lights Light Wash",
    "price": 2521.3,
    "wholesalePrice": 2521.3,
    "retailPrice": 5799,
    "category": "male",
    "colour": "LIGHT WASH",
    "gender": "MEN",
    "productCategory": "Jackets",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr25",
    "ref": "TR25",
    "supplierCode": "109240 1001",
    "name": "True Religion Big T Slub Zip Up Hoodie Jet Black",
    "description": "True Religion Big T Slub Zip Up Hoodie Jet Black",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr26",
    "ref": "TR26",
    "supplierCode": "109240 1501",
    "name": "True Religion Big T Slub Zip Up Hoodie Heather Grey",
    "description": "True Religion Big T Slub Zip Up Hoodie Heather Grey",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "GREY",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 1,
      "M": 1,
      "L": 1,
      "XL": 1,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 7,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr27",
    "ref": "TR27",
    "supplierCode": "109240 4610",
    "name": "True Religion Big T Slub Zip Up Hoodie Medieval Blue",
    "description": "True Religion Big T Slub Zip Up Hoodie Medieval Blue",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "BLUE",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr28",
    "ref": "TR28",
    "supplierCode": "109243 1001",
    "name": "True Religion Cinched Applique Pullover Hood Jet Black",
    "description": "True Religion Cinched Applique Pullover Hood Jet Black",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr29",
    "ref": "TR29",
    "supplierCode": "109243 6499",
    "name": "True Religion Cinched Applique Pullover Hood Molten Lava",
    "description": "True Religion Cinched Applique Pullover Hood Molten Lava",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "male",
    "colour": "LAVA",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr30",
    "ref": "TR30",
    "supplierCode": "109263 1001",
    "name": "True Religion Long Sweatshorts Jet Black",
    "description": "True Religion Long Sweatshorts Jet Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 3,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr31",
    "ref": "TR31",
    "supplierCode": "109263 2701",
    "name": "True Religion Long Sweatshorts Travertine",
    "description": "True Religion Long Sweatshorts Travertine",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "TRAVERTINE",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 3,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr32",
    "ref": "TR32",
    "supplierCode": "109277 1001",
    "name": "True Religion Oversized Ss Mesh Polo Jet Black",
    "description": "True Religion Oversized Ss Mesh Polo Jet Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr33",
    "ref": "TR33",
    "supplierCode": "109277 4610",
    "name": "True Religion Oversized Ss Mesh Polo Medieval Blue",
    "description": "True Religion Oversized Ss Mesh Polo Medieval Blue",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLUE",
    "gender": "MEN",
    "productCategory": "Golfers",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr34",
    "ref": "TR34",
    "supplierCode": "109279 1001",
    "name": "True Religion Mesh Basketball Short Black",
    "description": "True Religion Mesh Basketball Short Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr35",
    "ref": "TR35",
    "supplierCode": "109279 4610",
    "name": "True Religion Mesh Basketball Short Medieval Blue",
    "description": "True Religion Mesh Basketball Short Medieval Blue",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLUE",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr36",
    "ref": "TR36",
    "supplierCode": "109285 1001",
    "name": "True Religion Ss Puff Stitch Tee Jet Black",
    "description": "True Religion Ss Puff Stitch Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr37",
    "ref": "TR37",
    "supplierCode": "109285 1501",
    "name": "True Religion Ss Puff Stitch Tee Heather Grey",
    "description": "True Religion Ss Puff Stitch Tee Heather Grey",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "GREY",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 3,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 15,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr38",
    "ref": "TR38",
    "supplierCode": "109285 1700",
    "name": "True Religion Ss Puff Stitch Tee Optic White",
    "description": "True Religion Ss Puff Stitch Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr39",
    "ref": "TR39",
    "supplierCode": "109288 1001",
    "name": "True Religion Ss Buddha Face Flock Tee Black",
    "description": "True Religion Ss Buddha Face Flock Tee Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr40",
    "ref": "TR40",
    "supplierCode": "109288 1700",
    "name": "True Religion Ss Buddha Face Flock Tee Optic White",
    "description": "True Religion Ss Buddha Face Flock Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr41",
    "ref": "TR41",
    "supplierCode": "109288 2701",
    "name": "True Religion Ss Buddha Face Flock Tee Travertine",
    "description": "True Religion Ss Buddha Face Flock Tee Travertine",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "TRAVERTINE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 3,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 15,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr42",
    "ref": "TR42",
    "supplierCode": "109289 1001",
    "name": "True Religion Ss Rock N Roll Tee Black",
    "description": "True Religion Ss Rock N Roll Tee Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr43",
    "ref": "TR43",
    "supplierCode": "109289 1999",
    "name": "True Religion Ss Rock N Roll Tee White Top",
    "description": "True Religion Ss Rock N Roll Tee White Top",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 23,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr44",
    "ref": "TR44",
    "supplierCode": "109289 6499",
    "name": "True Religion Ss Rock N Roll Tee Molten Lava",
    "description": "True Religion Ss Rock N Roll Tee Molten Lava",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "LAVA",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 23,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr45",
    "ref": "TR45",
    "supplierCode": "109292 1001",
    "name": "True Religion Ss Embro Arch Logo Tee Jet Black",
    "description": "True Religion Ss Embro Arch Logo Tee Jet Black",
    "price": 695.22,
    "wholesalePrice": 695.22,
    "retailPrice": 1599,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr46",
    "ref": "TR46",
    "supplierCode": "109292 1238",
    "name": "True Religion Ss Embro Arch Logo Tee Quiet Grey",
    "description": "True Religion Ss Embro Arch Logo Tee Quiet Grey",
    "price": 695.22,
    "wholesalePrice": 695.22,
    "retailPrice": 1599,
    "category": "male",
    "colour": "GREY",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr47",
    "ref": "TR47",
    "supplierCode": "109292 6909",
    "name": "True Religion Ss Embro Arch Logo Tee Trv Red",
    "description": "True Religion Ss Embro Arch Logo Tee Trv Red",
    "price": 695.22,
    "wholesalePrice": 695.22,
    "retailPrice": 1599,
    "category": "male",
    "colour": "RED",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr48",
    "ref": "TR48",
    "supplierCode": "109308 1001",
    "name": "True Religion Applique Sweatshorts Jet Black",
    "description": "True Religion Applique Sweatshorts Jet Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 3,
      "34": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr49",
    "ref": "TR49",
    "supplierCode": "109308 6499",
    "name": "True Religion Applique Sweatshorts Molten Lava",
    "description": "True Religion Applique Sweatshorts Molten Lava",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "LAVA",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 3,
      "34": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr50",
    "ref": "TR50",
    "supplierCode": "109464 IYBM",
    "name": "True Religion True Oversized Super T Jacket Medium Wash",
    "description": "True Religion True Oversized Super T Jacket Medium Wash",
    "price": 2130,
    "wholesalePrice": 2130,
    "retailPrice": 4899,
    "category": "male",
    "colour": "MEDIUM WASH",
    "gender": "MEN",
    "productCategory": "Jackets",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr51",
    "ref": "TR51",
    "supplierCode": "109479 1001",
    "name": "True Religion Script Cinched Sweatshirt Jet Black",
    "description": "True Religion Script Cinched Sweatshirt Jet Black",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 3,
      "M": 4,
      "L": 2,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 18,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr52",
    "ref": "TR52",
    "supplierCode": "109479 2701",
    "name": "True Religion Script Cinched Sweatshirt Travertine",
    "description": "True Religion Script Cinched Sweatshirt Travertine",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "male",
    "colour": "TRAVERTINE",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr53",
    "ref": "TR53",
    "supplierCode": "109698 1001",
    "name": "True Religion Big T Slub Short Jet Black",
    "description": "True Religion Big T Slub Short Jet Black",
    "price": 999.57,
    "wholesalePrice": 999.57,
    "retailPrice": 2299,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 2,
      "34": 1
    },
    "totalUnits": 11,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr54",
    "ref": "TR54",
    "supplierCode": "109698 1501",
    "name": "True Religion Big T Slub Short Heather Grey",
    "description": "True Religion Big T Slub Short Heather Grey",
    "price": 999.57,
    "wholesalePrice": 999.57,
    "retailPrice": 2299,
    "category": "male",
    "colour": "GREY",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 3,
      "34": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr55",
    "ref": "TR55",
    "supplierCode": "109698 4610",
    "name": "True Religion Big T Slub Short Medieval Blue",
    "description": "True Religion Big T Slub Short Medieval Blue",
    "price": 999.57,
    "wholesalePrice": 999.57,
    "retailPrice": 2299,
    "category": "male",
    "colour": "BLUE",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 3,
      "34": 2
    },
    "totalUnits": 21,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr56",
    "ref": "TR56",
    "supplierCode": "109193 IYYD",
    "name": "True Religion Rocco Super T Nf 32 In Jackknife Dark Wash",
    "description": "True Religion Rocco Super T Nf 32 In Jackknife Dark Wash",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 2,
      "31": 4,
      "32": 3,
      "33": 4,
      "34": 2,
      "36": 2,
      "38": 1,
      "40": 3,
      "42": 3
    },
    "totalUnits": 31,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr57",
    "ref": "TR57",
    "supplierCode": "109194 2SB",
    "name": "True Religion Ricky Super T Flap 34In 2Sb Black Rinse",
    "description": "True Religion Ricky Super T Flap 34In 2Sb Black Rinse",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 40,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr58",
    "ref": "TR58",
    "supplierCode": "109195 IYCR",
    "name": "True Religion Bobby Supert Flap 32 In Lt Clearwater Wash With Rips",
    "description": "True Religion Bobby Supert Flap 32 In Lt Clearwater Wash With Rips",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "LIGHT WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 2,
      "30": 3,
      "32": 3,
      "33": 2,
      "34": 3,
      "36": 3,
      "38": 3,
      "40": 2,
      "42": 2
    },
    "totalUnits": 26,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr59",
    "ref": "TR59",
    "supplierCode": "109216 IRWL",
    "name": "True Religion Dtrsd Jqrd Ricky Rope Flp 34In City Lights Light Wash",
    "description": "True Religion Dtrsd Jqrd Ricky Rope Flp 34In City Lights Light Wash",
    "price": 2521.3,
    "wholesalePrice": 2521.3,
    "retailPrice": 5799,
    "category": "male",
    "colour": "LIGHT WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 2,
      "29": 5,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 40,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr60",
    "ref": "TR60",
    "supplierCode": "109196 2S",
    "name": "True Religion Geno Super T Flap 32 In 2S Body Rinse",
    "description": "True Religion Geno Super T Flap 32 In 2S Body Rinse",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 45,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr61",
    "ref": "TR61",
    "supplierCode": "109197 IYCL",
    "name": "True Religion Matt Super T No Flap 32In Light Clearwater Wash",
    "description": "True Religion Matt Super T No Flap 32In Light Clearwater Wash",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "LIGHT WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 45,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr62",
    "ref": "TR62",
    "supplierCode": "109953 IXZM",
    "name": "True Religion Mikey Super T No Flap 32 In Headspace Medium Wash",
    "description": "True Religion Mikey Super T No Flap 32 In Headspace Medium Wash",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "MEDIUM WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 45,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr63",
    "ref": "TR63",
    "supplierCode": "109199 IYGB",
    "name": "True Religion Ricky Super T Nf 34In Resistance Black Wash",
    "description": "True Religion Ricky Super T Nf 34In Resistance Black Wash",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 45,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr64",
    "ref": "TR64",
    "supplierCode": "109201 IZQD",
    "name": "True Religion Rocco Big T No Flp Ovrsized Hs Street Lights Dark Wash",
    "description": "True Religion Rocco Big T No Flp Ovrsized Hs Street Lights Dark Wash",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 4,
      "29": 5,
      "30": 6,
      "31": 6,
      "32": 6,
      "33": 6,
      "34": 6,
      "36": 6,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 54,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr65",
    "ref": "TR65",
    "supplierCode": "109311 IRTB",
    "name": "True Religion Ricky Big T Nf Ovrszed Hs 34In Chantey Black Wash",
    "description": "True Religion Ricky Big T Nf Ovrszed Hs 34In Chantey Black Wash",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 45,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr66",
    "ref": "TR66",
    "supplierCode": "109202 JEBL",
    "name": "True Religion Billy Sn Flap 34In Beach Trail Light Wash",
    "description": "True Religion Billy Sn Flap 34In Beach Trail Light Wash",
    "price": 1390.87,
    "wholesalePrice": 1390.87,
    "retailPrice": 3199,
    "category": "male",
    "colour": "LIGHT WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 42,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr67",
    "ref": "TR67",
    "supplierCode": "109204 IXZM",
    "name": "True Religion Ricky Sn Flap 34In Headspace Medium Wash",
    "description": "True Religion Ricky Sn Flap 34In Headspace Medium Wash",
    "price": 1390.87,
    "wholesalePrice": 1390.87,
    "retailPrice": 3199,
    "category": "male",
    "colour": "MEDIUM WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 45,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr68",
    "ref": "TR68",
    "supplierCode": "109206 ISRD",
    "name": "True Religion Vinny Sn Flap 34In Nightcap Dark Wash",
    "description": "True Religion Vinny Sn Flap 34In Nightcap Dark Wash",
    "price": 1390.87,
    "wholesalePrice": 1390.87,
    "retailPrice": 3199,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 3,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 39,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr69",
    "ref": "TR69",
    "supplierCode": "109211 IYBM",
    "name": "True Religion True Bobby Super T Flap Short Beached Out Medium Wash",
    "description": "True Religion True Bobby Super T Flap Short Beached Out Medium Wash",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "MEDIUM WASH",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 3,
      "36": 3,
      "38": 3,
      "40": 2
    },
    "totalUnits": 38,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr70",
    "ref": "TR70",
    "supplierCode": "109952 IZQD",
    "name": "True Religion Ricky Bigt Nf Ovrsizd Hs Short Dark Wash",
    "description": "True Religion Ricky Bigt Nf Ovrsizd Hs Short Dark Wash",
    "price": 1390.87,
    "wholesalePrice": 1390.87,
    "retailPrice": 3199,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 5,
      "38": 2,
      "40": 1
    },
    "totalUnits": 40,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr71",
    "ref": "TR71",
    "supplierCode": "109466 IRTB",
    "name": "True Religion Ricky Bigt Nf Ovrszd Hs Short Chantey Black Wash",
    "description": "True Religion Ricky Bigt Nf Ovrszd Hs Short Chantey Black Wash",
    "price": 1390.87,
    "wholesalePrice": 1390.87,
    "retailPrice": 3199,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 5,
      "38": 2,
      "40": 1
    },
    "totalUnits": 40,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr72",
    "ref": "TR72",
    "supplierCode": "109214 IYMR",
    "name": "True Religion Ricky Sn Flap Fray Hem Short Cruiseline Medium Wash W/ Rips",
    "description": "True Religion Ricky Sn Flap Fray Hem Short Cruiseline Medium Wash W/ Rips",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "male",
    "colour": "MEDIUM WASH",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "40": 1
    },
    "totalUnits": 37,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr73",
    "ref": "TR73",
    "supplierCode": "109268 1001",
    "name": "True Religion Bigt Vintage Metallic Zip Up Jet Black",
    "description": "True Religion Bigt Vintage Metallic Zip Up Jet Black",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 3,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 15,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr74",
    "ref": "TR74",
    "supplierCode": "109268 4610",
    "name": "True Religion Bigt Vintage Metallic Zip Up Medieval Blue",
    "description": "True Religion Bigt Vintage Metallic Zip Up Medieval Blue",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "BLUE",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 3,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 15,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr75",
    "ref": "TR75",
    "supplierCode": "109271 1001",
    "name": "True Religion Snap Off Track Jacket Jet Black",
    "description": "True Religion Snap Off Track Jacket Jet Black",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Jackets",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3,
      "3XL": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr76",
    "ref": "TR76",
    "supplierCode": "109273 1001",
    "name": "True Religion Snap Off Baggy Track Pants Jet Black",
    "description": "True Religion Snap Off Baggy Track Pants Jet Black",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Pants",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 3,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr77",
    "ref": "TR77",
    "supplierCode": "109275 1001",
    "name": "True Religion Ss Pique Mineral Patch Henley Jet Black",
    "description": "True Religion Ss Pique Mineral Patch Henley Jet Black",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr78",
    "ref": "TR78",
    "supplierCode": "109275 1238",
    "name": "True Religion Ss Pique Mineral Patch Henley Quiet Grey",
    "description": "True Religion Ss Pique Mineral Patch Henley Quiet Grey",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "GREY",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr79",
    "ref": "TR79",
    "supplierCode": "109275 2701",
    "name": "True Religion Ss Pique Mineral Patch Henley Travertine",
    "description": "True Religion Ss Pique Mineral Patch Henley Travertine",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "TRAVERTINE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr80",
    "ref": "TR80",
    "supplierCode": "109275 4002",
    "name": "True Religion Ss Pique Mineral Patch Henley Midnight",
    "description": "True Religion Ss Pique Mineral Patch Henley Midnight",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "NAVY",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr81",
    "ref": "TR81",
    "supplierCode": "109293 1001",
    "name": "True Religion Ss Skeleton Hs Embro Tee Jet Black",
    "description": "True Religion Ss Skeleton Hs Embro Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 1,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr82",
    "ref": "TR82",
    "supplierCode": "109293 1702",
    "name": "True Religion Ss Skeleton Hs Embro Tee Winter White",
    "description": "True Religion Ss Skeleton Hs Embro Tee Winter White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr83",
    "ref": "TR83",
    "supplierCode": "109293 6909",
    "name": "True Religion Ss Skeleton Hs Embro Tee Trv Red",
    "description": "True Religion Ss Skeleton Hs Embro Tee Trv Red",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "RED",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr84",
    "ref": "TR84",
    "supplierCode": "109295 1001",
    "name": "True Religion Ss Made Fresh Tee Jet Black",
    "description": "True Religion Ss Made Fresh Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr85",
    "ref": "TR85",
    "supplierCode": "109295 1700",
    "name": "True Religion Ss Made Fresh Tee Optic White",
    "description": "True Religion Ss Made Fresh Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 1
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr86",
    "ref": "TR86",
    "supplierCode": "109296 1001",
    "name": "True Religion Ss Crinkle Paint Tee Jet Black",
    "description": "True Religion Ss Crinkle Paint Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr87",
    "ref": "TR87",
    "supplierCode": "109296 1700",
    "name": "True Religion Ss Crinkle Paint Tee Optic White",
    "description": "True Religion Ss Crinkle Paint Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr88",
    "ref": "TR88",
    "supplierCode": "109296 6909",
    "name": "True Religion Ss Crinkle Paint Tee Trv Red",
    "description": "True Religion Ss Crinkle Paint Tee Trv Red",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "RED",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr89",
    "ref": "TR89",
    "supplierCode": "109297 1001",
    "name": "True Religion Ss Flock Oversized Tee Jet Black",
    "description": "True Religion Ss Flock Oversized Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr90",
    "ref": "TR90",
    "supplierCode": "109297 4002",
    "name": "True Religion Ss Flock Oversized Tee Midnight Blue",
    "description": "True Religion Ss Flock Oversized Tee Midnight Blue",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLUE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 4,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 27,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr91",
    "ref": "TR91",
    "supplierCode": "109297 6909",
    "name": "True Religion Ss Flock Oversized Tee Trv Red",
    "description": "True Religion Ss Flock Oversized Tee Trv Red",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "RED",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr92",
    "ref": "TR92",
    "supplierCode": "109298 1001",
    "name": "True Religion Ss Registered Hs Beach Tee Jet Black",
    "description": "True Religion Ss Registered Hs Beach Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr93",
    "ref": "TR93",
    "supplierCode": "109298 1700",
    "name": "True Religion Ss Registered Hs Beach Tee Optic White",
    "description": "True Religion Ss Registered Hs Beach Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 4,
      "3XL": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr94",
    "ref": "TR94",
    "supplierCode": "109318 1787",
    "name": "True Religion Aop Sn Board Short White / Mix",
    "description": "True Religion Aop Sn Board Short White / Mix",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "male",
    "colour": "MULTI",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 1
    },
    "totalUnits": 15,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr95",
    "ref": "TR95",
    "supplierCode": "109220 ISRD",
    "name": "True Religion Rocco Super T No Flap 32In Dark Wash",
    "description": "True Religion Rocco Super T No Flap 32In Dark Wash",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 5,
      "31": 5,
      "32": 5,
      "33": 5,
      "34": 5,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 3
    },
    "totalUnits": 45,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr96",
    "ref": "TR96",
    "supplierCode": "109468 1001",
    "name": "True Religion Baggy Utlity Big T Pant Black",
    "description": "True Religion Baggy Utlity Big T Pant Black",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Pants",
    "sizes": {
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 3,
      "34": 3,
      "36": 3,
      "38": 2,
      "40": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr97",
    "ref": "TR97",
    "supplierCode": "109468 2701",
    "name": "True Religion Baggy Utlity Big T Pant Travertine",
    "description": "True Religion Baggy Utlity Big T Pant Travertine",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "TRAVERTINE",
    "gender": "MEN",
    "productCategory": "Pants",
    "sizes": {
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 3,
      "34": 3,
      "36": 3,
      "38": 2,
      "40": 2
    },
    "totalUnits": 28,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr98",
    "ref": "TR98",
    "supplierCode": "109469 2SB",
    "name": "True Religion Ricky Bigt Nf Buddha Embr 34In 2Sb Black Rinse",
    "description": "True Religion Ricky Bigt Nf Buddha Embr 34In 2Sb Black Rinse",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 4,
      "31": 3,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 2
    },
    "totalUnits": 38,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr99",
    "ref": "TR99",
    "supplierCode": "109951 ISRD",
    "name": "True Religion Vinny Sn Nf Buddha Embro 34In Dark Wash",
    "description": "True Religion Vinny Sn Nf Buddha Embro 34In Dark Wash",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 2
    },
    "totalUnits": 39,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr100",
    "ref": "TR100",
    "supplierCode": "109234 IYGB",
    "name": "True Religion Rocco Sn No Flap 32In Resistance Black Wash",
    "description": "True Religion Rocco Sn No Flap 32In Resistance Black Wash",
    "price": 1390.87,
    "wholesalePrice": 1390.87,
    "retailPrice": 3199,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 2
    },
    "totalUnits": 39,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr101",
    "ref": "TR101",
    "supplierCode": "109235 IZQD",
    "name": "True Religion Ricky Sn Flap 34In Street Lights Dark Wash",
    "description": "True Religion Ricky Sn Flap 34In Street Lights Dark Wash",
    "price": 1390.87,
    "wholesalePrice": 1390.87,
    "retailPrice": 3199,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 2
    },
    "totalUnits": 39,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr102",
    "ref": "TR102",
    "supplierCode": "109237 IYMM",
    "name": "True Religion Vinny Tear Away Sn Flp 32In Whisper Medium Wash",
    "description": "True Religion Vinny Tear Away Sn Flp 32In Whisper Medium Wash",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "MEDIUM WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 3,
      "42": 2
    },
    "totalUnits": 39,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr103",
    "ref": "TR103",
    "supplierCode": "109242 2SB",
    "name": "True Religion Bobby Flap Rope Stitch Short 2Sb Black Rinse",
    "description": "True Religion Bobby Flap Rope Stitch Short 2Sb Black Rinse",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "28": 2,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 3,
      "34": 3,
      "36": 2,
      "38": 2
    },
    "totalUnits": 24,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr104",
    "ref": "TR104",
    "supplierCode": "109702 IYYD",
    "name": "True Religion Vinny Rope Stitch Short Flap Jackknife Dark Wash",
    "description": "True Religion Vinny Rope Stitch Short Flap Jackknife Dark Wash",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Shorts",
    "sizes": {
      "28": 2,
      "30": 3,
      "32": 3,
      "34": 3,
      "36": 2,
      "38": 1
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr105",
    "ref": "TR105",
    "supplierCode": "109224 OPW",
    "name": "True Religion Ricky Nf Super T 34In Optic White",
    "description": "True Religion Ricky Nf Super T 34In Optic White",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 4,
      "34": 4,
      "36": 4,
      "38": 3,
      "40": 2,
      "42": 2
    },
    "totalUnits": 38,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr106",
    "ref": "TR106",
    "supplierCode": "109283 1001",
    "name": "True Religion Mesh Srs Pullover Hoodie Jet Black",
    "description": "True Religion Mesh Srs Pullover Hoodie Jet Black",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 2,
      "3XL": 1
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr107",
    "ref": "TR107",
    "supplierCode": "109299 1001",
    "name": "True Religion Ss Ombre Graphic Tee Jet Black",
    "description": "True Religion Ss Ombre Graphic Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr108",
    "ref": "TR108",
    "supplierCode": "109299 1700",
    "name": "True Religion Ss Ombre Graphic Tee Optic White",
    "description": "True Religion Ss Ombre Graphic Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "male",
    "colour": "WHITE",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr109",
    "ref": "TR109",
    "supplierCode": "109300 1001",
    "name": "True Religion Ss Vintage Puff Buddha Tee Jet Black",
    "description": "True Religion Ss Vintage Puff Buddha Tee Jet Black",
    "price": 695.22,
    "wholesalePrice": 695.22,
    "retailPrice": 1599,
    "category": "male",
    "colour": "BLACK",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr110",
    "ref": "TR110",
    "supplierCode": "109300 1601",
    "name": "True Religion Ss Vintage Puff Buddha Tee Buckthorn",
    "description": "True Religion Ss Vintage Puff Buddha Tee Buckthorn",
    "price": 695.22,
    "wholesalePrice": 695.22,
    "retailPrice": 1599,
    "category": "male",
    "colour": "BUCKTHORN",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr111",
    "ref": "TR111",
    "supplierCode": "109300 4002",
    "name": "True Religion Ss Vintage Puff Buddha Tee Midnight",
    "description": "True Religion Ss Vintage Puff Buddha Tee Midnight",
    "price": 695.22,
    "wholesalePrice": 695.22,
    "retailPrice": 1599,
    "category": "male",
    "colour": "NAVY",
    "gender": "MEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 5,
      "M": 5,
      "L": 5,
      "XL": 5,
      "2XL": 3,
      "3XL": 2
    },
    "totalUnits": 25,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr112",
    "ref": "TR112",
    "supplierCode": "109700 6909",
    "name": "True Religion Mesh Baggy Sweatpants Trv Red",
    "description": "True Religion Mesh Baggy Sweatpants Trv Red",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "male",
    "colour": "TRAVERTINE",
    "gender": "MEN",
    "productCategory": "Joggers And Swetpants",
    "sizes": {
      "29": 4,
      "30": 4,
      "31": 4,
      "32": 4,
      "33": 2,
      "34": 1
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr113",
    "ref": "TR113",
    "supplierCode": "109261 IYQD",
    "name": "True Religion Rocco Super T Nf 32In Dark Wash",
    "description": "True Religion Rocco Super T Nf 32In Dark Wash",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "male",
    "colour": "DARK WASH",
    "gender": "MEN",
    "productCategory": "Jeans",
    "sizes": {
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 2,
      "32": 2,
      "33": 2,
      "36": 2,
      "42": 2
    },
    "totalUnits": 19,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr114",
    "ref": "TR114",
    "supplierCode": "208942 IXJM",
    "name": "True Religion Jennie Mr Skinny Flap Sup T Royal Indigo",
    "description": "True Religion Jennie Mr Skinny Flap Sup T Royal Indigo",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "female",
    "colour": "INDIGO",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 31,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr115",
    "ref": "TR115",
    "supplierCode": "208941 INWL",
    "name": "True Religion Becca Mr Bootcut Flap Sup T Giselle",
    "description": "True Religion Becca Mr Bootcut Flap Sup T Giselle",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "female",
    "colour": "GISELLE",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 31,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr116",
    "ref": "TR116",
    "supplierCode": "208943 IZFD",
    "name": "True Religion Low Rise Billie St Flap Sup T Twilight Teal",
    "description": "True Religion Low Rise Billie St Flap Sup T Twilight Teal",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "female",
    "colour": "TEAL",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 31,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr117",
    "ref": "TR117",
    "supplierCode": "208956 IZB1",
    "name": "True Religion Front Zip Pkt Becca Mr Bootcut Polar Frost",
    "description": "True Religion Front Zip Pkt Becca Mr Bootcut Polar Frost",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "FROST",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 4,
      "26": 4,
      "27": 4,
      "28": 4,
      "29": 4,
      "30": 4,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 37,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr118",
    "ref": "TR118",
    "supplierCode": "208955 IXJM",
    "name": "True Religion I Love True Jennie Mr Skinny Royal Indigo",
    "description": "True Religion I Love True Jennie Mr Skinny Royal Indigo",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "INDIGO",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 4,
      "26": 4,
      "27": 4,
      "28": 4,
      "29": 4,
      "30": 4,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 37,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr119",
    "ref": "TR119",
    "supplierCode": "209169 HWRN",
    "name": "True Religion I Love True Becca Mr Bootcut Peak Spot",
    "description": "True Religion I Love True Becca Mr Bootcut Peak Spot",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "PEAK SPOT",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 4,
      "26": 4,
      "27": 4,
      "28": 2,
      "29": 4,
      "30": 2,
      "31": 1,
      "32": 1,
      "33": 2,
      "34": 2
    },
    "totalUnits": 29,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr120",
    "ref": "TR120",
    "supplierCode": "208957 6713",
    "name": "True Religion Becca Mr Boot Big T Flap Sunkist Coral",
    "description": "True Religion Becca Mr Boot Big T Flap Sunkist Coral",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "female",
    "colour": "SUNKIST CORAL",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 2,
      "25": 1,
      "26": 2,
      "27": 1,
      "28": 2,
      "29": 1,
      "30": 2,
      "31": 1,
      "32": 1,
      "33": 2
    },
    "totalUnits": 15,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr121",
    "ref": "TR121",
    "supplierCode": "208957 3563",
    "name": "True Religion Becca Mr Boot Big T Flap Daiquiri Green",
    "description": "True Religion Becca Mr Boot Big T Flap Daiquiri Green",
    "price": 1738.7,
    "wholesalePrice": 1738.7,
    "retailPrice": 3999,
    "category": "female",
    "colour": "GREEN",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 2,
      "25": 1,
      "26": 2,
      "27": 1,
      "28": 2,
      "29": 1,
      "30": 2,
      "31": 1,
      "32": 1,
      "33": 2
    },
    "totalUnits": 15,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr122",
    "ref": "TR122",
    "supplierCode": "208972 1702",
    "name": "True Religion Varsity Bomber Jacket Winter White",
    "description": "True Religion Varsity Bomber Jacket Winter White",
    "price": 1999.57,
    "wholesalePrice": 1999.57,
    "retailPrice": 4599,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "Jackets",
    "sizes": {
      "XS": 3,
      "S": 4,
      "M": 4,
      "L": 4,
      "XL": 4,
      "2XL": 3
    },
    "totalUnits": 22,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr123",
    "ref": "TR123",
    "supplierCode": "209179 6713",
    "name": "True Religion Cropped Vest Big T Sunkist Coral",
    "description": "True Religion Cropped Vest Big T Sunkist Coral",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "female",
    "colour": "CORAL",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 1
    },
    "totalUnits": 10,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr124",
    "ref": "TR124",
    "supplierCode": "209195 IZFD",
    "name": "True Religion Denim Cropped Vest Sup T Twilight Teal",
    "description": "True Religion Denim Cropped Vest Sup T Twilight Teal",
    "price": 1477.83,
    "wholesalePrice": 1477.83,
    "retailPrice": 3399,
    "category": "female",
    "colour": "TEAL",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr125",
    "ref": "TR125",
    "supplierCode": "209181 IZJL",
    "name": "True Religion Sadie Mini Skirt Flap Misty Ocean",
    "description": "True Religion Sadie Mini Skirt Flap Misty Ocean",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "OCEAN",
    "gender": "WOMEN",
    "productCategory": "Skirts",
    "sizes": {
      "24": 4,
      "25": 4,
      "26": 2,
      "27": 4,
      "28": 4,
      "29": 2
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr126",
    "ref": "TR126",
    "supplierCode": "209194 IWRM",
    "name": "True Religion I Love True Joey Lr Short Cerulean Dream",
    "description": "True Religion I Love True Joey Lr Short Cerulean Dream",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "CERULEAN DREAM",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 1,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr127",
    "ref": "TR127",
    "supplierCode": "208987 IJRL",
    "name": "True Religion I Love True Jennie Short Flap Seastorm",
    "description": "True Religion I Love True Jennie Short Flap Seastorm",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "SEASTORM",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 1,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr128",
    "ref": "TR128",
    "supplierCode": "208991 6713",
    "name": "True Religion Joey Cut Off Big T Flap Sunkist Coral",
    "description": "True Religion Joey Cut Off Big T Flap Sunkist Coral",
    "price": 1477.83,
    "wholesalePrice": 1477.83,
    "retailPrice": 3399,
    "category": "female",
    "colour": "CORAL",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 1,
      "25": 1,
      "26": 1,
      "27": 1,
      "28": 1,
      "29": 1,
      "30": 1,
      "31": 1,
      "32": 1
    },
    "totalUnits": 9,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr129",
    "ref": "TR129",
    "supplierCode": "208991 3563",
    "name": "True Religion Joey Cut Off Big T Flap Daiquiri Green",
    "description": "True Religion Joey Cut Off Big T Flap Daiquiri Green",
    "price": 1477.83,
    "wholesalePrice": 1477.83,
    "retailPrice": 3399,
    "category": "female",
    "colour": "GREEN",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 1,
      "25": 1,
      "26": 1,
      "27": 1,
      "28": 1,
      "29": 1,
      "30": 1,
      "31": 1,
      "32": 1
    },
    "totalUnits": 9,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr130",
    "ref": "TR130",
    "supplierCode": "208978 1998",
    "name": "True Religion Button Up Mr Shorts Flap Brilliant White",
    "description": "True Religion Button Up Mr Shorts Flap Brilliant White",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 1,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr131",
    "ref": "TR131",
    "supplierCode": "208980 IZGM",
    "name": "True Religion Button Up Mr Shorts Flap Caribbean Sky",
    "description": "True Religion Button Up Mr Shorts Flap Caribbean Sky",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "CARIBBEAN SKY",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 1,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr132",
    "ref": "TR132",
    "supplierCode": "208981 IZKB",
    "name": "True Religion Button Up Mr Shorts Flap Lagoon Mist",
    "description": "True Religion Button Up Mr Shorts Flap Lagoon Mist",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "LAGOON MIST",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 2,
      "25": 2,
      "26": 2,
      "27": 2,
      "28": 2,
      "29": 2,
      "30": 2,
      "31": 2,
      "32": 2,
      "33": 1,
      "34": 1
    },
    "totalUnits": 20,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr133",
    "ref": "TR133",
    "supplierCode": "209198 1700",
    "name": "True Religion Tr Palm Tree Baby Tee Optic White",
    "description": "True Religion Tr Palm Tree Baby Tee Optic White",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1,
      "2XL": 1
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr134",
    "ref": "TR134",
    "supplierCode": "209198 1001",
    "name": "True Religion Tr Palm Tree Baby Tee Jet Black",
    "description": "True Religion Tr Palm Tree Baby Tee Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr135",
    "ref": "TR135",
    "supplierCode": "209198 8221",
    "name": "True Religion Tr Palm Tree Baby Tee Exotic Orange",
    "description": "True Religion Tr Palm Tree Baby Tee Exotic Orange",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "ORANGE-PINK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr136",
    "ref": "TR136",
    "supplierCode": "209197 1700",
    "name": "True Religion Embroidered Tr Hs Ss Crew Tee Optic White",
    "description": "True Religion Embroidered Tr Hs Ss Crew Tee Optic White",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr137",
    "ref": "TR137",
    "supplierCode": "209197 1001",
    "name": "True Religion Embroidered Tr Hs Ss Crew Tee Jet Black",
    "description": "True Religion Embroidered Tr Hs Ss Crew Tee Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr138",
    "ref": "TR138",
    "supplierCode": "209197 6713",
    "name": "True Religion Embroidered Tr Hs Ss Crew Tee Sunkist Coral",
    "description": "True Religion Embroidered Tr Hs Ss Crew Tee Sunkist Coral",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "CORAL",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1,
      "2XL": 1
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr139",
    "ref": "TR139",
    "supplierCode": "209362 1001",
    "name": "True Religion Crystal Buddha Baby Tee Jet Black",
    "description": "True Religion Crystal Buddha Baby Tee Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 2,
      "XL": 1
    },
    "totalUnits": 12,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr140",
    "ref": "TR140",
    "supplierCode": "209362 1700",
    "name": "True Religion Crystal Buddha Baby Tee Optic White",
    "description": "True Religion Crystal Buddha Baby Tee Optic White",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr141",
    "ref": "TR141",
    "supplierCode": "209362 6713",
    "name": "True Religion Crystal Buddha Baby Tee Sunkist Coral",
    "description": "True Religion Crystal Buddha Baby Tee Sunkist Coral",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "CORAL",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1,
      "2XL": 1
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr142",
    "ref": "TR142",
    "supplierCode": "209361 1001",
    "name": "True Religion Crystal Wing V Notch Tee Jet Black",
    "description": "True Religion Crystal Wing V Notch Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr143",
    "ref": "TR143",
    "supplierCode": "209361 1700",
    "name": "True Religion Crystal Wing V Notch Tee Optic White",
    "description": "True Religion Crystal Wing V Notch Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr144",
    "ref": "TR144",
    "supplierCode": "209361 3563",
    "name": "True Religion Crystal Wing V Notch Tee Daiquiri Green",
    "description": "True Religion Crystal Wing V Notch Tee Daiquiri Green",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "GREEN",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr145",
    "ref": "TR145",
    "supplierCode": "209361 6005",
    "name": "True Religion Crystal Wing V Notch Tee Flame Scarlet",
    "description": "True Religion Crystal Wing V Notch Tee Flame Scarlet",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr146",
    "ref": "TR146",
    "supplierCode": "209136 9602",
    "name": "True Religion Printed Mesh Tube Top Patch Multi",
    "description": "True Religion Printed Mesh Tube Top Patch Multi",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "MULTI",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr147",
    "ref": "TR147",
    "supplierCode": "208879 6217",
    "name": "True Religion Embroidered Contrast Rib Tank Red -White",
    "description": "True Religion Embroidered Contrast Rib Tank Red -White",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "RED-WHITE",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr148",
    "ref": "TR148",
    "supplierCode": "208879 1096",
    "name": "True Religion Embroidered Contrast Rib Tank Black-White",
    "description": "True Religion Embroidered Contrast Rib Tank Black-White",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "BLACK-WHITE",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3
    },
    "totalUnits": 12,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr149",
    "ref": "TR149",
    "supplierCode": "208879 1836",
    "name": "True Religion Embroidered Contrast Rib Tank White-Red",
    "description": "True Religion Embroidered Contrast Rib Tank White-Red",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "WHITE-RED",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 2,
      "S": 3,
      "M": 4,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr150",
    "ref": "TR150",
    "supplierCode": "209155 1001",
    "name": "True Religion Mesh Horseshoe Racer Tank Jet Black",
    "description": "True Religion Mesh Horseshoe Racer Tank Jet Black",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 1,
      "M": 1,
      "L": 1
    },
    "totalUnits": 6,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr151",
    "ref": "TR151",
    "supplierCode": "209155 1700",
    "name": "True Religion Mesh Horseshoe Racer Tank Optic White",
    "description": "True Religion Mesh Horseshoe Racer Tank Optic White",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 1,
      "S": 1,
      "M": 1,
      "L": 1,
      "XL": 1
    },
    "totalUnits": 5,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr152",
    "ref": "TR152",
    "supplierCode": "209128 1001",
    "name": "True Religion Hs Bandeau Halter Crop Top Jet Black",
    "description": "True Religion Hs Bandeau Halter Crop Top Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr153",
    "ref": "TR153",
    "supplierCode": "209666 1700",
    "name": "True Religion Hs Bandeau Halter Crop Top Optic White",
    "description": "True Religion Hs Bandeau Halter Crop Top Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr154",
    "ref": "TR154",
    "supplierCode": "209128 3563",
    "name": "True Religion Hs Bandeau Halter Crop Top Daiquiri Green",
    "description": "True Religion Hs Bandeau Halter Crop Top Daiquiri Green",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "GREEN",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr155",
    "ref": "TR155",
    "supplierCode": "209366 1001",
    "name": "True Religion I Love Tr Classic Zip Hoodie Jet Black",
    "description": "True Religion I Love Tr Classic Zip Hoodie Jet Black",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr156",
    "ref": "TR156",
    "supplierCode": "209366 6713",
    "name": "True Religion I Love Tr Classic Zip Hoodie Sunkist Coral",
    "description": "True Religion I Love Tr Classic Zip Hoodie Sunkist Coral",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "CORAL",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr157",
    "ref": "TR157",
    "supplierCode": "209367 1001",
    "name": "True Religion I Love Tr Mr Fleece Shorts Jet Black",
    "description": "True Religion I Love Tr Mr Fleece Shorts Jet Black",
    "price": 999.57,
    "wholesalePrice": 999.57,
    "retailPrice": 2299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr158",
    "ref": "TR158",
    "supplierCode": "209367 6713",
    "name": "True Religion I Love Tr Mr Fleece Shorts Sunkist Coral",
    "description": "True Religion I Love Tr Mr Fleece Shorts Sunkist Coral",
    "price": 999.57,
    "wholesalePrice": 999.57,
    "retailPrice": 2299,
    "category": "female",
    "colour": "SUNKIST CORAL",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr159",
    "ref": "TR159",
    "supplierCode": "208887 1096",
    "name": "True Religion French Terry Ss Zip Up Jkt Black / White",
    "description": "True Religion French Terry Ss Zip Up Jkt Black / White",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr160",
    "ref": "TR160",
    "supplierCode": "208887 6217",
    "name": "True Religion French Terry Ss Zip Up Jkt Red / White",
    "description": "True Religion French Terry Ss Zip Up Jkt Red / White",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr161",
    "ref": "TR161",
    "supplierCode": "208888 1096",
    "name": "True Religion French Terry Hot Shorts Black / White",
    "description": "True Religion French Terry Hot Shorts Black / White",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "female",
    "colour": "BLACK-WHITE",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr162",
    "ref": "TR162",
    "supplierCode": "208888 8104",
    "name": "True Religion French Terry Hot Shorts Orange/Pink",
    "description": "True Religion French Terry Hot Shorts Orange/Pink",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "female",
    "colour": "ORANGE-PINK",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr163",
    "ref": "TR163",
    "supplierCode": "208888 6217",
    "name": "True Religion French Terry Hot Shorts Red / White",
    "description": "True Religion French Terry Hot Shorts Red / White",
    "price": 869.13,
    "wholesalePrice": 869.13,
    "retailPrice": 1999,
    "category": "female",
    "colour": "RED-WHITE",
    "gender": "WOMEN",
    "productCategory": "Shorts",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr164",
    "ref": "TR164",
    "supplierCode": "208889 1001",
    "name": "True Religion Strapless Rib Maxi Dress Jet Black",
    "description": "True Religion Strapless Rib Maxi Dress Jet Black",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr165",
    "ref": "TR165",
    "supplierCode": "208880 1001",
    "name": "True Religion Half Zip Cap Sleeve Rib Top Jet Black",
    "description": "True Religion Half Zip Cap Sleeve Rib Top Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr166",
    "ref": "TR166",
    "supplierCode": "208880 1700",
    "name": "True Religion Half Zip Cap Sleeve Rib Top Optic White",
    "description": "True Religion Half Zip Cap Sleeve Rib Top Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr167",
    "ref": "TR167",
    "supplierCode": "208880 6713",
    "name": "True Religion Half Zip Cap Sleeve Rib Top Sunkist Coral",
    "description": "True Religion Half Zip Cap Sleeve Rib Top Sunkist Coral",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "CORAL",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr168",
    "ref": "TR168",
    "supplierCode": "208880 6005",
    "name": "True Religion Half Zip Cap Sleeve Rib Top Flame Scarlet",
    "description": "True Religion Half Zip Cap Sleeve Rib Top Flame Scarlet",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr169",
    "ref": "TR169",
    "supplierCode": "208931 INCD",
    "name": "True Religion Rhinestone Becca Boot Supt Flp Indigo Twilight",
    "description": "True Religion Rhinestone Becca Boot Supt Flp Indigo Twilight",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "female",
    "colour": "INDIGO",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 4,
      "25": 4,
      "26": 4,
      "27": 4,
      "28": 4,
      "29": 4,
      "30": 4,
      "31": 3,
      "32": 2,
      "33": 2,
      "34": 2
    },
    "totalUnits": 37,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr170",
    "ref": "TR170",
    "supplierCode": "209161 IXTL",
    "name": "True Religion Becca Mr Bootcut Flap Lapis Light",
    "description": "True Religion Becca Mr Bootcut Flap Lapis Light",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "female",
    "colour": "LIGHT",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "26": 3,
      "28": 2,
      "32": 2,
      "33": 2,
      "34": 2
    },
    "totalUnits": 11,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr171",
    "ref": "TR171",
    "supplierCode": "209143 1001",
    "name": "True Religion Og Crystal Buddha Bby Crew Tee Jet Black",
    "description": "True Religion Og Crystal Buddha Bby Crew Tee Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr172",
    "ref": "TR172",
    "supplierCode": "209143 1700",
    "name": "True Religion Og Crystal Buddha Bby Crew Tee Optic White",
    "description": "True Religion Og Crystal Buddha Bby Crew Tee Optic White",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr173",
    "ref": "TR173",
    "supplierCode": "209143 6005",
    "name": "True Religion Og Crystal Buddha Bby Crew Tee Flame Scarlet",
    "description": "True Religion Og Crystal Buddha Bby Crew Tee Flame Scarlet",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr174",
    "ref": "TR174",
    "supplierCode": "208895 1001",
    "name": "True Religion Crystal Low Plunge Ss Tee Jet Black",
    "description": "True Religion Crystal Low Plunge Ss Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 2,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr175",
    "ref": "TR175",
    "supplierCode": "208895 1700",
    "name": "True Religion Crystal Low Plunge Ss Tee Optic White",
    "description": "True Religion Crystal Low Plunge Ss Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr176",
    "ref": "TR176",
    "supplierCode": "208895 6005",
    "name": "True Religion Crystal Low Plunge Ss Tee Flame Scarlet",
    "description": "True Religion Crystal Low Plunge Ss Tee Flame Scarlet",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr177",
    "ref": "TR177",
    "supplierCode": "209144 1001",
    "name": "True Religion Crystal Leopard Baby Tee Jet Black",
    "description": "True Religion Crystal Leopard Baby Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr178",
    "ref": "TR178",
    "supplierCode": "209144 1700",
    "name": "True Religion Crystal Leopard Baby Tee Optic White",
    "description": "True Religion Crystal Leopard Baby Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr179",
    "ref": "TR179",
    "supplierCode": "209146 1001",
    "name": "True Religion Embroidered Buddha Tee Jet Black",
    "description": "True Religion Embroidered Buddha Tee Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr180",
    "ref": "TR180",
    "supplierCode": "209146 1700",
    "name": "True Religion Embroidered Buddha Tee Optic White",
    "description": "True Religion Embroidered Buddha Tee Optic White",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr181",
    "ref": "TR181",
    "supplierCode": "209364 1702",
    "name": "True Religion Buddha Slash Neck Ss Tee Winter White",
    "description": "True Religion Buddha Slash Neck Ss Tee Winter White",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr182",
    "ref": "TR182",
    "supplierCode": "209364 1001",
    "name": "True Religion Buddha Slash Neck Ss Tee Jet Black",
    "description": "True Religion Buddha Slash Neck Ss Tee Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr183",
    "ref": "TR183",
    "supplierCode": "209364 6005",
    "name": "True Religion Buddha Slash Neck Ss Tee Flame Scarlet",
    "description": "True Religion Buddha Slash Neck Ss Tee Flame Scarlet",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr184",
    "ref": "TR184",
    "supplierCode": "208902 1001",
    "name": "True Religion Front Twist Cap Sleeve Top Jet Black",
    "description": "True Religion Front Twist Cap Sleeve Top Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr185",
    "ref": "TR185",
    "supplierCode": "208902 1700",
    "name": "True Religion Front Twist Cap Sleeve Top White",
    "description": "True Religion Front Twist Cap Sleeve Top White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr186",
    "ref": "TR186",
    "supplierCode": "208902 5407",
    "name": "True Religion Front Twist Cap Sleeve Top Fragrant Lilac",
    "description": "True Religion Front Twist Cap Sleeve Top Fragrant Lilac",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "LILAC",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr187",
    "ref": "TR187",
    "supplierCode": "208905 2142",
    "name": "True Religion Leopard Tr Contrast Cami Top Floral Leopard",
    "description": "True Religion Leopard Tr Contrast Cami Top Floral Leopard",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "FLORAL",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr188",
    "ref": "TR188",
    "supplierCode": "209147 1001",
    "name": "True Religion Lurex Buddha Zip Up Hoodie Jet Black",
    "description": "True Religion Lurex Buddha Zip Up Hoodie Jet Black",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr189",
    "ref": "TR189",
    "supplierCode": "209147 6005",
    "name": "True Religion Lurex Buddha Zip Up Hoodie Flame Scarlet",
    "description": "True Religion Lurex Buddha Zip Up Hoodie Flame Scarlet",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 2,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 12,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr190",
    "ref": "TR190",
    "supplierCode": "209168 1001",
    "name": "True Religion Lurex Buddha Straight Leg Pant Jet Black",
    "description": "True Religion Lurex Buddha Straight Leg Pant Jet Black",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Pants",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr191",
    "ref": "TR191",
    "supplierCode": "209168 6005",
    "name": "True Religion Lurex Buddha Straight Leg Pant Flame Scarlet",
    "description": "True Religion Lurex Buddha Straight Leg Pant Flame Scarlet",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Pants",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr192",
    "ref": "TR192",
    "supplierCode": "209148 1001",
    "name": "True Religion Patched Boyfriend Hoodie Jet Black",
    "description": "True Religion Patched Boyfriend Hoodie Jet Black",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr193",
    "ref": "TR193",
    "supplierCode": "209148 1501",
    "name": "True Religion Patched Boyfriend Hoodie Heather Grey",
    "description": "True Religion Patched Boyfriend Hoodie Heather Grey",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "GREY",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 1,
      "M": 3,
      "L": 3
    },
    "totalUnits": 10,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr194",
    "ref": "TR194",
    "supplierCode": "208924 4253",
    "name": "True Religion Tr Terry V Notch Hoodie Cerulean Blue",
    "description": "True Religion Tr Terry V Notch Hoodie Cerulean Blue",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr195",
    "ref": "TR195",
    "supplierCode": "208924 6005",
    "name": "True Religion Tr Terry V Notch Hoodie Flame Scarlet",
    "description": "True Religion Tr Terry V Notch Hoodie Flame Scarlet",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Hoodies And Sweaters",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr196",
    "ref": "TR196",
    "supplierCode": "208925 4253",
    "name": "True Religion Mr Joey Flare Terry Pants Cerulean Blue",
    "description": "True Religion Mr Joey Flare Terry Pants Cerulean Blue",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "Pants",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr197",
    "ref": "TR197",
    "supplierCode": "208925 6005",
    "name": "True Religion Mr Joey Flare Terry Pants Flame Scarlet",
    "description": "True Religion Mr Joey Flare Terry Pants Flame Scarlet",
    "price": 1130,
    "wholesalePrice": 1130,
    "retailPrice": 2599,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Pants",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr198",
    "ref": "TR198",
    "supplierCode": "209365 1001",
    "name": "True Religion Crystal Srs Logo Crew Tee Jet Black",
    "description": "True Religion Crystal Srs Logo Crew Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr199",
    "ref": "TR199",
    "supplierCode": "209365 1700",
    "name": "True Religion Crystal Srs Logo Crew Tee Optic White",
    "description": "True Religion Crystal Srs Logo Crew Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr200",
    "ref": "TR200",
    "supplierCode": "209365 4253",
    "name": "True Religion Crystal Srs Logo Crew Tee Cerulean Blue",
    "description": "True Religion Crystal Srs Logo Crew Tee Cerulean Blue",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 11,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr201",
    "ref": "TR201",
    "supplierCode": "209152 1096",
    "name": "True Religion Crystal Contrast Ringer Tee Black-White",
    "description": "True Religion Crystal Contrast Ringer Tee Black-White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK-WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr202",
    "ref": "TR202",
    "supplierCode": "209152 7008",
    "name": "True Religion Crystal Contrast Ringer Tee Yellow-Blue",
    "description": "True Religion Crystal Contrast Ringer Tee Yellow-Blue",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "YELLOW-BLUE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr203",
    "ref": "TR203",
    "supplierCode": "209152 1836",
    "name": "True Religion Crystal Contrast Ringer Tee White-Red",
    "description": "True Religion Crystal Contrast Ringer Tee White-Red",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE-RED",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr204",
    "ref": "TR204",
    "supplierCode": "208918 1001",
    "name": "True Religion Sporty Ss Raglan Ribbed Top Jet Black",
    "description": "True Religion Sporty Ss Raglan Ribbed Top Jet Black",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr205",
    "ref": "TR205",
    "supplierCode": "208918 1700",
    "name": "True Religion Sporty Ss Raglan Ribbed Top Optic White",
    "description": "True Religion Sporty Ss Raglan Ribbed Top Optic White",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr206",
    "ref": "TR206",
    "supplierCode": "208918 4253",
    "name": "True Religion Sporty Ss Raglan Ribbed Top Cerulean Blue",
    "description": "True Religion Sporty Ss Raglan Ribbed Top Cerulean Blue",
    "price": 477.83,
    "wholesalePrice": 477.83,
    "retailPrice": 1099,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr207",
    "ref": "TR207",
    "supplierCode": "208920 4903",
    "name": "True Religion Sporty Terry Polo Top Dress Blue",
    "description": "True Religion Sporty Terry Polo Top Dress Blue",
    "price": 738.7,
    "wholesalePrice": 738.7,
    "retailPrice": 1699,
    "category": "female",
    "colour": "DRESS BLUE",
    "gender": "WOMEN",
    "productCategory": "Golfers",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3
    },
    "totalUnits": 12,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr208",
    "ref": "TR208",
    "supplierCode": "208920 6005",
    "name": "True Religion Sporty Terry Polo Top Flame Scarlet",
    "description": "True Religion Sporty Terry Polo Top Flame Scarlet",
    "price": 738.7,
    "wholesalePrice": 738.7,
    "retailPrice": 1699,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Golfers",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr209",
    "ref": "TR209",
    "supplierCode": "209163 1001",
    "name": "True Religion Shrunken Nylon Track Jacket Jet Black",
    "description": "True Religion Shrunken Nylon Track Jacket Jet Black",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Jackets",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr210",
    "ref": "TR210",
    "supplierCode": "209163 6005",
    "name": "True Religion Shrunken Nylon Track Jacket Flame Scarle",
    "description": "True Religion Shrunken Nylon Track Jacket Flame Scarle",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Jackets",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr211",
    "ref": "TR211",
    "supplierCode": "209164 1001",
    "name": "True Religion Mr Nylon Track Pants Jet Black",
    "description": "True Religion Mr Nylon Track Pants Jet Black",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Pants",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr212",
    "ref": "TR212",
    "supplierCode": "209164 6005",
    "name": "True Religion Mr Nylon Track Pants Flame Scarlet",
    "description": "True Religion Mr Nylon Track Pants Flame Scarlet",
    "price": 1651.74,
    "wholesalePrice": 1651.74,
    "retailPrice": 3799,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Pants",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 1
    },
    "totalUnits": 13,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr213",
    "ref": "TR213",
    "supplierCode": "209650 IZCL",
    "name": "True Religion Jennie Mr Skinny Flap Sup T Blue Crystal",
    "description": "True Religion Jennie Mr Skinny Flap Sup T Blue Crystal",
    "price": 2390.87,
    "wholesalePrice": 2390.87,
    "retailPrice": 5499,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 31,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr214",
    "ref": "TR214",
    "supplierCode": "208959 IZHB",
    "name": "True Religion Jennie Mr Curvy Skny Flp Big T Midnight Sea",
    "description": "True Religion Jennie Mr Curvy Skny Flp Big T Midnight Sea",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "female",
    "colour": "MIDNIGHT SEA",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 31,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr215",
    "ref": "TR215",
    "supplierCode": "208962 IMMD",
    "name": "True Religion Becca Mr Bootcut Flap Big T Ocean Glow",
    "description": "True Religion Becca Mr Bootcut Flap Big T Ocean Glow",
    "price": 1260.43,
    "wholesalePrice": 1260.43,
    "retailPrice": 2899,
    "category": "female",
    "colour": "OCEAN GLOW",
    "gender": "WOMEN",
    "productCategory": "Jeans",
    "sizes": {
      "24": 3,
      "25": 3,
      "26": 3,
      "27": 3,
      "28": 3,
      "29": 3,
      "30": 3,
      "31": 3,
      "32": 3,
      "33": 2,
      "34": 2
    },
    "totalUnits": 31,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr216",
    "ref": "TR216",
    "supplierCode": "209651 1001",
    "name": "True Religion Crystal Rib Crop Tank Jet Black",
    "description": "True Religion Crystal Rib Crop Tank Jet Black",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr217",
    "ref": "TR217",
    "supplierCode": "209651 1700",
    "name": "True Religion Crystal Rib Crop Tank Optic White",
    "description": "True Religion Crystal Rib Crop Tank Optic White",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 2,
      "S": 3,
      "M": 2,
      "L": 1,
      "XL": 2
    },
    "totalUnits": 10,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr218",
    "ref": "TR218",
    "supplierCode": "209651 6005",
    "name": "True Religion Crystal Rib Crop Tank Flame Scarlet",
    "description": "True Religion Crystal Rib Crop Tank Flame Scarlet",
    "price": 564.78,
    "wholesalePrice": 564.78,
    "retailPrice": 1299,
    "category": "female",
    "colour": "SCARLET",
    "gender": "WOMEN",
    "productCategory": "Tops And Tanks",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr219",
    "ref": "TR219",
    "supplierCode": "209654 1001",
    "name": "True Religion Crystal Butterfly Ss Baby Tee Jet Black",
    "description": "True Religion Crystal Butterfly Ss Baby Tee Jet Black",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLACK",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 1,
      "S": 2,
      "M": 2,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 10,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr220",
    "ref": "TR220",
    "supplierCode": "209654 1700",
    "name": "True Religion Crystal Butterfly Ss Baby Tee Optic White",
    "description": "True Religion Crystal Butterfly Ss Baby Tee Optic White",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "WHITE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 1,
      "S": 2,
      "M": 2,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 10,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  },
  {
    "id": "tr221",
    "ref": "TR221",
    "supplierCode": "209654 4253",
    "name": "True Religion Crystal Butterfly Ss Baby Tee Cerulean Blue",
    "description": "True Religion Crystal Butterfly Ss Baby Tee Cerulean Blue",
    "price": 608.26,
    "wholesalePrice": 608.26,
    "retailPrice": 1399,
    "category": "female",
    "colour": "BLUE",
    "gender": "WOMEN",
    "productCategory": "T-Shirts",
    "sizes": {
      "XS": 3,
      "S": 3,
      "M": 3,
      "L": 3,
      "XL": 2
    },
    "totalUnits": 14,
    "image": "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/true-religion-1363f.firebasestorage.app/o/products%2FTR1%2F700217_1800_dtl1_1759254679143.jpg?alt=media"
    ]
  }
];
