"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

interface Host {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
}

interface ExperienceDetailsProps {
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // en minutos
  maxGroupSize: number;
  languages: string[];
  location: string;
  included: string[];
  excluded: string[];
  host: Host;
  onBookNow: () => void;
}

/**
 * Componente para mostrar los detalles de una experiencia
 * Incluye título, descripción, precio, duración, anfitrión, etc.
 */
const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({
  title,
  description,
  price,
  currency,
  duration,
  maxGroupSize,
  languages,
  location,
  included,
  excluded,
  host,
  onBookNow
}) => {
  const { t, i18n } = useTranslation();
  
  // Formatear precio según la localización
  const formattedPrice = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
  
  // Formatear duración
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} minutos`;
    } else if (mins === 0) {
      return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else {
      return `${hours} ${hours === 1 ? 'hora' : 'horas'} y ${mins} minutos`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 font-heading mb-6">
          {title}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-neutral-600 mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDuration(duration)}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {t('experiences.maxGroupSize', { count: maxGroupSize })}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {languages.join(', ')}
          </div>
        </div>
      </div>
      
      {/* Información del anfitrión */}
      <div className="flex items-center mb-8 p-5 bg-neutral-50 rounded-lg border border-neutral-100">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={host.avatar}
            alt={host.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="text-sm text-neutral-500">{t('experiences.hostedBy')}</p>
          <p className="font-medium">{host.name}</p>
          <div className="flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm">
              {host.rating.toFixed(1)} ({host.reviewCount})
            </span>
          </div>
        </div>
      </div>
      
      {/* Descripción */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 font-heading text-neutral-800">
          {t('experiences.aboutExperience')}
        </h2>
        <div className="prose prose-neutral max-w-none">
          {description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-neutral-700 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      
      {/* Lo que incluye */}
      {included.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 font-heading text-neutral-800">
            {t('experiences.included')}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {included.map((item, index) => (
              <li key={index} className="flex items-start bg-green-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Lo que no incluye */}
      {excluded.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 font-heading text-neutral-800">
            {t('experiences.excluded')}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {excluded.map((item, index) => (
              <li key={index} className="flex items-start bg-red-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Sección de precio y reserva */}
      <div className="mt-8 p-6 border border-primary-100 rounded-lg bg-primary-50">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 mb-5">
          <div>
            <span className="text-3xl font-bold text-primary-700">{formattedPrice}</span>
            <span className="text-primary-600 ml-2 font-medium">{t('common.perPerson')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm bg-white px-3 py-1.5 rounded-full text-primary-700 font-medium border border-primary-100">
              {formatDuration(duration)}
            </div>
            <Button
              variant="primary"
              onClick={onBookNow}
              className="py-3 px-6 text-base font-medium whitespace-nowrap"
            >
              {t('experiences.bookNow')}
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-primary-600 mt-4">
          {t('experiences.noChargeYet')}
        </p>
      </div>
    </div>
  );
};

export default ExperienceDetails;
