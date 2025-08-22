import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Cpu, Globe } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Cpu,
      title: 'Advanced Processing',
      description: 'Next-generation architecture delivering unprecedented performance',
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: 'Optimized power consumption without compromising performance',
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Built-in security features protecting critical operations',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Scalable solutions for worldwide deployment',
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 circuit-lines opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-neon bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card hover:shadow-glow-primary transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <feature.icon className="h-12 w-12 mx-auto text-primary group-hover:text-accent transition-colors duration-300" />
                    <div className="absolute inset-0 h-12 w-12 mx-auto bg-primary/20 rounded-full blur-lg group-hover:bg-accent/20 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;