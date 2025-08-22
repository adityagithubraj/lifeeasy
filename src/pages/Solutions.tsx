import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import PageWrapper from '@/components/layout/PageWrapper';

const Solutions = () => {
  const { t } = useLanguage();

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-neon bg-clip-text text-transparent">
            {t('nav.solutions')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Coming soon - our comprehensive semiconductor solutions portfolio.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Solutions;