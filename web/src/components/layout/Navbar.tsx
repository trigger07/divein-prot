"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import LanguageSwitcher from '../ui/LanguageSwitcher';

/**
 * Componente de navegación principal de la aplicación
 * Incluye enlaces a las páginas principales y opciones de autenticación
 * El fondo es transparente en la parte superior y cambia a blanco al hacer scroll
 */
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  // Estado para controlar si el navbar debe tener fondo o no
  // Inicializamos explícitamente como false (transparente)
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
  // Estado de autenticación (simulado, se reemplazará con contexto real)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'traveler' | 'host'>('traveler');
  
  // Efecto para detectar el scroll y cambiar el estilo del navbar
  useEffect(() => {
    // Función para manejar el evento de scroll
    const handleScroll = () => {
      // Altura aproximada del carrusel (700px)
      const scrollThreshold = 650;
      const hasScrolledPastThreshold = window.scrollY > scrollThreshold;
      setIsScrolled(hasScrolledPastThreshold);
    };
    
    // Ejecutar una vez al inicio para establecer el estado inicial
    handleScroll();
    
    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Limpiar event listener al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Función para verificar si un enlace está activo
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  // Determinar los estilos basados en el estado de scroll
  const headerBgClass = isScrolled 
    ? 'bg-white shadow-sm' 
    : 'bg-transparent';
  
  const textClass = isScrolled 
    ? 'text-neutral-600' 
    : 'text-white';
  
  const activeTextClass = isScrolled 
    ? 'text-primary-600' 
    : 'text-white font-semibold';
  
  const hoverTextClass = isScrolled 
    ? 'hover:text-primary-500' 
    : 'hover:text-white';
    


  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={`relative w-32 h-8 flex items-center justify-center rounded transition-all duration-300 ${isScrolled ? 'bg-primary-500' : 'bg-primary-500/90 backdrop-blur-sm'}`}>
              <span className="text-white font-bold text-xl">DiveIn</span>
            </div>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className={`nav-link text-sm font-medium transition-colors ${isActive('/') ? activeTextClass : `${textClass} ${hoverTextClass}`}`}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href="/experiences"
              className={`nav-link text-sm font-medium transition-colors ${isActive('/experiences') ? activeTextClass : `${textClass} ${hoverTextClass}`}`}
            >
              {t('navigation.experiences')}
            </Link>
            {isAuthenticated && userRole === 'host' && (
              <Link 
                href="/host/dashboard"
                className={`nav-link text-sm font-medium transition-colors ${isActive('/host') ? activeTextClass : `${textClass} ${hoverTextClass}`}`}
              >
                {t('navigation.dashboard')}
              </Link>
            )}
            <Link 
              href="/about"
              className={`nav-link text-sm font-medium transition-colors ${isActive('/about') ? activeTextClass : `${textClass} ${hoverTextClass}`}`}
            >
              {t('navigation.about')}
            </Link>
          </nav>

          {/* Botones de autenticación (escritorio) */}
          <div className="hidden md:flex items-center space-x-4 transition-all duration-300">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/reservations"
                  className={`nav-link text-sm font-medium transition-colors ${isActive('/reservations') ? activeTextClass : `${textClass} ${hoverTextClass}`}`}
                >
                  {t('navigation.myReservations')}
                </Link>
                <div className="relative group">
                  <button className="nav-link flex items-center space-x-2">
                    <div className={`w-8 h-8 ${isScrolled ? 'bg-neutral-200' : 'bg-white/20'} rounded-full overflow-hidden flex items-center justify-center transition-colors`}>
                      <span className={`${isScrolled ? 'text-neutral-500' : 'text-white'} text-xs font-bold transition-colors`}>
                        {userRole === 'host' ? 'H' : 'T'}
                      </span>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${textClass}`}>{t('profile.personalInfo')}</span>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link 
                      href="/profile"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      {t('navigation.profile')}
                    </Link>
                    {userRole === 'host' ? (
                      <Link 
                        href="/host/experiences"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        {t('navigation.myExperiences')}
                      </Link>
                    ) : (
                      <Link 
                        href="/host/signup"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        {t('navigation.becomeHost')}
                      </Link>
                    )}
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsAuthenticated(false)}
                    >
                      {t('navigation.logout')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button href="/auth/login" variant="outline" size="sm">
                  {t('navigation.login')}
                </Button>
                <Button href="/auth/signup" variant="primary" size="sm">
                  {t('navigation.signup')}
                </Button>
              </>
            )}
            
            {/* Selector de idioma */}
            <LanguageSwitcher variant="dropdown" showFlags={true} showNames={false} />
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button
              className="nav-link text-white hover:text-white focus:outline-none transition-colors"
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
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 py-4">
          <div className="container mx-auto px-4 space-y-3">
            <Link 
              href="/"
              className={`block py-2 text-base font-medium ${isActive('/') ? 'text-primary-600' : 'text-neutral-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>
            <Link 
              href="/experiences"
              className={`block py-2 text-base font-medium ${isActive('/experiences') ? 'text-primary-600' : 'text-neutral-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.experiences')}
            </Link>
            {isAuthenticated && userRole === 'host' && (
              <Link 
                href="/host/dashboard"
                className={`block py-2 text-base font-medium ${isActive('/host') ? 'text-primary-600' : 'text-neutral-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation.dashboard')}
              </Link>
            )}
            <Link 
              href="/about"
              className={`block py-2 text-base font-medium ${isActive('/about') ? 'text-primary-600' : 'text-neutral-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.about')}
            </Link>
            
            {/* Opciones de autenticación móvil */}
            {isAuthenticated ? (
              <>
                <Link 
                  href="/reservations"
                  className={`block py-2 text-base font-medium ${isActive('/reservations') ? 'text-primary-600' : 'text-neutral-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.myReservations')}
                </Link>
                <Link 
                  href="/profile"
                  className={`block py-2 text-base font-medium ${isActive('/profile') ? 'text-primary-600' : 'text-neutral-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.profile')}
                </Link>
                {userRole === 'host' ? (
                  <Link 
                    href="/host/experiences"
                    className="block py-2 text-base font-medium text-neutral-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.myExperiences')}
                  </Link>
                ) : (
                  <Link 
                    href="/host/signup"
                    className="block py-2 text-base font-medium text-neutral-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.becomeHost')}
                  </Link>
                )}
                <button 
                  className="block w-full text-left py-2 text-base font-medium text-neutral-600"
                  onClick={() => {
                    setIsAuthenticated(false);
                    setIsMenuOpen(false);
                  }}
                >
                  {t('navigation.logout')}
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-3">
                <Button 
                  href="/auth/login" 
                  variant="ghost"
                  className="nav-link text-sm font-medium transition-colors text-white hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.login')}
                </Button>
                <Button 
                  href="/auth/signup" 
                  variant={isScrolled ? 'primary' : 'outline'}
                  className="text-sm border-white text-white hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.signup')}
                </Button>
              </div>
            )}
            
            {/* Selector de idioma móvil */}
            <div className="pt-4 border-t border-neutral-100">
              <p className="text-sm font-medium text-neutral-500 mb-2">{t('profile.language')}</p>
              <LanguageSwitcher variant="buttons" showFlags={true} showNames={false} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
