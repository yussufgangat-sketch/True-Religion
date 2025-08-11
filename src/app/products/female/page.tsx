import { products } from "@/data/products";

export default function FemaleProductsPage() {
  const female = products.filter((p) => p.category === "female");
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {female.map((p) => (
        <article key={p.id} className="border rounded p-4">
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-gray-600">{p.description}</p>
          <p className="mt-2 font-medium">${p.price.toFixed(2)}</p>
        </article>
      ))}
    </section>
  );
}


