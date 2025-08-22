import React, { Suspense } from 'react';
import BannerCarousel from '@/components/sections/BannerCarousel';
import NewArrivalsSection from '@/components/sections/NewArrivalsSection';
import TopProductsSection from '@/components/sections/TopProductsSection';

const Home = () => {
  return (
    <div className="relative">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        }>
        {/* Banner Carousel */}
        <BannerCarousel />
        
        {/* New Arrivals Section */}
        <NewArrivalsSection />
        
        {/* Top Products Section */}
        <TopProductsSection />
      </Suspense>
    </div>
  );
};

export default Home;