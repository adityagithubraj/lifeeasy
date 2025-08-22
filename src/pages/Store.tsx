import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import PageWrapper from '@/components/layout/PageWrapper';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  code: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  category: string;
  availability: 'in-stock' | 'out-of-stock';
}

const Store = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: 1,
      code: 'MLM-001',
      brand: 'LifeEasy',
      price: 2500,
      description: 'MLM Software Solution - Complete Network Marketing Platform',
      image: '/product1.jpeg',
      category: 'software',
      availability: 'in-stock'
    },
    {
      id: 2,
      code: 'MLM-002',
      brand: 'LifeEasy',
      price: 3800,
      description: 'Network Marketing Platform - Advanced Business Management',
      image: '/product2.jpeg',
      category: 'platform',
      availability: 'in-stock'
    },
    {
      id: 3,
      code: 'MLM-003',
      brand: 'LifeEasy',
      price: 1500,
      description: 'Commission Tracking System - Automated Payment Processing',
      image: '/product1.jpeg',
      category: 'system',
      availability: 'in-stock'
    },
    {
      id: 4,
      code: 'MLM-004',
      brand: 'LifeEasy',
      price: 2200,
      description: 'Downline Management Tool - Team Performance Analytics',
      image: '/product2.jpeg',
      category: 'tool',
      availability: 'in-stock'
    },
    {
      id: 5,
      code: 'MLM-005',
      brand: 'LifeEasy',
      price: 4500,
      description: 'MLM Analytics Dashboard - Business Intelligence Suite',
      image: '/product1.jpeg',
      category: 'dashboard',
      availability: 'in-stock'
    },
    {
      id: 6,
      code: 'MLM-006',
      brand: 'LifeEasy',
      price: 6800,
      description: 'Business Growth Suite - Complete MLM Solution',
      image: '/product2.jpeg',
      category: 'suite',
      availability: 'in-stock'
    },
    {
      id: 7,
      code: 'MLM-007',
      brand: 'LifeEasy',
      price: 3200,
      description: 'Automation Platform - Streamlined Operations',
      image: '/product1.jpeg',
      category: 'platform',
      availability: 'in-stock'
    },
    {
      id: 8,
      code: 'MLM-008',
      brand: 'LifeEasy',
      price: 1800,
      description: 'Performance Tracker - Real-time Monitoring',
      image: '/product2.jpeg',
      category: 'tracker',
      availability: 'out-of-stock'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'software', name: 'Software', icon: '💻' },
    { id: 'platform', name: 'Platform', icon: '🚀' },
    { id: 'system', name: 'System', icon: '⚙️' },
    { id: 'tool', name: 'Tool', icon: '🔧' },
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'suite', name: 'Suite', icon: '📦' },
    { id: 'tracker', name: 'Tracker', icon: '📈' }
  ];

  const brands = [
    { name: 'LifeEasy', count: 8 }
  ];

  const filteredProducts = products.filter(product => {
    if (hideOutOfStock && product.availability === 'out-of-stock') return false;
    if (searchQuery && !product.code.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  return (
    <PageWrapper>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              MLM Software Store
            </h1>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Browse our comprehensive collection of MLM software solutions and tools
            </p>
          </div>

          {/* Top Header Bar */}
          <div className={`p-4 rounded-lg mb-6 ${
            theme === 'dark' ? 'bg-black' : 'bg-white'
          } shadow-sm`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Product Count */}
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {filteredProducts.length} Product(s)
              </div>

              {/* Right Side Controls */}
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search MLM software..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-4 pr-10 py-2 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* View Toggles */}
                <div className="flex rounded-lg border overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="featured">Sort By: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white border-blue-500'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:w-64 space-y-6">
              {/* Categories Filter */}
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-black' : 'bg-white'
              } shadow-sm`}>
                <h3 className={`font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Categories
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      All Products
                    </span>
                  </label>
                </div>
              </div>

              {/* Brand Filter */}
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-black' : 'bg-white'
              } shadow-sm`}>
                <h3 className={`font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Brand
                </h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                        />
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {brand.name}
                        </span>
                      </div>
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        ({brand.count})
                      </span>
                    </label>
                  ))}
                  <button className={`text-sm text-blue-500 hover:text-blue-600 ${
                    theme === 'dark' ? 'hover:text-blue-400' : ''
                  }`}>
                    + See All
                  </button>
                </div>
              </div>

              {/* Availability Filter */}
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-black' : 'bg-white'
              } shadow-sm`}>
                <h3 className={`font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Availability
                </h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hideOutOfStock}
                    onChange={(e) => setHideOutOfStock(e.target.checked)}
                    className="mr-2"
                  />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Hide Out of Stock
                  </span>
                </label>
              </div>

              {/* Price Range Filter */}
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-black' : 'bg-white'
              } shadow-sm`}>
                <h3 className={`font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      ₹ {priceRange[0]}
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      ₹ {priceRange[1]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Main Product Grid */}
            <div className="flex-1">
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                      {/* Product Image */}
                      <div className="relative">
                        <div className="w-full h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <img
                            src={product.image}
                            alt={product.code}
                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          {/* Fallback placeholder */}
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-xs hidden">
                            {product.category}
                          </div>
                        </div>
                        {/* Image overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent group-hover:from-black/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="p-4">
                        {/* Product Code */}
                        <div className="text-sm font-medium text-blue-600 mb-1">
                          {product.code}
                        </div>
                        
                        {/* Brand */}
                        <div className="text-sm text-gray-500 mb-2">
                          {product.brand}
                        </div>
                        
                        {/* Price */}
                        <div className="text-lg font-bold mb-2 text-gray-800">
                          ₹ {product.price.toFixed(2)}
                        </div>
                        
                        {/* Description */}
                        <div className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-300">
                          + Add To Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className={`text-center py-12 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <p>No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Store;