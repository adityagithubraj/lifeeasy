import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Product {
  id: number;
  name: string;
  productId: string;
  brand: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
}

const TopProductsSection = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: 'Business Management Suite',
      productId: 'BMS-001',
      brand: 'LifeEasy',
      price: '₹ 2,500',
      originalPrice: '₹ 3,500',
      image: '/product1.jpeg',
      category: 'business',
      rating: 4.8,
      reviews: 124,
      discount: 29
    },
    {
      id: 2,
      name: 'Network Marketing Platform',
      productId: 'NMP-002',
      brand: 'LifeEasy',
      price: '₹ 3,800',
      originalPrice: '₹ 5,200',
      image: '/product2.jpeg',
      category: 'platform',
      rating: 4.9,
      reviews: 89,
      discount: 27
    },
    {
      id: 3,
      name: 'Commission Tracking System',
      productId: 'CTS-003',
      brand: 'LifeEasy',
      price: '₹ 1,500',
      originalPrice: '₹ 2,100',
      image: '/product1.jpeg',
      category: 'system',
      rating: 4.7,
      reviews: 156,
      discount: 29
    },
    {
      id: 4,
      name: 'Team Management Tool',
      productId: 'TMT-004',
      brand: 'LifeEasy',
      price: '₹ 2,200',
      originalPrice: '₹ 3,000',
      image: '/product2.jpeg',
      category: 'tool',
      rating: 4.6,
      reviews: 98,
      discount: 27
    },
    {
      id: 5,
      name: 'Analytics Dashboard Pro',
      productId: 'ADP-005',
      brand: 'LifeEasy',
      price: '₹ 4,500',
      originalPrice: '₹ 6,500',
      image: '/product1.jpeg',
      category: 'dashboard',
      rating: 4.9,
      reviews: 67,
      discount: 31
    },
    {
      id: 6,
      name: 'Business Growth Suite',
      productId: 'BGS-006',
      brand: 'LifeEasy',
      price: '₹ 6,800',
      originalPrice: '₹ 9,800',
      image: '/product2.jpeg',
      category: 'suite',
      rating: 4.8,
      reviews: 45,
      discount: 31
    },
    {
      id: 7,
      name: 'Automation Platform',
      productId: 'AP-007',
      brand: 'LifeEasy',
      price: '₹ 3,200',
      originalPrice: '₹ 4,500',
      image: '/product1.jpeg',
      category: 'platform',
      rating: 4.7,
      reviews: 112,
      discount: 29
    },
    {
      id: 8,
      name: 'Performance Tracker',
      productId: 'PT-008',
      brand: 'LifeEasy',
      price: '₹ 1,800',
      originalPrice: '₹ 2,600',
      image: '/product2.jpeg',
      category: 'tracker',
      rating: 4.6,
      reviews: 78,
      discount: 31
    },
    {
      id: 9,
      name: 'Compliance Management Tool',
      productId: 'CMT-009',
      brand: 'LifeEasy',
      price: '₹ 2,900',
      originalPrice: '₹ 4,200',
      image: '/product1.jpeg',
      category: 'tool',
      rating: 4.8,
      reviews: 93,
      discount: 31
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + 4);

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-foreground' : 'text-gray-800'}`}>
            Featured Products
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our most popular business solutions
          </p>
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full ${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border shadow-lg hover:shadow-xl transition-all duration-300 group`}
            aria-label="Previous products"
          >
            <ChevronLeft className={`h-6 w-6 ${theme === 'dark' ? 'text-foreground' : 'text-gray-600'} group-hover:text-blue-600 transition-colors`} />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full ${theme === 'dark' ? 'bg-card border-border' : 'bg-white border-gray-200'} border shadow-lg hover:shadow-xl transition-all duration-300 group`}
            aria-label="Next products"
          >
            <ChevronRight className={`h-6 w-6 ${theme === 'dark' ? 'text-foreground' : 'text-gray-600'} group-hover:text-blue-600 transition-colors`} />
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-6 px-12">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group cursor-pointer"
              >
                 <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                   {/* Discount Badge */}
                   {product.discount > 0 && (
                     <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                       {product.discount}% OFF
                     </div>
                   )}
                   
                   {/* Product Image */}
                   <div className="relative">
                     <div className="w-full h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                       <img 
                         src={product.image} 
                         alt={product.name}
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
                     {/* Product Name */}
                     <h3 className="text-sm font-bold mb-2 text-gray-800 leading-tight min-h-[2.5rem]">
                       {product.name}
                     </h3>
                     
                     {/* Brand */}
                     <p className="text-xs text-gray-500 mb-2">
                       {product.brand}
                     </p>
                     
                     {/* Rating and Reviews */}
                     <div className="flex items-center mb-2">
                       <div className="flex items-center">
                         {[...Array(5)].map((_, i) => (
                           <Star
                             key={i}
                             className={`h-3 w-3 ${
                               i < product.rating
                                 ? 'text-yellow-400 fill-current'
                                 : 'text-gray-300'
                             }`}
                           />
                         ))}
                       </div>
                       <span className="text-xs text-gray-600 ml-1">
                         ({product.reviews})
                       </span>
                     </div>
                     
                     {/* Price Section */}
                     <div className="mb-3">
                       {product.discount > 0 ? (
                         <div className="flex items-center space-x-2">
                           <span className="text-lg font-bold text-gray-800">
                             ₹{product.price.toLocaleString()}
                           </span>
                           <span className="text-sm text-gray-500 line-through">
                             ₹{product.originalPrice.toLocaleString()}
                           </span>
                         </div>
                       ) : (
                         <span className="text-lg font-bold text-gray-800">
                           ₹{product.price.toLocaleString()}
                         </span>
                       )}
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
        </motion.div>
      </div>
    </section>
  );
};

export default TopProductsSection; 