"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  image: string;
  count?: number;
}

interface CategoriesSliderProps {
  title?: string;
  subtitle?: string;
  categories: Category[];
  className?: string;
}

/**
 * Componente para mostrar un slider de categorías de experiencias
 * Muestra categorías con imágenes y efectos de hover atractivos
 */
const CategoriesSlider: React.FC<CategoriesSliderProps> = ({
  title,
  subtitle,
  categories,
  className = '',
}) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil para ajustar el comportamiento
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Usar traducciones para título y subtítulo si no se proporcionan como props
  const sectionTitle = title || t('home.categories.title');
  const sectionSubtitle = subtitle || t('home.categories.subtitle');

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold font-heading mb-3">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="text-neutral-600 max-w-2xl mx-auto">{sectionSubtitle}</p>
          )}
        </div>
        
        {/* Slider de categorías */}
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          onMouseLeave={() => !isMobile && setActiveIndex(null)}
        >
          {categories.map((category, index) => (
            <Link 
              href={`/experiences?category=${category.id}`} 
              key={category.id}
              className="block"
            >
              <div 
                className={`
                  relative overflow-hidden rounded-lg aspect-[4/5] group cursor-pointer
                  transition-all duration-500 ease-in-out
                  ${activeIndex === index ? 'ring-4 ring-primary-500 scale-[1.02]' : ''}
                  ${activeIndex !== null && activeIndex !== index ? 'opacity-70 scale-[0.98]' : ''}
                `}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                onClick={() => isMobile && setActiveIndex(index === activeIndex ? null : index)}
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 group-hover:from-black/40 group-hover:to-black/80 transition-all duration-300"></div>
                
                {/* Contenido */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-1 group-hover:text-primary-300 transition-colors">
                    {category.name}
                  </h3>
                  
                  {category.count !== undefined && (
                    <p className="text-white/80 text-sm">
                      {category.count} {category.count === 1 
                        ? t('home.categories.experience') 
                        : t('home.categories.experiences')}
                    </p>
                  )}
                  
                  <div className="mt-2 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                    <span className="inline-flex items-center text-white text-sm font-medium">
                      {t('common.discover')}
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;
