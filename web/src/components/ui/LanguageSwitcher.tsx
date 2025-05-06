"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
  showFlags?: boolean;
  showNames?: boolean;
  textColor?: string;
}

/**
 * Componente para cambiar el idioma de la aplicación
 * Permite al usuario seleccionar entre los idiomas disponibles
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'dropdown',
  showFlags = true,
  showNames = true,
  textColor = '',
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Lista de idiomas disponibles
  const languages: Language[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];
  
  // Obtener el idioma actual
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  // Cambiar el idioma
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
    setIsOpen(false);
  };

  // Establecer el idioma inicial desde localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  // Renderizar como botones
  if (variant === 'buttons') {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`px-3 py-1 text-sm font-medium rounded ${
              language.code === i18n.language
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {showFlags && <span className="mr-1">{language.flag}</span>}
            {showNames && language.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }
  
  // Renderizar como dropdown
  return (
    <div className={`relative ${className}`}>
      <button
        className={`flex items-center text-sm font-medium ${textColor || 'text-neutral-600'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {showFlags && <span className="mr-1">{currentLanguage.flag}</span>}
        {showNames ? currentLanguage.name : currentLanguage.code.toUpperCase()}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language.code === i18n.language
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => changeLanguage(language.code)}
            >
              {showFlags && <span className="mr-2">{language.flag}</span>}
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
