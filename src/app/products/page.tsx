import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/products/male" className="border rounded p-6 hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Male</h2>
          <p>Shop men’s denim, tees, and more.</p>
        </Link>
        <Link href="/products/female" className="border rounded p-6 hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Female</h2>
          <p>Shop women’s denim, tops, and more.</p>
        </Link>
      </div>
    </div>
  );
}


