"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatters';
import { useTranslation } from 'react-i18next';

// Tipos para las props del componente
export interface ExperienceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  location: {
    city: string;
    country: string;
  };
  type: string;
  duration: number;
  rating: number;
  reviewCount: number;
  image?: string;
  images?: string[];
  hostName?: string;
  hostImage?: string;
  className?: string;
}

/**
 * Componente para mostrar una tarjeta de experiencia turística
 * Muestra la información principal de una experiencia con una imagen destacada
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  title,
  description,
  price,
  currency = 'USD',
  location,
  type,
  duration,
  rating,
  reviewCount,
  image,
  images,
  hostName,
  hostImage,
  className = '',
}) => {
  const { t } = useTranslation();
  
  // Función para obtener el color de fondo según el tipo de experiencia
  const getTypeBackgroundColor = (type: string): string => {
    const typeColors: Record<string, string> = {
      'gastronomy': 'bg-primary-100 text-primary-700',
      'adventure': 'bg-accent-100 text-accent-700',
      'cultural': 'bg-secondary-100 text-secondary-700',
      'nature': 'bg-green-100 text-green-700',
      'urban': 'bg-blue-100 text-blue-700',
      'other': 'bg-neutral-100 text-neutral-700',
    };
    
    return typeColors[type.toLowerCase()] || typeColors.other;
  };

  // Función para obtener una imagen de Unsplash según el tipo de experiencia
  const getUnsplashImage = (type: string): string => {
    const typeImages: Record<string, string> = {
      'gastronomy': 'https://source.unsplash.com/random/800x600/?food,gastronomy',
      'adventure': 'https://source.unsplash.com/random/800x600/?adventure,hiking',
      'cultural': 'https://source.unsplash.com/random/800x600/?culture,museum',
      'nature': 'https://source.unsplash.com/random/800x600/?nature,forest',
      'urban': 'https://source.unsplash.com/random/800x600/?city,urban',
    };
    
    return typeImages[type.toLowerCase()] || 'https://source.unsplash.com/random/800x600/?travel';
  };

  // Función para obtener múltiples imágenes para el carrusel
  const getMultipleImages = (type: string): string[] => {
    const typeVariations: Record<string, string[]> = {
      'gastronomy': [
        'https://source.unsplash.com/random/800x600/?food,restaurant',
        'https://source.unsplash.com/random/800x600/?chef,cooking',
        'https://source.unsplash.com/random/800x600/?wine,dining'
      ],
      'adventure': [
        'https://source.unsplash.com/random/800x600/?hiking,mountain',
        'https://source.unsplash.com/random/800x600/?kayak,river',
        'https://source.unsplash.com/random/800x600/?climbing,adventure'
      ],
      'cultural': [
        'https://source.unsplash.com/random/800x600/?museum,art',
        'https://source.unsplash.com/random/800x600/?history,monument',
        'https://source.unsplash.com/random/800x600/?festival,tradition'
      ],
      'nature': [
        'https://source.unsplash.com/random/800x600/?forest,trees',
        'https://source.unsplash.com/random/800x600/?waterfall,river',
        'https://source.unsplash.com/random/800x600/?mountains,landscape'
      ],
      'urban': [
        'https://source.unsplash.com/random/800x600/?city,skyline',
        'https://source.unsplash.com/random/800x600/?street,urban',
        'https://source.unsplash.com/random/800x600/?architecture,building'
      ],
    };
    
    return typeVariations[type.toLowerCase()] || [
      'https://source.unsplash.com/random/800x600/?travel',
      'https://source.unsplash.com/random/800x600/?tourism',
      'https://source.unsplash.com/random/800x600/?vacation'
    ];
  };

  // Estado para controlar el índice de la imagen actual en el carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imágenes para el carrusel (las proporcionadas o generadas)
  const carouselImages: string[] = (images ?? getMultipleImages(type));
  
  // Imagen principal a mostrar (la actual del carrusel o la proporcionada)
  const imageUrl = image || carouselImages[currentImageIndex];
  
  // Función para navegar al siguiente slide
  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Función para navegar al slide anterior
  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Traducir el tipo de experiencia
  const translatedType = t(`home.categories.${type.toLowerCase()}`);

  return (
    <div className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
      <Link href={`/experiences/${id}`}>
        {/* Carrusel de imágenes */}
        <div className="relative h-72 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
          
          <div className="relative h-full w-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>
          
          {/* Controles del carrusel */}
          {carouselImages.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={prevSlide} 
                className="ml-2 p-2 rounded-full bg-white/80 text-neutral-800 hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide} 
                className="mr-2 p-2 rounded-full bg-white/80 text-neutral-800 hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Indicadores del carrusel */}
          {carouselImages.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-20">
              {carouselImages.map((_, index: number) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Badge de tipo de experiencia */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getTypeBackgroundColor(type)}`}>
              {translatedType}
            </span>
          </div>
          
          {/* Precio - Destacado en la imagen */}
          <div className="absolute bottom-12 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
            <div className="font-bold text-neutral-800">
              {formatCurrency(price, currency)}
              <span className="text-neutral-600 text-xs font-medium ml-1">{t('common.perPerson')}</span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex flex-col space-y-2">
            {/* Ubicación y duración */}
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location.city}, {location.country}
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration} {duration === 1 ? t('common.hour') : t('common.hours')}
              </div>
            </div>
            
            {/* Título */}
            <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary-600 transition-colors line-clamp-2">
              {title}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i: number) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ${i < Math.round(rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={i < Math.round(rating) ? 0 : 2} 
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-xs text-neutral-500">
                {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? t('experiences.card.review') : t('experiences.card.reviews')})
              </span>
            </div>
          </div>
          
          {/* Anfitrión (si está disponible) */}
          {hostName && (
            <div className="flex items-center mt-4 pt-4 border-t border-neutral-100">
              {hostImage ? (
                <div className="w-8 h-8 rounded-full overflow-hidden relative mr-2 border-2 border-white shadow-sm">
                  <img
                    src={hostImage}
                    alt={hostName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2 border-2 border-white shadow-sm">
                  {hostName.charAt(0)}
                </div>
              )}
              <span className="text-xs text-neutral-600">
                {t('experiences.card.host')} <span className="font-medium">{hostName}</span>
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ExperienceCard;
