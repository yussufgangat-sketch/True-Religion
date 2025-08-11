export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: "male" | "female" | "denim" | "accessories";
  image?: string;
  onSale?: boolean;
  salePercentage?: number;
};

export const products: Product[] = [
  // Men's Products
  {
    id: "m1",
    name: "True Religion Ricky Super T Body Rinse Black",
    description: "Classic Super T stitch denim with perfect fit.",
    price: 2699.50,
    originalPrice: 5399.00,
    category: "male",
    image: "https://truereligionsa.co.za/cdn/shop/files/17-9_1frt1.jpg?v=1732529237&width=1480",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "m2",
    name: "True Religion T-Shirt Relaxed Old Skool Semolina",
    description: "Comfortable relaxed fit t-shirt with classic logo.",
    price: 1099.50,
    originalPrice: 2199.00,
    category: "male",
    image: "https://truereligionsa.co.za/cdn/shop/files/6-22_mfrt1.jpg?v=1741784133",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "m3",
    name: "True Religion Rocco Inseam Body Rinse Black",
    description: "Skinny fit denim with signature stitching.",
    price: 1449.50,
    originalPrice: 3099.00,
    category: "male",
    image: "https://truereligionsa.co.za/cdn/shop/files/6-23_ldtl6.jpg?v=1741784147",
    onSale: true,
    salePercentage: 53,
  },
  {
    id: "m4",
    name: "True Religion Ricky Jeans Original Stitch Medium Wash",
    description: "Classic straight leg with original stitch design.",
    price: 1999.50,
    originalPrice: 3999.00,
    category: "male",
    image: "https://truereligionsa.co.za/cdn/shop/files/27-1_1frt1.jpg?v=1734606118",
    onSale: true,
    salePercentage: 50,
  },

  // Women's Products
  {
    id: "f1",
    name: "True Religion Big T Track Pants Ladies Flare Orchid Pink",
    description: "Comfortable flare track pants with Big T design.",
    price: 1549.50,
    originalPrice: 3099.00,
    category: "female",
    image: "https://truereligionsa.co.za/cdn/shop/files/6-3_wfrt1.jpg?v=1741784157",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "f2",
    name: "True Religion Raglan T-Shirt Ladies Baby Coal-Winter White",
    description: "Soft raglan t-shirt with comfortable fit.",
    price: 749.50,
    originalPrice: 1499.00,
    category: "female",
    image: "https://truereligionsa.co.za/cdn/shop/files/11-40_1frt1.jpg?v=1734604103",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "f3",
    name: "True Religion Rocco Jeans Skinny Dark Artic",
    description: "Skinny fit denim with dark wash finish.",
    price: 2349.50,
    originalPrice: 4699.00,
    category: "female",
    image: "https://truereligionsa.co.za/cdn/shop/files/11-35_1dtl1.jpg?v=1741856557",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "f4",
    name: "True Religion Relaxed Nu Brush Jet Black-Red Dahlia",
    description: "Relaxed fit with unique brush design.",
    price: 749.50,
    originalPrice: 1499.00,
    category: "female",
    image: "https://truereligionsa.co.za/cdn/shop/files/11-34_0frt1.jpg?v=1741782886",
    onSale: true,
    salePercentage: 50,
  },

  // Denim Products
  {
    id: "d1",
    name: "True Religion Ricky Super T Body Rinse Black",
    description: "Classic Super T stitch denim with perfect fit.",
    price: 2699.50,
    originalPrice: 5399.00,
    category: "denim",
    image: "https://truereligionsa.co.za/cdn/shop/files/17-9_1frt1.jpg?v=1732529237&width=1480",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "d2",
    name: "True Religion Rocco Inseam Body Rinse Black",
    description: "Skinny fit denim with signature stitching.",
    price: 1449.50,
    originalPrice: 3099.00,
    category: "denim",
    image: "https://truereligionsa.co.za/cdn/shop/files/6-23_ldtl6.jpg?v=1741784147",
    onSale: true,
    salePercentage: 53,
  },
  {
    id: "d3",
    name: "True Religion Ricky Jeans Original Stitch Medium Wash",
    description: "Classic straight leg with original stitch design.",
    price: 1999.50,
    originalPrice: 3999.00,
    category: "denim",
    image: "https://truereligionsa.co.za/cdn/shop/files/27-1_1frt1.jpg?v=1734606118",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "d4",
    name: "TRUE RELIGION JEANS ROCCO FLAP SN 32 INSEAM 2SB BODY RINSE BLACK",
    description: "Skinny fit with flap design and signature stitching.",
    price: 1549.50,
    originalPrice: 3099.00,
    category: "denim",
    image: "https://truereligionsa.co.za/cdn/shop/files/11-20_5frt1.jpg?v=1741782841",
    onSale: true,
    salePercentage: 50,
  },

  // Accessories
  {
    id: "a1",
    name: "True Religion Brand T-Shirt Optic White",
    description: "Classic brand t-shirt in optic white.",
    price: 899.50,
    originalPrice: 1799.00,
    category: "accessories",
    image: "https://truereligionsa.co.za/cdn/shop/files/11-41_0frt1.jpg?v=1741782919",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "a2",
    name: "True Religion Anniversary Baby T-Shirt Jet Black",
    description: "Anniversary edition baby t-shirt in jet black.",
    price: 649.50,
    originalPrice: 1299.00,
    category: "accessories",
    image: "https://truereligionsa.co.za/cdn/shop/files/11-29_0dtl1.jpg?v=1734604047",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "a3",
    name: "True Religion Belt Red Outline Buckle Black",
    description: "Classic belt with red outline buckle design.",
    price: 899.50,
    originalPrice: 1799.00,
    category: "accessories",
    image: "https://truereligionsa.co.za/cdn/shop/files/TR_Bag.jpg?v=1714638265&width=1480",
    onSale: true,
    salePercentage: 50,
  },
  {
    id: "a4",
    name: "True Religion Crossbody Bag",
    description: "Stylish crossbody bag with signature logo.",
    price: 1299.50,
    originalPrice: 2599.00,
    category: "accessories",
    image: "https://truereligionsa.co.za/cdn/shop/files/6-10_bfrt1.jpg?v=1741784044",
    onSale: true,
    salePercentage: 50,
  },
];


