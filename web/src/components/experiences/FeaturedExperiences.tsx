"use client";

import React, { useState, useEffect, useRef } from 'react';
import ExperienceCard, { ExperienceCardProps } from './ExperienceCard';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

interface FeaturedExperiencesProps {
  title?: string;
  subtitle?: string;
  experiences: Omit<ExperienceCardProps, 'className'>[];
  viewAllLink?: string;
  className?: string;
  layout?: 'grid' | 'carousel';
}

/**
 * Componente para mostrar una sección de experiencias destacadas
 * Muestra un título, subtítulo opcional y una lista de tarjetas de experiencias
 * Soporta dos layouts: grid (cuadrícula) y carousel (carrusel)
 */
const FeaturedExperiences: React.FC<FeaturedExperiencesProps> = ({
  title,
  subtitle,
  experiences,
  viewAllLink,
  className = '',
  layout = 'grid',
}) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Usar traducciones para título y subtítulo si no se proporcionan como props
  const sectionTitle = title || t('home.featuredExperiences.title');
  const sectionSubtitle = subtitle || t('home.featuredExperiences.subtitle');
  
  // Número de tarjetas a mostrar según el ancho de la pantalla
  const [slidesToShow, setSlidesToShow] = useState(3);
  
  // Actualizar slidesToShow basado en el ancho de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calcular el número máximo de slides
  const maxSlides = Math.max(0, experiences.length - slidesToShow);
  
  // Funciones para controlar el carrusel
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(prev => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Manejar gestos táctiles para el carrusel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };
  
  // Autoplay para el carrusel
  useEffect(() => {
    if (layout !== 'carousel') return;
    
    const interval = setInterval(() => {
      if (currentSlide < maxSlides) {
        nextSlide();
      } else {
        setCurrentSlide(0);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, maxSlides, layout]);
  
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="mb-8 text-center md:text-left md:flex md:justify-between md:items-end">
          <div>
            <h2 className="text-3xl font-bold font-heading mb-2">{sectionTitle}</h2>
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
        
        {/* Contenedor de experiencias (grid o carrusel) */}
        {layout === 'grid' ? (
          // Grid de experiencias
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                {...experience}
                className="h-full"
              />
            ))}
          </div>
        ) : (
          // Carrusel de experiencias
          <div className="relative">
            {/* Controles del carrusel (flechas) */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
              <button 
                onClick={prevSlide} 
                disabled={currentSlide === 0}
                className={`p-3 rounded-full shadow-md bg-white text-neutral-800 hover:bg-primary-50 transition-colors ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
              <button 
                onClick={nextSlide} 
                disabled={currentSlide >= maxSlides}
                className={`p-3 rounded-full shadow-md bg-white text-neutral-800 hover:bg-primary-50 transition-colors ${currentSlide >= maxSlides ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Contenedor del carrusel con overflow */}
            <div 
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
              >
                {experiences.map((experience) => (
                  <div 
                    key={experience.id} 
                    className={`px-2 flex-shrink-0`}
                    style={{ width: `${100 / slidesToShow}%` }}
                  >
                    <ExperienceCard
                      {...experience}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Indicadores del carrusel (puntos) */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-primary-500 scale-110' : 'bg-neutral-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Botón móvil para ver todas */}
        {viewAllLink && (
          <div className="mt-8 text-center md:hidden">
            <Button href={viewAllLink} variant="outline" className="hover:bg-primary-50 transition-colors">
              {t('common.viewAll')}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedExperiences;
