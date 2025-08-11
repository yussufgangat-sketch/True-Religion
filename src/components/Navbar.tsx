"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2 text-center text-sm">
        <p>🎉 SALE: UP TO 50% OFF SELECTED ITEMS 🎉</p>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-black">
              TRUE RELIGION
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className={cn("hover:text-gray-600 transition-colors", {
                  "text-red-600": pathname === "/",
                })}
              >
                HOME
              </Link>
              <Link
                href="/products"
                className={cn("hover:text-gray-600 transition-colors", {
                  "text-red-600": pathname?.startsWith("/products"),
                })}
              >
                SHOP
              </Link>
              <Link
                href="/products/male"
                className={cn("hover:text-gray-600 transition-colors", {
                  "text-red-600": pathname?.startsWith("/products/male"),
                })}
              >
                MEN
              </Link>
              <Link
                href="/products/female"
                className={cn("hover:text-gray-600 transition-colors", {
                  "text-red-600": pathname?.startsWith("/products/female"),
                })}
              >
                WOMEN
              </Link>
              <Link
                href="/products/all"
                className={cn("hover:text-gray-600 transition-colors", {
                  "text-red-600": pathname?.startsWith("/products/all"),
                })}
              >
                DENIM
              </Link>
              <Link
                href="/about"
                className={cn("hover:text-gray-600 transition-colors", {
                  "text-red-600": pathname?.startsWith("/about"),
                })}
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className={cn("hover:text-gray-600 transition-colors", {
                  "text-red-600": pathname?.startsWith("/contact"),
                })}
              >
                CONTACT
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* User Account */}
              <Link
                href="/login"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Shopping Bag */}
              <Link
                href="/checkout"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-t border-gray-200">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/"
                className="block py-2 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/products"
                className="block py-2 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                href="/products/male"
                className="block py-2 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                MEN
              </Link>
              <Link
                href="/products/female"
                className="block py-2 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                WOMEN
              </Link>
              <Link
                href="/products/all"
                className="block py-2 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                DENIM
              </Link>
              <Link
                href="/about"
                className="block py-2 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className="block py-2 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
