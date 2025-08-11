import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden bg-white rounded shadow-sm hover:shadow-md transition-shadow">
      {product.image && (
        <div className="relative w-full aspect-[3/4] bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          {/* Sale Badge */}
          {product.onSale && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-sm font-semibold">
              SAVE {product.salePercentage}%
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-lg">
              R {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                R {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
            ADD TO CART
          </button>
        </div>
      </div>
    </article>
  );
}


