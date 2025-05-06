"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface ExperienceGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  title: string;
  className?: string;
}

/**
 * Componente de galería de imágenes para la página de detalle de experiencia
 * Muestra una imagen principal y miniaturas, con opción de ver todas las imágenes
 * Diseño moderno e interactivo con lightbox y navegación táctil
 */
const ExperienceGallery: React.FC<ExperienceGalleryProps> = ({ 
  images,
  title,
  className = ''
}) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Verificar que hay imágenes y proporcionar imágenes específicas de respaldo
  const safeImages = images && images.length > 0 ? images : [
    {
      src: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
      alt: 'Mercado de La Boquería en Barcelona'
    },
    {
      src: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
      alt: 'Selección de tapas españolas'
    },
    {
      src: 'https://images.unsplash.com/photo-1452195100486-9cc805987862',
      alt: 'Degustación de quesos artesanales'
    },
    {
      src: 'https://images.unsplash.com/photo-1515669097368-22e68427d265',
      alt: 'Plato de paella valenciana'
    },
    {
      src: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499',
      alt: 'Puesto de frutas en el mercado'
    },
    {
      src: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8',
      alt: 'Jamón ibérico siendo cortado a mano'
    }
  ];

  // Abrir modal con una imagen específica
  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
    // Bloquear scroll cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Restaurar scroll cuando el modal se cierra
    document.body.style.overflow = 'auto';
  };

  // Navegar a la imagen anterior en el modal con transición
  const prevImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setModalIndex((prevIndex) => 
      prevIndex === 0 ? safeImages.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Navegar a la imagen siguiente en el modal con transición
  const nextImage = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setModalIndex((prevIndex) => 
      prevIndex === safeImages.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };
  
  // Manejar gestos táctiles para navegación
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextImage();
    }
    
    if (touchStart - touchEnd < -75) {
      prevImage();
    }
  };
  
  // Cerrar modal al hacer clic fuera de la imagen
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      closeModal();
    }
  };
  
  // Manejar teclas para navegación
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className={`experience-gallery ${className}`}>
      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 h-auto md:h-[500px]">
        {/* Imagen principal */}
        <div 
          className="md:col-span-8 md:row-span-2 relative overflow-hidden cursor-pointer group"
          onClick={() => openModal(activeIndex)}
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm p-3 transform scale-90 group-hover:scale-100 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
          
          <div className="relative h-full w-full">
            <Image
              src={safeImages[activeIndex].src}
              alt={safeImages[activeIndex].alt || title}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
        </div>
        
        {/* Imágenes secundarias */}
        {safeImages.slice(1).map((image, index) => {
          const actualIndex = index + 1;
          if (actualIndex >= safeImages.length) return null;
          
          return (
            <div 
              key={actualIndex}
              className="md:col-span-4 relative overflow-hidden cursor-pointer group aspect-square md:aspect-auto"
              onClick={() => openModal(actualIndex)}
            >
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-2 transform scale-90 group-hover:scale-100 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative h-full w-full">
                <Image
                  src={safeImages[actualIndex].src}
                  alt={safeImages[actualIndex].alt || `${title} - ${actualIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          );
        })}
        
        {/* Botón para ver más imágenes si hay más de 5 */}
        {images.length > 5 && (
          <div 
            className="md:col-span-4 relative overflow-hidden cursor-pointer group aspect-square md:aspect-auto"
            onClick={() => openModal(5)}
          >
            <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-white">
              <span className="text-2xl font-bold">+{images.length - 5}</span>
              <span className="text-sm">Ver más</span>
            </div>
            
            <div className="relative h-full w-full">
              <Image
                src={images[5].src}
                alt={images[5].alt || `${title} - Más imágenes`}
                fill
                className="object-cover opacity-60 transition-transform duration-700 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Miniaturas para selección rápida (versión móvil) */}
      <div className="flex justify-center mt-4 md:hidden">
        {images.slice(0, Math.min(5, images.length)).map((_, index: number) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full transition-all ${
              index === activeIndex ? 'bg-primary-500 scale-110' : 'bg-neutral-300'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver imagen ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Modal de galería completa (lightbox) */}
      {isModalOpen && (
        <div 
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={handleModalClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botón de cierre */}
          <button
            className="absolute top-4 right-4 text-white p-2 z-10 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
            onClick={closeModal}
            aria-label="Cerrar galería"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Botón de navegación anterior */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 z-10 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Imagen anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Imagen actual */}
          <div 
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[modalIndex].src}
                alt={images[modalIndex].alt || `${title} - Imagen ${modalIndex + 1}`}
                fill
                className={`object-contain transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                sizes="100vw"
                priority
              />
            </div>
          </div>
          
          {/* Botón de navegación siguiente */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 z-10 bg-black/20 rounded-full hover:bg-black/40 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Imagen siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Contador de imágenes */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
            {modalIndex + 1} / {images.length}
          </div>
          
          {/* Miniaturas en la parte inferior */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center">
            <div className="flex space-x-2 overflow-x-auto px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg max-w-3xl">
              {images.map((image, index: number) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden ${index === modalIndex ? 'ring-2 ring-white' : 'opacity-60'} transition-all`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setModalIndex(index);
                    setTimeout(() => setIsTransitioning(false), 300);
                  }}
                >
                  <div className="relative w-16 h-16">
                    <Image 
                      src={image.src} 
                      alt={image.alt || `${title} - Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceGallery;
