"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { ArrowLeft, Package, Calendar, MapPin, User, Mail, Phone, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  retailPrice: number;
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
  customerPhone?: string;
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
  notes?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Fetch orders from Firebase
  const fetchOrders = async () => {
    if (!db) {
      console.error("❌ Firestore not initialized");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("🔍 Fetching orders from admin database...");
      
      // Query orders collection with sorting
      const ordersQuery = query(
        collection(db, "true_religion_orders"),
        orderBy("timestamp", "desc")
      );
      
      const querySnapshot = await getDocs(ordersQuery);
      const ordersData: Order[] = [];
      
      querySnapshot.forEach((doc) => {
        try {
          const orderData = doc.data();
          ordersData.push({
            id: doc.id,
            ...orderData
          } as Order);
        } catch (docError) {
          console.error("❌ Error processing order document:", doc.id, docError);
        }
      });
      
      console.log("🔍 Total orders found:", ordersData.length);
      setOrders(ordersData);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      setOrders([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      fetchOrders();
    } catch (error) {
      console.error("❌ Error in useEffect:", error);
      setLoading(false);
    }
  }, []);

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    const statusMatch = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
    const searchMatch = searchQuery === "" || 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + (order.total || 0), 0);
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status.toLowerCase() === status.toLowerCase()).length;
  };

  // Show delete confirmation modal
  const showDeleteOrderModal = (orderId: string) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      console.log(`🔄 Updating order ${orderId} status to ${newStatus}`);
      
      const response = await fetch('/api/admin/update-order-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      
      if (response.ok) {
        // Update the order in state
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        ));
        
        // Update selected order if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        
        console.log('✅ Order status updated successfully');
      } else {
        const error = await response.json();
        console.error('❌ Error updating order status:', error);
        alert('Failed to update order status. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Delete individual order
  const deleteOrder = async (orderId: string) => {
    setDeletingOrder(orderId);
    try {
      const response = await fetch('/api/admin/delete-order', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        // Remove order from local state
        setOrders(orders.filter(order => order.id !== orderId));
        console.log('✅ Order deleted successfully');
      } else {
        const error = await response.json();
        console.error('❌ Error deleting order:', error);
        alert('Failed to delete order. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeletingOrder(null);
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
    }
  };

  // Delete all orders
  const deleteAllOrders = async () => {
    if (!confirm('Are you sure you want to delete ALL orders? This action cannot be undone and will reset the total revenue to R0.00.')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/delete-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete-all' }),
      });

      if (response.ok) {
        const result = await response.json();
        setOrders([]); // Clear all orders from state
        setShowDeleteAllConfirm(false);
        console.log('✅ All orders deleted successfully:', result.message);
        alert(`Successfully deleted ${result.deletedOrders} orders. Total revenue is now R0.00.`);
      } else {
        const error = await response.json();
        console.error('❌ Error deleting all orders:', error);
        alert('Failed to delete all orders. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error deleting all orders:', error);
      alert('Failed to delete all orders. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="bg-gray-200 rounded-full p-3">
                <Package className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-600">Manage all customer orders</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Refresh
              </button>
              {orders.length > 0 && (
                <button
                  onClick={() => setShowDeleteAllConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete All Orders
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">R{(getTotalRevenue() || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 bg-white"
            >
              <option value="all" className="text-gray-900 bg-white">All Status</option>
              <option value="pending" className="text-gray-900 bg-white">Pending</option>
              <option value="processing" className="text-gray-900 bg-white">Processing</option>
              <option value="shipped" className="text-gray-900 bg-white">Shipped</option>
              <option value="delivered" className="text-gray-900 bg-white">Delivered</option>
              <option value="completed" className="text-gray-900 bg-white">Completed</option>
              <option value="cancelled" className="text-gray-900 bg-white">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Orders ({filteredOrders.length})
            </h3>
          </div>
          
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            Order #{order.orderId}
                          </h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="h-4 w-4 mr-1" />
                              {order.customerName}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 mr-1" />
                              {order.customerEmail}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(order.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">R{(order.total || 0).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-gray-400 hover:text-black transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={() => showDeleteOrderModal(order.id)}
                        disabled={deletingOrder === order.id}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete Order"
                      >
                        {deletingOrder === order.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order #{selectedOrder.orderId}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Close"
                  aria-label="Close order details"
                >
                  <svg className="w-6 h-6 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              <div className="p-6 space-y-8">
              {/* Order Status & Quick Actions */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Total:</span>
                      <span className="text-lg font-bold text-gray-900">R{(selectedOrder.total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                        disabled={updatingStatus === selectedOrder.id}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium pr-8 appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="pending" className="text-gray-900 bg-white">Pending</option>
                        <option value="processing" className="text-gray-900 bg-white">Processing</option>
                        <option value="shipped" className="text-gray-900 bg-white">Shipped</option>
                        <option value="completed" className="text-gray-900 bg-white">Completed</option>
                        <option value="cancelled" className="text-gray-900 bg-white">Cancelled</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const orderId = selectedOrder.id;
                        setSelectedOrder(null);
                        showDeleteOrderModal(orderId);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-600" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Full Name</p>
                    <p className="text-gray-900 font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Email Address</p>
                    <p className="text-gray-900 font-medium">{selectedOrder.customerEmail}</p>
                  </div>
                  {selectedOrder.customerPhone && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-600">Phone Number</p>
                      <p className="text-gray-900 font-medium">{selectedOrder.customerPhone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              {selectedOrder.address && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-1">
                      <p className="text-gray-900 font-medium">{selectedOrder.address}</p>
                      {selectedOrder.city && <p className="text-gray-900">{selectedOrder.city}</p>}
                      {selectedOrder.postalCode && <p className="text-gray-900">{selectedOrder.postalCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-gray-600" />
                  Order Items ({selectedOrder.items.length})
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 shadow-sm">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-lg mb-2">{item.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Size</p>
                            <p className="font-medium text-gray-900">{item.size}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Quantity</p>
                            <p className="font-medium text-gray-900">{item.quantity}</p>
                          </div>
                          {item.ref && (
                            <div>
                              <p className="text-gray-600">Reference</p>
                              <p className="font-medium text-gray-900">{item.ref}</p>
                            </div>
                          )}
                          {item.colour && (
                            <div>
                              <p className="text-gray-600">Color</p>
                              <p className="font-medium text-gray-900">{item.colour}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-3 flex space-x-8 text-sm">
                          <div className="flex-1">
                            <p className="text-gray-600 mb-1">Wholesale Price (ex VAT)</p>
                            <p className="font-semibold text-gray-900">R{(item.wholesalePrice || 0).toFixed(2)}</p>
                          </div>
                          {item.retailPrice && (
                            <div className="flex-1">
                              <p className="text-gray-600 mb-1">Recommended Retail Price</p>
                              <p className="font-semibold text-red-600">R{(item.retailPrice || 0).toFixed(2)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Order Summary
                </h3>
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal ({selectedOrder.items.length} items):</span>
                    <span className="font-semibold text-gray-900">R{(selectedOrder.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold text-gray-900">R{(selectedOrder.shipping || 0).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                      <span className="text-xl font-bold text-gray-900">R{(selectedOrder.total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Orders Confirmation Modal */}
      {showDeleteAllConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete All Orders
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete all {orders.length} orders? This action cannot be undone and will reset the total revenue to R0.00.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteAllConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteAllOrders}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Order Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Order
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setOrderToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => orderToDelete && deleteOrder(orderToDelete)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  } catch (error) {
    console.error("❌ Error rendering admin orders page:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">There was an error loading the admin orders page.</p>
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }
}
