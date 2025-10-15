"use client";

import { useState, useEffect } from 'react';
import { getAllInventory, updateStock, InventoryItem } from '@/lib/inventory';
import { 
  Search, Package, AlertTriangle, CheckCircle, Edit3, Save, X, 
  Filter, Download, Upload, Plus, Trash2, Eye, TrendingUp, 
  TrendingDown, BarChart3, RefreshCw, Settings
} from 'lucide-react';

export default function InventoryManagementPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [saving, setSaving] = useState<string | null>(null);
  
  // Enhanced state for better functionality
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('ref');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    filterAndSortInventory();
  }, [inventory, searchTerm, selectedStatus, sortBy, sortOrder]);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await getAllInventory();
      setInventory(data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortInventory = () => {
    let filtered = inventory.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = item.ref.toLowerCase().includes(searchLower) ||
                           item.productId.toLowerCase().includes(searchLower) ||
                           item.size.toLowerCase().includes(searchLower) ||
                           (item.supplierCode && item.supplierCode.toLowerCase().includes(searchLower));
      
      const matchesStatus = selectedStatus === 'all' ||
                           (selectedStatus === 'in-stock' && item.available > 5) ||
                           (selectedStatus === 'low-stock' && item.available > 0 && item.available <= 5) ||
                           (selectedStatus === 'out-of-stock' && item.available <= 0);
      
      return matchesSearch && matchesStatus;
    });

    // Sort the filtered results with multi-level sorting
    filtered.sort((a, b) => {
      // Helper function to get size order index
      const getSizeIndex = (size: string) => {
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40', '42', '44', '46', '48'];
        const index = sizeOrder.indexOf(size);
        return index !== -1 ? index : sizeOrder.length; // Put unknown sizes at the end
      };
      
      let primaryComparison = 0;
      let secondaryComparison = 0;
      
      switch (sortBy) {
        case 'ref':
          // Primary sort by REF, secondary sort by size (ascending)
          primaryComparison = a.ref.localeCompare(b.ref);
          if (primaryComparison === 0) {
            // Same REF, sort by size in ascending order
            secondaryComparison = getSizeIndex(a.size) - getSizeIndex(b.size);
          }
          break;
        case 'size':
          // Primary sort by size, secondary sort by REF
          const aSizeIndex = getSizeIndex(a.size);
          const bSizeIndex = getSizeIndex(b.size);
          primaryComparison = aSizeIndex - bSizeIndex;
          if (primaryComparison === 0) {
            // Same size, sort by REF
            secondaryComparison = a.ref.localeCompare(b.ref);
          }
          break;
        case 'quantity':
          primaryComparison = a.quantity - b.quantity;
          if (primaryComparison === 0) {
            // Same quantity, sort by REF then size
            secondaryComparison = a.ref.localeCompare(b.ref);
            if (secondaryComparison === 0) {
              secondaryComparison = getSizeIndex(a.size) - getSizeIndex(b.size);
            }
          }
          break;
        case 'available':
          primaryComparison = a.available - b.available;
          if (primaryComparison === 0) {
            // Same availability, sort by REF then size
            secondaryComparison = a.ref.localeCompare(b.ref);
            if (secondaryComparison === 0) {
              secondaryComparison = getSizeIndex(a.size) - getSizeIndex(b.size);
            }
          }
          break;
        default:
          // Default to REF sorting with size as secondary
          primaryComparison = a.ref.localeCompare(b.ref);
          if (primaryComparison === 0) {
            secondaryComparison = getSizeIndex(a.size) - getSizeIndex(b.size);
          }
      }
      
      // Apply sort order to primary comparison
      if (sortOrder === 'desc') {
        primaryComparison = -primaryComparison;
      }
      
      // Return primary comparison, or secondary if primary is equal
      return primaryComparison !== 0 ? primaryComparison : secondaryComparison;
    });

    setFilteredInventory(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item.id);
    setEditQuantity(item.quantity);
  };

  const handleSave = async (item: InventoryItem) => {
    try {
      setSaving(item.id);
      const success = await updateStock(item.productId, item.size, editQuantity);
      
      if (success) {
        await loadInventory(); // Reload inventory
        setEditingItem(null);
        setEditQuantity(0);
      } else {
        alert('Failed to update stock');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error updating stock');
    } finally {
      setSaving(null);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditQuantity(0);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.size === paginatedItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedItems.map(item => item.id)));
    }
  };

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleBulkUpdate = async (newQuantity: number) => {
    try {
      setLoading(true);
      const promises = Array.from(selectedItems).map(itemId => {
        const item = inventory.find(i => i.id === itemId);
        return item ? updateStock(item.productId, item.size, newQuantity) : Promise.resolve(false);
      });
      
      await Promise.all(promises);
      await loadInventory();
      setSelectedItems(new Set());
      setBulkEditMode(false);
    } catch (error) {
      console.error('Error in bulk update:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportInventory = () => {
    const csvContent = [
      ['REF', 'Supplier Code', 'Size', 'Total Stock', 'Reserved', 'Available', 'Status'].join(','),
      ...filteredInventory.map(item => [
        item.ref,
        item.supplierCode || item.productId, // Use supplierCode if available, fallback to productId
        item.size,
        item.quantity,
        item.reserved,
        item.available,
        getStockStatus(item).status
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.available <= 0) return { status: 'out', color: 'text-red-600', bg: 'bg-red-50' };
    if (item.available <= 5) return { status: 'low', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const getStockIcon = (item: InventoryItem) => {
    if (item.available <= 0) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (item.available <= 5) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredInventory.slice(startIndex, endIndex);

  // Enhanced stats calculation
  const totalItems = inventory.length;
  const outOfStock = inventory.filter(item => item.available <= 0).length;
  const lowStock = inventory.filter(item => item.available > 0 && item.available <= 5).length;
  const inStock = inventory.filter(item => item.available > 5).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * 100), 0); // Assuming R100 per item average
  const reservedItems = inventory.reduce((sum, item) => sum + item.reserved, 0);
  const availableItems = inventory.reduce((sum, item) => sum + item.available, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-2">
                Inventory Management
              </h1>
              <p className="text-gray-600 text-lg">Track and manage product stock levels with advanced analytics</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={loadInventory}
                className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button
                onClick={exportInventory}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalItems.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Across all products</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">In Stock</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{inStock.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{availableItems.toLocaleString()} available</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{lowStock.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">≤ 5 items remaining</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{outOfStock.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{reservedItems.toLocaleString()} reserved</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Controls */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by REF, Product ID, or Size..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              
              {/* Filters and Controls */}
              <div className="flex items-center space-x-4">
                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 shadow-sm hover:shadow-md transition-shadow"
                >
                  <option value="all" className="text-gray-900 bg-white">All Status</option>
                  <option value="in-stock" className="text-gray-900 bg-white">In Stock</option>
                  <option value="low-stock" className="text-gray-900 bg-white">Low Stock</option>
                  <option value="out-of-stock" className="text-gray-900 bg-white">Out of Stock</option>
                </select>
                
                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 shadow-sm hover:shadow-md transition-shadow"
                >
                  <option value="ref" className="text-gray-900 bg-white">Sort by REF</option>
                  <option value="size" className="text-gray-900 bg-white">Sort by Size</option>
                  <option value="quantity" className="text-gray-900 bg-white">Sort by Quantity</option>
                  <option value="available" className="text-gray-900 bg-white">Sort by Available</option>
                </select>
                
                {/* Sort Order */}
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
                  title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                >
                  {sortOrder === 'asc' ? <TrendingUp className="h-4 w-4 text-gray-700" /> : <TrendingDown className="h-4 w-4 text-gray-700" />}
                </button>
                
                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-3 rounded-l-lg transition-colors ${
                      viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-3 rounded-r-lg transition-colors ${
                      viewMode === 'cards' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Package className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bulk Actions */}
            {bulkEditMode && selectedItems.size > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-medium">
                    {selectedItems.size} item(s) selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="New quantity"
                      min="0"
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 shadow-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          handleBulkUpdate(parseInt(input.value) || 0);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="New quantity"]') as HTMLInputElement;
                        if (input) handleBulkUpdate(parseInt(input.value) || 0);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update All
                    </button>
                    <button
                      onClick={() => {
                        setBulkEditMode(false);
                        setSelectedItems(new Set());
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Inventory Display */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Inventory Items ({filteredInventory.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setBulkEditMode(!bulkEditMode)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      bulkEditMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {bulkEditMode ? 'Exit Bulk Edit' : 'Bulk Edit'}
                  </button>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <option value={25} className="text-gray-900 bg-white">25 per page</option>
                    <option value={50} className="text-gray-900 bg-white">50 per page</option>
                    <option value={100} className="text-gray-900 bg-white">100 per page</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {bulkEditMode && (
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedItems.size === paginatedItems.length && paginatedItems.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('ref')}>
                      <div className="flex items-center space-x-1">
                        <span>Product</span>
                        {sortBy === 'ref' && (
                          sortOrder === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('size')}>
                      <div className="flex items-center space-x-1">
                        <span>Size</span>
                        {sortBy === 'size' && (
                          sortOrder === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('quantity')}>
                      <div className="flex items-center space-x-1">
                        <span>Total Stock</span>
                        {sortBy === 'quantity' && (
                          sortOrder === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserved</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('available')}>
                      <div className="flex items-center space-x-1">
                        <span>Available</span>
                        {sortBy === 'available' && (
                          sortOrder === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedItems.map((item) => {
                    const stockStatus = getStockStatus(item);
                    const isSelected = selectedItems.has(item.id);
                    return (
                      <tr key={item.id} className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
                        {bulkEditMode && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectItem(item.id)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.ref}</div>
                            <div className="text-sm text-gray-500">{item.productId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {editingItem === item.id ? (
                            <input
                              type="number"
                              value={editQuantity}
                              onChange={(e) => setEditQuantity(parseInt(e.target.value) || 0)}
                              className="w-20 px-2 py-1 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900 shadow-sm"
                              min="0"
                            />
                          ) : (
                            <span className="font-medium">{item.quantity}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="font-medium">{item.reserved}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="font-medium">{item.available}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                            {getStockIcon(item)}
                            <span className="ml-1">
                              {stockStatus.status === 'out' ? 'Out of Stock' :
                               stockStatus.status === 'low' ? 'Low Stock' : 'In Stock'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {editingItem === item.id ? (
                              <>
                                <button
                                  onClick={() => handleSave(item)}
                                  disabled={saving === item.id}
                                  className="text-green-600 hover:text-green-900 disabled:opacity-50 p-1"
                                  title="Save changes"
                                >
                                  {saving === item.id ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                  ) : (
                                    <Save className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-red-600 hover:text-red-900 p-1"
                                  title="Cancel editing"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Edit quantity"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedItems.map((item) => {
              const stockStatus = getStockStatus(item);
              const isSelected = selectedItems.has(item.id);
              return (
                <div key={item.id} className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {bulkEditMode && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectItem(item.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      )}
                      <div className={`p-2 rounded-lg ${stockStatus.bg}`}>
                        {getStockIcon(item)}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                      {stockStatus.status === 'out' ? 'Out of Stock' :
                       stockStatus.status === 'low' ? 'Low Stock' : 'In Stock'}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.ref}</h3>
                    <p className="text-sm text-gray-500">{item.productId}</p>
                    <p className="text-sm font-medium text-gray-700 mt-2">Size: {item.size}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-lg font-bold text-gray-900">{item.quantity}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Reserved</p>
                      <p className="text-lg font-bold text-orange-600">{item.reserved}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Available</p>
                      <p className="text-lg font-bold text-green-600">{item.available}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    {editingItem === item.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(item)}
                          disabled={saving === item.id}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50 p-2"
                        >
                          {saving === item.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-900 p-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredInventory.length)} of {filteredInventory.length} items
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + Math.max(1, currentPage - 2);
                    if (page > totalPages) return null;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          page === currentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredInventory.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search terms or filters.' 
                : 'No products in inventory yet.'}
            </p>
            {(searchTerm || selectedStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

