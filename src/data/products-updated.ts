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

export const products: Product[] = [

];