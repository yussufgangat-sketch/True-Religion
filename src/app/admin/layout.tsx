'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { firebaseAuth as auth } from '@/lib/firebaseClient';

interface User {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: firebaseUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (firebaseUser?.email) {
        try {
          const response = await fetch('/api/auth/check-admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: firebaseUser.email }),
          });

          const data = await response.json();
          if (data.isAdmin) {
            setAdminUser(data.user);
          } else {
            // User is not admin, redirect to home
            router.push('/');
            return;
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          router.push('/');
          return;
        }
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [firebaseUser, router]);

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setAdminUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!firebaseUser) {
    router.push('/login');
    return null;
  }

  // Redirect to home if user is not admin
  if (firebaseUser && !adminUser && !loading) {
    router.push('/');
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', current: pathname === '/admin' },
    { name: 'Orders', href: '/admin/orders', current: pathname === '/admin/orders' },
    { name: 'Users', href: '/admin/users', current: pathname === '/admin/users' },
    { name: 'Inventory', href: '/admin/inventory', current: pathname === '/admin/inventory' },
    { name: 'Upload Images', href: '/admin/upload-images', current: pathname === '/admin/upload-images' },
    { name: 'Firebase Upload', href: '/admin/firebase-upload', current: pathname === '/admin/firebase-upload' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="text-xl font-bold text-red-600">
                  TRUE RELIGION ADMIN
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.current
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {adminUser?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        {children}
      </main>
    </div>
  );
}

