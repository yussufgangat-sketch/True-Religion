"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { firebaseAuth as auth } from "@/lib/firebaseClient";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { User, ShoppingBag, Settings, LogOut, Package, Mail } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    if (!auth) {
      console.error("Firebase auth not available");
      return;
    }

    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-200 rounded-full p-3">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Menu</h2>
              <nav className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 px-4 py-3 bg-black text-white rounded-lg"
                >
                  <User className="h-5 w-5" />
                  <span>Profile Overview</span>
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>My Orders</span>
                </Link>
                <Link
                  href="/profile/settings"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Profile Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email Address
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {user.email}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Account Created
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {user.metadata?.creationTime ? 
                          new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 
                          'N/A'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Package className="inline w-4 h-4 mr-2" />
                        Account Status
                      </label>
                      <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                        Active
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Last Sign In
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                        {user.metadata?.lastSignInTime ? 
                          new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 
                          'N/A'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>



              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Welcome to True Religion!</p>
                      <p className="text-sm text-gray-600">Start exploring our collection</p>
                    </div>
                    <span className="text-xs text-gray-500">Just now</span>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent orders found.</p>
                    <Link
                      href="/products"
                      className="inline-block mt-2 text-sm text-black hover:text-gray-600 transition-colors"
                    >
                      Start shopping →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

