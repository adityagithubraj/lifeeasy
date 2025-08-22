import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import PageWrapper from '@/components/layout/PageWrapper';
import IndustriesServedSection from '@/components/sections/IndustriesServedSection';
import VisionMissionSection from '@/components/sections/VisionMissionSection';
import AwardsTrophiesSection from '@/components/sections/AwardsTrophiesSection';

const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className={`container mx-auto px-4 py-16 relative ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className={`text-5xl lg:text-7xl font-bold mb-6 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {t('about.title') || 'About Us'}
          </h1>
          <p className={`text-xl lg:text-2xl max-w-4xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('about.description.full') || 'We aim to provide a full-stack supply chain management solution for both our customers and suppliers.'}
          </p>
          <p className={`text-lg mt-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {t('about.ranking') || 'Ranked one of the largest electronic components distributors in India.'}
          </p>
        </motion.div>
      </div>

      {/* Industries Served Section */}
      <IndustriesServedSection />

      {/* Vision & Mission Section */}
      <VisionMissionSection />

      {/* Awards & Trophies Section */}
      <AwardsTrophiesSection />

      {/* Additional About Content */}
      <div className={`container mx-auto px-4 py-16 relative ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Company Mission */}
            <div className="space-y-6">
              <h2 className={`text-3xl font-bold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {t('about.mission.title') || 'Our Mission'}
              </h2>
              <p className={`text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('about.mission.description') || 'To revolutionize the semiconductor industry by providing innovative solutions that drive technological advancement and sustainable growth.'}
              </p>
            </div>

            {/* Company Vision */}
            <div className="space-y-6">
              <h2 className={`text-3xl font-bold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {t('about.vision.title') || 'Our Vision'}
              </h2>
              <p className={`text-lg leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('about.vision.description') || 'To be the leading global partner in semiconductor solutions, empowering innovation across industries and shaping the future of technology.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default About;