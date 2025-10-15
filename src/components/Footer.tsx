"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const router = useRouter();
  const { user } = useAuth();

  // Handle navigation to product pages with authentication check
  const handleProductNavigation = (e: React.MouseEvent, targetPath: string) => {
    e.preventDefault();
    if (user) {
      // User is signed in, navigate to the page
      router.push(targetPath);
    } else {
      // User is not signed in, redirect to login with intended destination
      const encodedPath = encodeURIComponent(targetPath);
      router.push(`/login?redirect=${encodedPath}`);
    }
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src="/true-religion-logo.png" 
                alt="True Religion Logo" 
                width={32} 
                height={32} 
                className="flex-shrink-0 object-contain" 
              />
              <span className="text-xl font-bold tracking-wider">TRUE RELIGION</span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium denim and apparel for the modern lifestyle. Discover authentic style with every stitch.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={(e) => handleProductNavigation(e, '/products')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleProductNavigation(e, '/products/male')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Men&apos;s Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleProductNavigation(e, '/products/female')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Women&apos;s Collection
                </button>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">079 298 8832</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-gray-400">yussuf@alcaponepremium.co.za</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-yellow-400" />
                <div>
                  <p className="text-gray-400">9:00 AM - 5:00 PM</p>
                  <p className="text-gray-500 text-sm">Monday - Friday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 True Religion. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Shipping Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
