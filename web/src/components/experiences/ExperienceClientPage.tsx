"use client";

import React from 'react';
import ExperienceGallery from '@/components/experiences/ExperienceGallery';
import ExperienceDetails from '@/components/experiences/ExperienceDetails';
import { TranslatedExperienceProvider, useTranslatedExperience } from '@/components/experiences/TranslatedExperienceProvider';

// Definir los tipos para las props del componente
interface ExperienceClientPageProps {
  experience: {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    duration: number;
    maxGroupSize: number;
    languages: string[];
    location: string;
    included: string[];
    excluded: string[];
    host: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      reviewCount: number;
    };
    images: {
      src: string;
      alt: string;
    }[];
  };
  experienceId: string;
}

/**
 * Componente cliente para la página de detalle de experiencia
 * Maneja toda la interactividad y renderiza los componentes de galería y detalles
 */
// Componente interno que usa los datos traducidos
const ExperienceClientContent: React.FC = () => {
  // Obtenemos los datos traducidos usando nuestro hook personalizado
  const experience = useTranslatedExperience();
  
  const handleBookNow = () => {
    console.log('Booking experience:', experience.id);
    // Aquí se implementará la lógica de reserva cuando tengamos el backend
  };
  
  return (
    <div className="pb-16">
      {/* Encabezado de la experiencia - Visible en móviles */}
      <div className="lg:hidden mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 font-heading mb-3">
          {experience.title}
        </h1>
        <div className="flex items-center text-sm text-neutral-600 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {experience.location}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detalles de la experiencia (ocupa 2/3 del ancho en pantallas grandes) */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <ExperienceDetails
            title={experience.title}
            description={experience.description}
            price={experience.price}
            currency={experience.currency}
            duration={experience.duration}
            maxGroupSize={experience.maxGroupSize}
            languages={experience.languages}
            location={experience.location}
            included={experience.included}
            excluded={experience.excluded}
            host={experience.host}
            onBookNow={handleBookNow}
          />
        </div>
        
        {/* Galería de imágenes (ocupa 1/3 del ancho en pantallas grandes) */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <ExperienceGallery 
            images={experience.images}
            title={experience.title}
            className="mb-8 sticky top-28"
          />
          
          {/* Información adicional en móviles */}
          <div className="lg:hidden mb-8">
            <div className="bg-primary-50 p-5 rounded-lg border border-primary-100 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold text-primary-700">{new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: experience.currency,
                    minimumFractionDigits: 0
                  }).format(experience.price)}</span>
                  <span className="text-primary-600 ml-2 font-medium">por persona</span>
                </div>
                <button 
                  onClick={handleBookNow}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal que envuelve el contenido con el proveedor de traducciones
const ExperienceClientPage: React.FC<ExperienceClientPageProps> = ({ 
  experience,
  experienceId
}) => {
  return (
    <TranslatedExperienceProvider experience={experience}>
      <ExperienceClientContent />
    </TranslatedExperienceProvider>
  );
};

export default ExperienceClientPage;
