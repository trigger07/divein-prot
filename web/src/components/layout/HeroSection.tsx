"use client";

import React from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import HeroCarousel from './HeroCarousel';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  useCarousel?: boolean;
}

/**
 * Componente para la sección de héroe en la página principal
 * Muestra un carrusel moderno o un hero estático según la configuración
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  className = '',
  useCarousel = true,
}) => {
  const { t } = useTranslation();
  
  // Usar traducciones para título y subtítulo si no se proporcionan como props
  const heroTitle = title || t('home.hero.title');
  const heroSubtitle = subtitle || t('home.hero.subtitle');
  
  // Datos para el carrusel
  const heroSlides = [
    {
      id: '1',
      title: t('home.hero.slides.adventure.title'),
      subtitle: t('home.hero.slides.adventure.subtitle'),
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ctaText: t('home.hero.slides.adventure.cta'),
      ctaLink: '/experiences?category=adventure',
    },
    {
      id: '2',
      title: t('home.hero.slides.gastronomy.title'),
      subtitle: t('home.hero.slides.gastronomy.subtitle'),
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ctaText: t('home.hero.slides.gastronomy.cta'),
      ctaLink: '/experiences?category=gastronomy',
    },
    {
      id: '3',
      title: t('home.hero.slides.cultural.title'),
      subtitle: t('home.hero.slides.cultural.subtitle'),
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      ctaText: t('home.hero.slides.cultural.cta'),
      ctaLink: '/experiences?category=cultural',
    }
  ];

  return (
    <>
      {useCarousel ? (
        <HeroCarousel slides={heroSlides} className={className} />
      ) : (
        <section className={`relative h-[600px] ${className}`}>
          {/* Imagen de fondo */}
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImage || heroSlides[0].image}
              alt={t('home.hero.imageAlt')}
              className="w-full h-full object-cover"
            />
            {/* Overlay para mejorar legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
          </div>

          {/* Contenido */}
          <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading">
                {heroTitle}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                {heroSubtitle}
              </p>
              
              <Button 
                href="/experiences" 
                variant="primary" 
                className="text-lg px-8 py-3"
              >
                {t('home.hero.cta')}
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
