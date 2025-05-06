"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// Definimos la estructura de los datos de experiencia
export interface Experience {
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
}

// Contexto para los datos traducidos
const TranslatedExperienceContext = createContext<Experience | null>(null);

interface TranslatedExperienceProviderProps {
  experience: Experience;
  children: ReactNode;
}

/**
 * Componente que proporciona los datos de experiencia traducidos
 * utilizando el sistema de i18next
 */
export const TranslatedExperienceProvider: React.FC<TranslatedExperienceProviderProps> = ({ 
  experience, 
  children 
}) => {
  const { t, i18n } = useTranslation();
  
  // Determinar qué clave de traducción usar según el ID de la experiencia
  const getTranslationKey = () => {
    if (experience.id === 'mountain-hiking' || experience.id === '2') {
      return 'mountainHiking';
    }
    return 'mockExperience'; // Por defecto, usar la clave de la experiencia gastronómica
  };
  
  const translationKey = getTranslationKey();
  
  // Traducimos los textos de la experiencia según el idioma actual
  const translatedExperience: Experience = {
    ...experience,
    // Si estamos en español, usamos los textos originales
    // Si estamos en otro idioma, intentamos traducir usando las claves de traducción
    title: i18n.language === 'es' 
      ? experience.title 
      : t(`${translationKey}.title`, experience.title),
    description: i18n.language === 'es'
      ? experience.description
      : t(`${translationKey}.description`, experience.description),
    location: i18n.language === 'es'
      ? experience.location
      : t(`${translationKey}.location`, experience.location),
    languages: experience.languages.map((lang, index) => {
      if (i18n.language === 'es') return lang;
      
      // Mapeo de idiomas para traducción
      const langKeys = ['spanish', 'english', 'catalan', 'french'];
      if (index < langKeys.length) {
        return t(`${translationKey}.languages.${langKeys[index]}`, lang);
      }
      return lang;
    }),
    included: experience.included.map((item, index) => {
      if (i18n.language === 'es') return item;
      return t(`${translationKey}.included.item${index + 1}`, item);
    }),
    excluded: experience.excluded.map((item, index) => {
      if (i18n.language === 'es') return item;
      return t(`${translationKey}.excluded.item${index + 1}`, item);
    })
  };

  return (
    <TranslatedExperienceContext.Provider value={translatedExperience}>
      {children}
    </TranslatedExperienceContext.Provider>
  );
};

// Hook para acceder a los datos traducidos
export const useTranslatedExperience = () => {
  const context = useContext(TranslatedExperienceContext);
  if (!context) {
    throw new Error('useTranslatedExperience debe usarse dentro de un TranslatedExperienceProvider');
  }
  return context;
};
