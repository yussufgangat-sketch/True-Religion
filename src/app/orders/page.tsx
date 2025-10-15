"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { firebaseAuth as auth } from "@/lib/firebaseClient";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { ArrowLeft, Package, ShoppingBag, Calendar, MapPin, CreditCard } from "lucide-react";
import { db } from "@/lib/firebaseClient";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  ref?: string;
  colour?: string;
  supplierCode?: string;
}

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  address?: string;
  city?: string;
  postalCode?: string;
  createdAt: string;
  timestamp: number;
}

export default function OrdersPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const router = useRouter();

  // Fetch orders from Firebase using user-order linking
  const fetchOrders = async (userEmail: string) => {
    console.log("🔍 Fetching orders for user:", userEmail);
    console.log("🔍 Database instance:", db);
    
    if (!db) {
      console.error("❌ Firestore not initialized");
      setOrdersLoading(false);
      return;
    }

    if (!userEmail) {
      console.error("❌ No user email provided");
      setOrdersLoading(false);
      return;
    }

    setOrdersLoading(true);
    try {
      console.log("🔍 Creating user-order links query...");
      
      // First, get user-order links (without orderBy to avoid index requirement)
      const userOrderLinksQuery = query(
        collection(db, "user_order_links"),
        where("userId", "==", userEmail)
      );
      
      console.log("🔍 Executing user-order links query...");
      const linksSnapshot = await getDocs(userOrderLinksQuery);
      console.log("🔍 User-order links found:", linksSnapshot.size);
      
      const ordersData: Order[] = [];
      
      // Sort links by timestamp manually (descending)
      const sortedLinks = linksSnapshot.docs.sort((a, b) => {
        const timestampA = a.data().timestamp || 0;
        const timestampB = b.data().timestamp || 0;
        return timestampB - timestampA;
      });
      
      // For each link, fetch the full order details
      for (const linkDoc of sortedLinks) {
        const linkData = linkDoc.data();
        console.log("🔍 Processing link:", linkData);
        
        // Fetch the full order from true_religion_orders
        const orderQuery = query(
          collection(db, "true_religion_orders"),
          where("orderId", "==", linkData.orderId)
        );
        
        const orderSnapshot = await getDocs(orderQuery);
        
        if (!orderSnapshot.empty) {
          const orderDoc = orderSnapshot.docs[0];
          const orderData = orderDoc.data();
          
          console.log("🔍 Found full order:", orderDoc.id, orderData);
          ordersData.push({
            id: orderDoc.id,
            ...orderData
          } as Order);
        }
      }
      
      console.log("🔍 Total orders found:", ordersData.length);
      setOrders(ordersData);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      console.error("❌ Firebase Auth not initialized");
      router.push("/login");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setUser(user);
          setLoading(false);
          // Fetch orders for the authenticated user
          if (user.email) {
            fetchOrders(user.email);
          } else {
            console.error("❌ User has no email");
            setOrdersLoading(false);
          }
        } else {
          console.log("🔍 No authenticated user, redirecting to login");
          router.push("/login");
        }
      } catch (error) {
        console.error("❌ Error in auth state change:", error);
        setLoading(false);
        setOrdersLoading(false);
      }
    });

    return () => {
      try {
        unsubscribe();
      } catch (error) {
        console.error("❌ Error unsubscribing from auth:", error);
      }
    };
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  try {
    return (
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="bg-gray-200 rounded-full p-3">
              <Package className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600">Track your order history</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {ordersLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="space-y-6">
            {/* No Orders State */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">
                Start shopping to see your order history here
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderId}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">R{order.total.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-xs text-gray-600">Size: {item.size}</p>
                              <span className="text-xs text-gray-400">•</span>
                              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                              {item.ref && (
                                <>
                                  <span className="text-xs text-gray-400">•</span>
                                  <p className="text-xs text-gray-600">REF: {item.ref}</p>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">R{item.price.toFixed(2)}</p>
                            <p className="text-xs text-gray-600">each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    {order.address && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Shipping Address</p>
                            <p className="text-sm text-gray-600">
                              {order.address}
                              {order.city && `, ${order.city}`}
                              {order.postalCode && `, ${order.postalCode}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Order Summary */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium text-gray-900">R{order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-gray-600">Shipping:</span>
                        <span className="font-medium text-gray-900">R{order.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-base font-semibold mt-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-gray-900">R{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    );
  } catch (error) {
    console.error("❌ Error rendering orders page:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">There was an error loading your orders.</p>
          <Link
            href="/profile"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }
}
