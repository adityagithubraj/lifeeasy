import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface NewProduct {
  id: number;
  name: string;
  itemCode: string;
  quantity: string;
  mrp: number;
  image: string;
  category: string;
}

const NewArrivalsSection = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const newProducts: NewProduct[] = [
    {
      id: 1,
      name: 'Pack Of 2 Herbal Toothpaste',
      itemCode: 'HBPRCEWS00007',
      quantity: '2 Pcs',
      mrp: 200,
      image: '/product1.jpeg',
      category: 'toothpaste'
    },
    {
      id: 2,
      name: 'New Buy 4 Glass Skin Set Get 1 Set Free 40 Pcs',
      itemCode: 'HBPBCCOM00096N',
      quantity: '40 Pcs',
      mrp: 23528,
      image: '/product2.jpeg',
      category: 'skincare'
    },
    {
      id: 3,
      name: 'Hair Serum',
      itemCode: 'HBPBCEZC00012',
      quantity: '50 ml',
      mrp: 549,
      image: '/product1.jpeg',
      category: 'haircare'
    },
    {
      id: 4,
      name: 'Hair Shampoo',
      itemCode: 'HBPBCEZC00011',
      quantity: '250 ml',
      mrp: 569,
      image: '/product2.jpeg',
      category: 'haircare'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, newProducts.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, newProducts.length - 3)) % Math.max(1, newProducts.length - 3));
  };

  const visibleProducts = newProducts.slice(currentIndex, currentIndex + 4);

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
            New Arrivals
          </h2>
          <p className="text-lg text-gray-600">
            Add new arrivals to your weekly lineup!
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
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Next products"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
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
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  {/* New Badge */}
                  <div className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    New
                  </div>
                  
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
                    
                    {/* Item Code and Quantity Row */}
                    <div className="flex justify-between items-center mb-2 text-xs text-gray-600">
                      <span>Item Code: {product.itemCode}</span>
                      <span>{product.quantity}</span>
                    </div>
                    
                    {/* MRP Price */}
                    <p className="text-lg font-bold mb-3 text-gray-800">
                      MRP. {product.mrp.toLocaleString()}
                    </p>
                    
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

export default NewArrivalsSection; 