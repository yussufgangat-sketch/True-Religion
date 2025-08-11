import Image from "next/image";
import truereligionsaImages from "../../../../public/truereligionsa-images.json";

export default function AllProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">DENIM COLLECTION</h1>
          <p className="text-xl text-gray-300">
            Explore our complete range of premium denim and accessories
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {truereligionsaImages.map((image, index) => (
              <div key={index} className="relative aspect-square bg-gray-100 overflow-hidden group">
                <Image
                  src={image}
                  alt={`True Religion Product ${index + 1}`}
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


