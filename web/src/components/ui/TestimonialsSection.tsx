"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: string;
  name: string;
  location?: string;
  avatar?: string;
  rating: number;
  text: string;
  experienceTitle?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  className?: string;
}

/**
 * Componente para mostrar una sección de testimonios con un diseño moderno y atractivo
 */
const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  subtitle,
  testimonials,
  className = '',
}) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Usar traducciones para título y subtítulo si no se proporcionan como props
  const sectionTitle = title || t('home.testimonials.title');
  const sectionSubtitle = subtitle || t('home.testimonials.subtitle');

  // Función para ir al siguiente testimonio
  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Función para ir al testimonio anterior
  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Función para ir a un testimonio específico
  const goToTestimonial = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Autoplay para los testimonios
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex]);

  // Pausar el autoplay cuando el usuario interactúa con los controles
  const pauseAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Reanudar el autoplay después de la interacción del usuario
  const resumeAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 6000);
  };

  return (
    <section className={`py-16 bg-neutral-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold font-heading mb-3">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="text-neutral-600 max-w-2xl mx-auto">{sectionSubtitle}</p>
          )}
        </div>
        
        {/* Carrusel de testimonios */}
        <div className="relative max-w-4xl mx-auto">
          {/* Controles del carrusel */}
          <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => {
                pauseAutoplay();
                prevTestimonial();
                resumeAutoplay();
              }}
              className="p-3 rounded-full shadow-md bg-white text-neutral-800 hover:bg-primary-50 transition-colors"
              aria-label="Previous testimonial"
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => {
                pauseAutoplay();
                nextTestimonial();
                resumeAutoplay();
              }}
              className="p-3 rounded-full shadow-md bg-white text-neutral-800 hover:bg-primary-50 transition-colors"
              aria-label="Next testimonial"
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Contenedor del carrusel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative">
                    {/* Comillas decorativas */}
                    <div className="absolute top-6 left-6 text-primary-100">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9999 14.1999H6.5999C6.5999 14.1999 6.5999 9.59994 6.5999 9.59994C6.5999 7.54994 8.3499 5.79994 10.3999 5.79994V3.19994C6.8999 3.19994 3.9999 6.09994 3.9999 9.59994V17.9999H11.9999V14.1999Z" />
                        <path d="M20.0001 14.1999H14.6001C14.6001 14.1999 14.6001 9.59994 14.6001 9.59994C14.6001 7.54994 16.3501 5.79994 18.4001 5.79994V3.19994C14.9001 3.19994 12.0001 6.09994 12.0001 9.59994V17.9999H20.0001V14.1999Z" />
                      </svg>
                    </div>
                    
                    {/* Texto del testimonio */}
                    <div className="mb-6 mt-8 text-lg text-neutral-700 italic">
                      "{testimonial.text}"
                    </div>
                    
                    {/* Información del usuario */}
                    <div className="flex items-center">
                      {/* Avatar */}
                      {testimonial.avatar ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-4">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      
                      <div>
                        {/* Nombre y ubicación */}
                        <div className="font-bold text-neutral-800">{testimonial.name}</div>
                        {testimonial.location && (
                          <div className="text-sm text-neutral-500">{testimonial.location}</div>
                        )}
                        
                        {/* Rating */}
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500' : 'text-neutral-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      {/* Experiencia relacionada */}
                      {testimonial.experienceTitle && (
                        <div className="ml-auto text-right">
                          <div className="text-xs text-neutral-500">{t('testimonials.experience')}</div>
                          <div className="text-sm font-medium text-primary-600">{testimonial.experienceTitle}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores del carrusel */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  pauseAutoplay();
                  goToTestimonial(index);
                  resumeAutoplay();
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary-500 scale-110' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                onMouseEnter={pauseAutoplay}
                onMouseLeave={resumeAutoplay}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
