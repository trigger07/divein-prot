"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/utils/formatters';
import { Button } from '../ui/Button';

interface ShowcaseExperience {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
  };
  price: number;
  currency?: string;
  image: string;
  type: string;
}

interface FeaturedExperienceShowcaseProps {
  title?: string;
  subtitle?: string;
  experiences: ShowcaseExperience[];
  viewAllLink?: string;
  className?: string;
}

/**
 * Componente para mostrar experiencias destacadas con un diseño visual atractivo
 * Inspirado en sitios premium de viajes y experiencias
 */
const FeaturedExperienceShowcase: React.FC<FeaturedExperienceShowcaseProps> = ({
  title,
  subtitle,
  experiences,
  viewAllLink,
  className = '',
}) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Usar traducciones para título y subtítulo si no se proporcionan como props
  const sectionTitle = title || t('home.featuredShowcase.title');
  const sectionSubtitle = subtitle || t('home.featuredShowcase.subtitle');
  
  // Función para cambiar a la siguiente experiencia
  const nextExperience = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };
  
  // Función para cambiar a la experiencia anterior
  const prevExperience = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };
  
  // Autoplay para cambiar las experiencias automáticamente
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextExperience();
    }, 7000);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex]);
  
  // Obtener la experiencia activa
  const activeExperience = experiences[activeIndex];
  
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="mb-8 text-center md:text-left md:flex md:justify-between md:items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">{sectionTitle}</h2>
            {sectionSubtitle && (
              <p className="text-neutral-600 max-w-2xl">{sectionSubtitle}</p>
            )}
          </div>
          
          {viewAllLink && (
            <div className="mt-4 md:mt-0">
              <Button href={viewAllLink} variant="outline" className="hover:bg-primary-50 transition-colors">
                {t('common.viewAll')}
              </Button>
            </div>
          )}
        </div>
        
        {/* Showcase principal */}
        <div className="relative overflow-hidden rounded-xl shadow-lg bg-neutral-100 h-[500px] md:h-[600px]">
          {/* Imagen de fondo con efecto parallax */}
          <div 
            className="absolute inset-0 w-full h-full transition-transform duration-[1.5s] ease-out"
            style={{ 
              backgroundImage: `url(${activeExperience.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `scale(${isTransitioning ? '1.05' : '1'})` 
            }}
          />
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          
          {/* Contenido */}
          <div className="relative h-full z-10 flex flex-col justify-center p-8 md:p-16 max-w-2xl">
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                {t(`home.categories.${activeExperience.type.toLowerCase()}`)}
              </span>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {activeExperience.title}
              </h3>
              
              <p className="text-white/80 text-lg mb-6 line-clamp-3">
                {activeExperience.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center text-white/90">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {activeExperience.location.city}, {activeExperience.location.country}
                </div>
                
                <div className="text-white font-bold">
                  {formatCurrency(activeExperience.price, activeExperience.currency || 'USD')}
                  <span className="text-white/70 font-normal ml-1">{t('common.perPerson')}</span>
                </div>
              </div>
              
              <Link 
                href={`/experiences/${activeExperience.id}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
              >
                {t('common.exploreExperience')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Controles de navegación */}
          <div className="absolute bottom-8 right-8 flex space-x-3 z-10">
            <button 
              onClick={prevExperience}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Previous experience"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextExperience}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              aria-label="Next experience"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Indicadores de navegación */}
          <div className="absolute bottom-8 left-8 md:left-16 flex space-x-2 z-10">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isTransitioning) return;
                  setIsTransitioning(true);
                  setActiveIndex(index);
                  setTimeout(() => {
                    setIsTransitioning(false);
                  }, 600);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Miniaturas de otras experiencias (visible solo en pantallas grandes) */}
        <div className="hidden lg:grid grid-cols-4 gap-4 mt-6">
          {experiences.map((experience, index) => (
            <div 
              key={experience.id}
              className={`
                cursor-pointer rounded-lg overflow-hidden relative group
                ${index === activeIndex ? 'ring-2 ring-primary-500' : 'opacity-80'}
              `}
              onClick={() => {
                if (isTransitioning) return;
                setIsTransitioning(true);
                setActiveIndex(index);
                setTimeout(() => {
                  setIsTransitioning(false);
                }, 600);
              }}
            >
              <div className="aspect-[16/9] relative">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <h4 className="text-white text-sm font-medium truncate">{experience.title}</h4>
                <p className="text-white/80 text-xs truncate">{experience.location.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperienceShowcase;
