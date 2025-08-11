export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "male" | "female";
};

export const products: Product[] = [
  { id: "m1", name: "Men's Slim Denim", description: "Classic dark wash.", price: 99, category: "male" },
  { id: "m2", name: "Men's Logo Tee", description: "Soft cotton tee.", price: 35, category: "male" },
  { id: "f1", name: "Women's Skinny Denim", description: "High rise fit.", price: 109, category: "female" },
  { id: "f2", name: "Women's Crop Tee", description: "Signature logo.", price: 39, category: "female" },
];


