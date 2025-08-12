import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import truereligionsaImages from "../../public/truereligionsa-images.json";

export default function Home() {
  // Get some featured images from the scraped collection
  const featuredImages = truereligionsaImages.slice(0, 8);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src={featuredImages[0] || "/next.svg"}
          alt="True Religion Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              TRUE RELIGION
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Premium denim and apparel for the modern lifestyle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/male"
                className="bg-white text-black px-8 py-4 font-semibold hover:bg-gray-100 transition-colors"
              >
                SHOP MEN
              </Link>
              <Link
                href="/products/female"
                className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-black transition-colors"
              >
                SHOP WOMEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <section className="bg-red-600 text-white py-4 text-center">
        <p className="text-lg font-semibold">
          🎉 SALE: UP TO 50% OFF SELECTED ITEMS 🎉
        </p>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">SHOP BY CATEGORY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Men's Category */}
            <Link href="/products/male" className="group">
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <Image
                  src={featuredImages[1] || "/next.svg"}
                  alt={"Men's Collection"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">MEN</h3>
                  <p className="text-sm">Denim • Tees • Outerwear</p>
                </div>
              </div>
            </Link>

            {/* Women's Category */}
            <Link href="/products/female" className="group">
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <Image
                  src={featuredImages[2] || "/next.svg"}
                  alt={"Women's Collection"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">WOMEN</h3>
                  <p className="text-sm">Denim • Tees • Active</p>
                </div>
              </div>
            </Link>

            {/* Denim Category */}
            <Link href="/products/all" className="group">
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <Image
                  src={featuredImages[3] || "/next.svg"}
                  alt="Denim Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">DENIM</h3>
                  <p className="text-sm">Skinny • Straight • Relaxed</p>
                </div>
              </div>
            </Link>

            {/* Accessories Category */}
            <Link href="/products/all" className="group">
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <Image
                  src={featuredImages[4] || "/next.svg"}
                  alt="Accessories"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">ACCESSORIES</h3>
                  <p className="text-sm">Bags • Belts • More</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">FEATURED PRODUCTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white group">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={product.image || "/next.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 text-sm font-semibold">
                    SALE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-bold">${product.price}</span>
                      <span className="text-gray-400 line-through">${Math.round(product.price * 1.5)}</span>
                    </div>
                    <button className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">WANT TO BE A TRUE MEMBER?</h2>
          <p className="text-xl mb-8">
            Subscribe to True Religion&apos;s mailing list for exclusive access to the latest trends, and special offers!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-sm mt-4">✨ SUBSCRIBE TO RECEIVE A 10% DISCOUNT ✨</p>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">FOLLOW US @TRUERELIGION</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredImages.slice(5, 11).map((image, index) => (
              <div key={index} className="relative h-64 bg-gray-100 overflow-hidden group">
                <Image
                  src={image}
                  alt={`True Religion ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
