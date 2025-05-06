"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import Link from 'next/link';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplaySpeed?: number;
  className?: string;
}

/**
 * Componente de carrusel para la sección hero de la página principal
 * Muestra imágenes a pantalla completa con texto y botones de llamada a la acción
 */
const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  autoplaySpeed = 6000,
  className = '',
}) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Función para ir al siguiente slide
  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Función para ir al slide anterior
  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Configurar autoplay
  useEffect(() => {
    // Función para avanzar al siguiente slide
    const autoplayFunction = () => {
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
        return newIndex;
      });
    };
    
    // Solo iniciar el autoplay si no está pausado
    if (!isPaused) {
      // Iniciar el intervalo
      const interval = setInterval(autoplayFunction, autoplaySpeed);
      
      // Limpiar el intervalo cuando el componente se desmonta o cambian las dependencias
      return () => clearInterval(interval);
    }
  }, [isPaused, autoplaySpeed, slides.length]);
  
  // Inicializar el estado al montar el componente
  useEffect(() => {
    // Asegurarse de que el autoplay esté activo desde el inicio
    setIsPaused(false);
    // Establecer el primer slide como activo
    setActiveIndex(0);
  }, []);

  // Pausar el autoplay cuando el usuario interactúa con los controles
  const pauseAutoplay = () => {
    setIsPaused(true);
  };

  // Reanudar el autoplay inmediatamente
  const resumeAutoplay = () => {
    setIsPaused(false);
  };

  return (
    <section className={`relative h-screen overflow-hidden ${className}`}>
      {/* Slides */}
      <div className="absolute inset-0 w-full h-full">
        {/* Imagen actual */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={slides[activeIndex].image}
            alt={slides[activeIndex].title}
            className="w-full h-full object-cover animate-slowfade"
          />
        </div>
        
        {/* Overlay para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      </div>
      
      {/* Contenido del slide actual */}
      <div className="relative z-10 h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-5000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >

            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-3xl transition-opacity duration-2000">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                {slide.subtitle}
              </p>
              
              {slide.ctaText && slide.ctaLink && (
                <Button 
                  href={slide.ctaLink} 
                  variant="primary" 
                  className="text-lg px-8 py-3"
                >
                  {slide.ctaText}
                </Button>
              )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center items-center">
        {/* Indicadores */}
        <div className="flex items-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`transition-all ${
                index === activeIndex 
                  ? 'w-16 h-2 bg-white rounded-full' 
                  : 'w-3 h-3 rounded-full bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => {
                pauseAutoplay();
                goToSlide(index);
                resumeAutoplay();
              }}
              aria-label={`${t('common.goToSlide')} ${index + 1}`}
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
