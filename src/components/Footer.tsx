import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Want to become a True member?</h3>
            <p className="text-gray-300 mb-6">
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
            <p className="text-sm mt-4 text-gray-400">✨ SUBSCRIBE TO RECEIVE A 10% DISCOUNT ✨</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* True Religion Brand */}
          <div>
            <h4 className="text-xl font-bold mb-4">True Religion</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Search</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Our Stores</Link></li>
              <li><Link href="/wholesale" className="hover:text-white transition-colors">Wholesale Login</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@truereligionsa.co.za" className="hover:text-white transition-colors">
                  info@truereligionsa.co.za
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+27630365115" className="hover:text-white transition-colors">
                  +27 63 036 5115
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>83 Rivonia Road, Sandhurst</p>
                  <p>Sandton Gauteng</p>
                  <p>2196 South Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/truereligion"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/truereligion"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/truereligion"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xl font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms Of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns/Refunds Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>Powered by Shopify © 2025, True Religion</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
