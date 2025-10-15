import { products, Product } from "@/data/products";

export interface Category {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

// Get unique categories for a specific gender
export const getCategoriesForGender = (gender: "male" | "female"): Category[] => {
  const categoryCounts: { [key: string]: number } = {};
  
  // Count products per category for the specified gender
  products
    .filter(product => product.category === gender)
    .forEach(product => {
      const category = product.productCategory;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
  
  // Convert to Category objects and sort by count (most popular first)
  const categories = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
      icon: getCategoryIcon(name)
    }))
    .sort((a, b) => b.count - a.count);
  
  return categories;
};

// Get all unique categories across both genders
export const getAllCategories = (): Category[] => {
  const categoryCounts: { [key: string]: number } = {};
  
  products.forEach(product => {
    const category = product.productCategory;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  
  const categories = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count,
      icon: getCategoryIcon(name)
    }))
    .sort((a, b) => b.count - a.count);
  
  return categories;
};

// Get icon for category (you can customize these)
const getCategoryIcon = (categoryName: string): string => {
  const iconMap: { [key: string]: string } = {
    'Jeans': '👖',
    'T-Shirts': '👕',
    'Shorts': '🩳',
    'Golfers': '🏌️',
    'Jackets': '🧥',
    'Hoodies And Sweaters': '🧣',
    'Pants': '👖',
    'Joggers And Swetpants': '👟',
    'Tops And Tanks': '👚',
    'Skirts': '👗'
  };
  
  return iconMap[categoryName] || '👕';
};

// Filter products by category and gender
export const filterProductsByCategory = (
  allProducts: Product[],
  category: string | null,
  gender: "male" | "female" | "all"
): Product[] => {
  let filtered = allProducts;
  
  // Filter by gender
  if (gender !== "all") {
    filtered = filtered.filter((product: Product) => product.category === gender);
  }
  
  // Filter by category
  if (category) {
    // Convert category ID back to original case for comparison
    const originalCategory = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Special handling for T-shirts to convert back to T-Shirts
    const finalCategory = originalCategory === 'T Shirts' ? 'T-Shirts' : originalCategory;
    
    filtered = filtered.filter((product: Product) => product.productCategory === finalCategory);
  }
  
  return filtered;
};
