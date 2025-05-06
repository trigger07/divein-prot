"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import LanguageSwitcher from '../ui/LanguageSwitcher';

/**
 * Navbar transparente que cambia a blanco al hacer scroll
 */
interface TransparentNavbarProps {
  forceWhite?: boolean;
}

const TransparentNavbar: React.FC<TransparentNavbarProps> = ({ forceWhite = false }) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(forceWhite);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Detectar scroll para cambiar estilos
  useEffect(() => {
    // Si forceWhite es true, no necesitamos escuchar eventos de scroll
    if (forceWhite) {
      setIsScrolled(true);
      return;
    }
    
    const handleScroll = () => {
      // Obtener la altura de la ventana para determinar cuándo termina el hero
      const windowHeight = window.innerHeight;
      
      // Establecer isScrolled a true cuando el scroll pasa la altura de la ventana
      setIsScrolled(window.scrollY > windowHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Llamar a handleScroll inmediatamente para establecer el estado inicial
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [forceWhite]);
  
  // Verificar si una ruta está activa
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || forceWhite ? 'bg-white shadow-sm' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-8 bg-primary-500 flex items-center justify-center rounded">
              <span className="text-white font-bold text-xl">DiveIn</span>
            </div>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className={`text-sm font-medium ${
                isActive('/') 
                  ? isScrolled ? 'text-primary-600' : 'text-white font-semibold' 
                  : isScrolled ? 'text-neutral-600 hover:text-primary-500' : 'text-white hover:text-white/80'
              }`}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href="/experiences"
              className={`text-sm font-medium ${
                isActive('/experiences') 
                  ? isScrolled ? 'text-primary-600' : 'text-white font-semibold' 
                  : isScrolled ? 'text-neutral-600 hover:text-primary-500' : 'text-white hover:text-white/80'
              }`}
            >
              {t('navigation.experiences')}
            </Link>
            <Link 
              href="/about"
              className={`text-sm font-medium ${
                isActive('/about') 
                  ? isScrolled ? 'text-primary-600' : 'text-white font-semibold' 
                  : isScrolled ? 'text-neutral-600 hover:text-primary-500' : 'text-white hover:text-white/80'
              }`}
            >
              {t('navigation.about')}
            </Link>
          </nav>

          {/* Botones de autenticación (escritorio) */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher 
              variant="dropdown" 
              showNames={false} 
              textColor={isScrolled ? '' : 'text-white'}
            />
            <Button 
              href="/auth/login" 
              variant={isScrolled ? "ghost" : "outline"}
              className={`text-sm font-medium ${
                isScrolled ? 'text-neutral-600 hover:text-primary-500' : 'text-white hover:text-white/80'
              }`}
            >
              {t('navigation.login')}
            </Button>
            <Button 
              href="/auth/signup" 
              variant={isScrolled ? "primary" : "outline"}
              className={`text-sm ${
                !isScrolled && 'border-white text-white hover:bg-white/10'
              }`}
            >
              {t('navigation.signup')}
            </Button>
          </div>

          {/* Botón de menú móvil */}
          <button
            className={`md:hidden ${
              isScrolled ? 'text-neutral-500' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/"
                className={`text-sm font-medium ${isActive('/') ? 'text-primary-600' : 'text-neutral-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.home')}
              </Link>
              <Link 
                href="/experiences"
                className={`text-sm font-medium ${isActive('/experiences') ? 'text-primary-600' : 'text-neutral-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.experiences')}
              </Link>
              <Link 
                href="/about"
                className={`text-sm font-medium ${isActive('/about') ? 'text-primary-600' : 'text-neutral-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.about')}
              </Link>
              
              <div className="pt-2 space-y-3">
                <Button 
                  href="/auth/login" 
                  variant="ghost"
                  className="text-sm font-medium text-neutral-600 w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.login')}
                </Button>
                <Button 
                  href="/auth/signup" 
                  variant="primary"
                  className="text-sm w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.signup')}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default TransparentNavbar;
