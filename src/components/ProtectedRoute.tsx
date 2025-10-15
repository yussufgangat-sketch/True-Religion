"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { firebaseAuth as auth } from '@/lib/firebaseClient';
import { onAuthStateChanged, User } from 'firebase/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('ProtectedRoute: Checking authentication...');
    
    if (!auth) {
      console.log('ProtectedRoute: No auth available, redirecting to login');
      setLoading(false);
      router.push('/login');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('ProtectedRoute: Auth state changed', { user: !!user });
      if (user) {
        console.log('ProtectedRoute: User authenticated, showing content');
        setUser(user);
        setLoading(false);
      } else {
        console.log('ProtectedRoute: No user, redirecting to login');
        setLoading(false);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

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

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
