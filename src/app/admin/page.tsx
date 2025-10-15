'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import Link from 'next/link';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCMie_AlhASlMyLvsFHX270H82JSogzgV8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'true-religion-1363f.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'true-religion-1363f',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'true-religion-1363f.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '889271935394',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:889271935394:web:74ef8072cdf1fc3877d2fb',
};

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalInventory: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalInventory: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Load users
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const usersSnapshot = await getDocs(usersQuery);
      const totalUsers = usersSnapshot.size;
      const activeUsers = usersSnapshot.docs.filter(doc => doc.data().isActive).length;

      // Load orders
      const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const ordersSnapshot = await getDocs(ordersQuery);
      const totalOrders = ordersSnapshot.size;

      // Load inventory
      const inventoryQuery = query(collection(db, 'inventory'));
      const inventorySnapshot = await getDocs(inventoryQuery);
      const totalInventory = inventorySnapshot.size;

      setStats({
        totalUsers,
        totalOrders,
        totalInventory,
        activeUsers
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Orders',
      description: 'View and manage customer orders',
      href: '/admin/orders',
      icon: '📋',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      href: '/admin/users',
      icon: '👥',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Inventory',
      description: 'View and manage product stock levels',
      href: '/admin/inventory',
      icon: '📦',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Upload Images',
      description: 'Upload individual product images',
      href: '/admin/upload-images',
      icon: '🖼️',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your True Religion e-commerce platform with powerful tools and insights
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">👥</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeUsers}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">✅</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">📋</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Inventory Items</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalInventory}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">📦</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600 mt-2">Access essential admin functions</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <span className="text-white text-3xl">{action.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-gray-600 mt-2">Latest platform activity</p>
          </div>
          <div className="p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Activity</h3>
              <p className="text-gray-600">Activity will appear here as users interact with the platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

