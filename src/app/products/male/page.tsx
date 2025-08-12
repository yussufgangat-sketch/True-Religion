import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function MaleProductsPage() {
  const maleProducts = products.filter(product => product.category === "male");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{"MEN'S COLLECTION"}</h1>
          <p className="text-xl text-gray-300">
            Premium denim, tees, and outerwear for the modern man
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {maleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


