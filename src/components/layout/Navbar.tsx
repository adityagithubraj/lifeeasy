import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { User, ShoppingCart } from 'lucide-react';
import ProfileSidebar from './ProfileSidebar';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  console.log('Navbar rendering');

  const navItems = [
    { key: 'nav.home', href: '/', label: 'Home' },
    { key: 'nav.about', href: '/about', label: 'About Us' },
    { key: 'nav.solutions', href: '/solutions', label: 'Solutions' },
    { key: 'nav.store', href: '/store', label: 'Store' },
    { key: 'nav.blog', href: '/blog', label: 'Blog' },
    // { key: 'nav.blog.manage', href: '/blog/manage', label: 'Blog Management' },
    { key: 'nav.contact', href: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden mlm-navbar-logo">
                <img 
                  src="/logo.jpeg" 
                  alt="MLM Software Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-[#F57C00]/20 to-[#FF9800]/20 rounded-full blur-lg group-hover:from-[#F57C00]/30 group-hover:to-[#FF9800]/30 transition-all duration-300" />
            </div>
            <span className="text-xl font-bold mlm-navbar-brand">
            lifeeasy.in
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground transition-all duration-300 hover:bg-primary/10 relative group"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-neon group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Theme Toggle & CTA */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Profile Icon */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 relative group"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-neon group-hover:w-full transition-all duration-300" />
            </button>
            
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 relative group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Cart Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-neon group-hover:w-full transition-all duration-300" />
            </Link>
            
            <Button variant="default" className="btn-hero hidden md:inline-flex">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-foreground">
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-current" />
                <div className="w-5 h-0.5 bg-current" />
                <div className="w-5 h-0.5 bg-current" />
              </div>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Profile Sidebar */}
      <ProfileSidebar 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
};

export default Navbar;