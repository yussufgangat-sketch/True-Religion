"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, User, Menu, X, LogOut, Settings, Phone, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { firebaseAuth as auth } from "@/lib/firebaseClient";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, loading } = useAuth();
  const { state } = useCart();

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);


  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.email) {
        try {
          const response = await fetch('/api/auth/check-admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
          });
          const data = await response.json();
          setIsAdmin(data.isAdmin || false);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleSignOut = async () => {
    if (!auth) {
      console.error("Firebase auth not available");
      return;
    }

    try {
      await signOut(auth);
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Handle navigation to login for product pages (only when not authenticated)
  const handleProductNavigation = (e: React.MouseEvent, targetPath: string) => {
    e.preventDefault();
    if (user) {
      // User is signed in, navigate to the actual page
      router.push(targetPath);
    } else {
      // User is not signed in, redirect to login with intended destination
      const encodedPath = encodeURIComponent(targetPath);
      router.push(`/login?redirect=${encodedPath}`);
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to determine active category based on current path
  const getActiveCategory = () => {
    if (typeof window === 'undefined') return null;
    
    const path = window.location.pathname;
    
    // Check for exact path matches first
    if (path === '/products/male' || path.startsWith('/products/male/')) {
      return "male";
    }
    
    if (path === '/products/female' || path.startsWith('/products/female/')) {
      return "female";
    }
    
    return null;
  };

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Update active category when pathname changes
  useEffect(() => {
    const category = getActiveCategory();
    setActiveCategory(category);
  }, [pathname]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-[99999]">
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 hover:text-gray-700 transition-colors">
            <Image src="/true-religion-logo.png" alt="True Religion Logo" width={28} height={28} className="flex-shrink-0 object-contain md:w-8 md:h-8" />
            <span className="text-lg md:text-2xl font-bold text-black tracking-wider">TRUE RELIGION</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={cn("text-sm font-medium transition-colors tracking-wide", {
                "text-black border-b-2 border-black": pathname === "/",
                "text-gray-600 hover:text-black": pathname !== "/",
              })}
            >
              HOME
            </Link>
            <button
              onClick={(e) => handleProductNavigation(e, '/products')}
              className={cn("text-sm font-medium transition-colors tracking-wide", {
                "text-black border-b-2 border-black": pathname === "/products",
                "text-gray-600 hover:text-black": pathname !== "/products",
              })}
            >
              SHOP ALL
            </button>
            <button
              onClick={(e) => handleProductNavigation(e, '/products/male')}
              className={cn("text-sm font-medium transition-colors tracking-wide", {
                "text-black border-b-2 border-black": activeCategory === "male",
                "text-gray-600 hover:text-black": activeCategory !== "male",
              })}
            >
              MEN
            </button>
            <button
              onClick={(e) => handleProductNavigation(e, '/products/female')}
              className={cn("text-sm font-medium transition-colors tracking-wide", {
                "text-black border-b-2 border-black": activeCategory === "female",
                "text-gray-600 hover:text-black": activeCategory !== "female",
              })}
            >
              WOMEN
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-sm mx-6">
            <SearchBar />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Contact Support */}
            <Link
              href="/contact"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Contact Support"
            >
              <Phone className="h-5 w-5 text-gray-700" />
            </Link>

            {/* User Account */}
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button 
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-1"
                    >
                      <User className="h-5 w-5 text-gray-700" />
                      <span className="text-xs text-gray-600 hidden sm:block">{user.email?.split('@')[0]}</span>
                    </button>
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.email}</p>
                          <p className="text-xs text-gray-500">Signed in</p>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="h-4 w-4 mr-3" />
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <ShoppingBag className="h-4 w-4 mr-3" />
                          My Orders
                        </Link>
                        <Link
                          href="/profile/settings"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin/inventory"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-2"
                          >
                            <Shield className="h-4 w-4 mr-3" />
                            Admin Panel
                          </Link>
                        )}
                        <div className="border-t border-gray-100 mt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <User className="h-5 w-5 text-gray-700" />
                  </Link>
                )}
              </>
            )}

            {/* Shopping Bag */}
            <Link
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          {/* Mobile Search Bar */}
          <div className="px-4 py-3 border-b border-gray-200">
            <SearchBar />
          </div>
          <div className="px-4 py-6 space-y-1">
            <Link
              href="/"
              className="block py-3 transition-colors text-sm font-medium text-gray-700 hover:text-black border-b border-gray-100"
              onClick={closeMobileMenu}
            >
              HOME
            </Link>
            <button
              onClick={(e) => {
                handleProductNavigation(e, '/products');
                closeMobileMenu();
              }}
              className="block py-3 transition-colors text-sm font-medium text-gray-700 hover:text-black border-b border-gray-100 w-full text-left"
            >
              SHOP ALL
            </button>
            <button
              onClick={(e) => {
                handleProductNavigation(e, '/products/male');
                closeMobileMenu();
              }}
              className={cn("block py-3 transition-colors text-sm font-medium border-b border-gray-100 w-full text-left", {
                "text-black font-semibold": activeCategory === "male",
                "text-gray-700 hover:text-black": activeCategory !== "male",
              })}
            >
              MEN
            </button>
            <button
              onClick={(e) => {
                handleProductNavigation(e, '/products/female');
                closeMobileMenu();
              }}
              className={cn("block py-3 transition-colors text-sm font-medium border-b border-gray-100 w-full text-left", {
                "text-black font-semibold": activeCategory === "female",
                "text-gray-700 hover:text-black": activeCategory !== "female",
              })}
            >
              WOMEN
            </button>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block py-3 transition-colors text-sm font-medium text-gray-700 hover:text-black border-b border-gray-100"
                  onClick={closeMobileMenu}
                >
                  MY PROFILE
                </Link>
                <Link
                  href="/cart"
                  className="block py-3 transition-colors text-sm font-medium text-gray-700 hover:text-black border-b border-gray-100 flex items-center justify-between"
                  onClick={closeMobileMenu}
                >
                  <span>CART</span>
                  {cartItemCount > 0 && (
                    <span className="bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin/inventory"
                    className="block py-3 transition-colors text-sm font-medium text-red-600 hover:text-red-800 border-b border-gray-100"
                    onClick={closeMobileMenu}
                  >
                    ADMIN PANEL
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMobileMenu();
                  }}
                  className="block w-full text-left py-3 transition-colors text-sm font-medium text-red-600 hover:text-red-800"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-3 transition-colors text-sm font-medium text-gray-700 hover:text-black border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
