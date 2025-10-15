"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { firebaseAuth as auth } from '@/lib/firebaseClient';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Pages that require authentication
const PROTECTED_PATHS = [
  '/profile',
  '/orders',
  '/cart',
  '/checkout',
  '/admin'
];

// Pages that should be accessible without authentication (even if under protected paths)
const PUBLIC_PATHS = [
  '/checkout/success'
];

// Pages that should redirect to home if already authenticated
const AUTH_PATHS = [
  '/login'
];

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log('AuthGuard: Checking authentication for path:', pathname);
    
    if (!auth) {
      console.log('AuthGuard: No auth available');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthGuard: Auth state changed', { user: !!user, pathname });
      setUser(user);
      setLoading(false);

      // Handle protected paths
      if (PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
        // Check if this is a public path that should be accessible without auth
        const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));
        if (!user && !isPublicPath) {
          console.log('AuthGuard: Redirecting to login from protected path');
          const encodedPath = encodeURIComponent(pathname);
          router.push(`/login?redirect=${encodedPath}`);
        }
      }

      // Handle auth paths (login page)
      if (AUTH_PATHS.some(path => pathname.startsWith(path))) {
        if (user) {
          console.log('AuthGuard: Redirecting to home from auth path');
          router.push('/');
        }
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // For protected paths, only show content if user is authenticated
  if (PROTECTED_PATHS.some(path => pathname.startsWith(path)) && !user) {
    // Check if this is a public path that should be accessible without auth
    const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));
    if (!isPublicPath) {
      return null;
    }
  }

  // For auth paths, only show content if user is NOT authenticated
  if (AUTH_PATHS.some(path => pathname.startsWith(path)) && user) {
    return null;
  }

  return <>{children}</>;
}
