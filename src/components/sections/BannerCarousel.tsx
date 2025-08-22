import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  gradient: string;
  icon: React.ReactNode;
}

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: 'MLM Software Solutions',
      subtitle: 'Network Marketing Excellence',
      description: 'Transform your MLM business with our comprehensive software platform designed for network marketing success and growth.',
      image: "/logo.jpeg",
      cta: 'Explore Solutions',
      ctaLink: "/solutions",
      gradient: "from-blue-600/20 via-purple-600/20 to-cyan-600/20",
      icon: <Users className="w-16 h-16 text-white" />
    },
    {
      id: 2,
      title: 'Commission Tracking',
      subtitle: 'Smart Business Growth',
      description: 'Track commissions, manage downlines, and optimize your MLM business with our advanced analytics and reporting tools.',
      image: "/logo.jpeg",
      cta: 'View Products',
      ctaLink: "/store",
      gradient: "from-green-600/20 via-teal-600/20 to-blue-600/20",
      icon: <TrendingUp className="w-16 h-16 text-white" />
    },
    {
      id: 3,
      title: 'Secure MLM Platform',
      subtitle: 'Trust & Reliability',
      description: 'Build your network marketing empire on our secure, scalable platform with enterprise-grade security and compliance.',
      image: "/logo.jpeg",
      cta: 'Learn More',
      ctaLink: "/about",
      gradient: "from-orange-600/20 via-red-600/20 to-pink-600/20",
      icon: <Shield className="w-16 h-16 text-white" />
    },
    {
      id: 4,
      title: 'MLM Automation',
      subtitle: 'Powerful Performance',
      description: 'Automate your MLM operations with our cutting-edge software that streamlines processes and maximizes efficiency.',
      image: "/logo.jpeg",
      cta: 'Get Started',
      ctaLink: "/contact",
      gradient: "from-purple-600/20 via-indigo-600/20 to-blue-600/20",
      icon: <Zap className="w-16 h-16 text-white" />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, currentSlide]);

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 mlm-banner-overlay opacity-20" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F57C00' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3Cg fill='%23FF9800' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={bannerSlides[currentSlide].image}
                alt={bannerSlides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${bannerSlides[currentSlide].gradient}`} />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content - Left Side Layout */}
            <div className="relative z-10 flex items-end h-full">
              <div className="container mx-auto px-4 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-end">
                  {/* Left Column - Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white"
                  >
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight text-left">
                      {bannerSlides[currentSlide].title}
                    </h1>
                    <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-primary-foreground/90 text-left">
                      {bannerSlides[currentSlide].subtitle}
                    </h2>
                    <p className="text-base lg:text-lg mb-6 text-white/80 max-w-lg leading-relaxed text-left">
                      {bannerSlides[currentSlide].description}
                    </p>
                    <Button 
                      size="lg" 
                      className="text-base px-6 py-3 group bg-[#F57C00] hover:bg-[#E67100] text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 mlm-button-glow"
                      onClick={() => window.location.href = bannerSlides[currentSlide].ctaLink}
                    >
                      {bannerSlides[currentSlide].cta}
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>

                  {/* Right Column - Visual Element with Logo and Icon */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hidden lg:flex items-center justify-center"
                  >
                    <div className="relative">
                      <div className="w-64 h-64 mlm-logo-container backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6">
                        {/* Logo */}
                        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-white/30">
                          <img 
                            src="/logo.jpeg" 
                            alt="MLM Software Logo" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Icon */}
                        <div className="mb-3 mlm-icon-glow">
                          {bannerSlides[currentSlide].icon}
                        </div>
                        <p className="text-center text-white/90 text-sm font-medium mlm-gradient-text">
                          Innovation Hub
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-6 right-6 z-20 text-white/80 text-sm font-medium">
          {currentSlide + 1} / {bannerSlides.length}
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel; 