"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../ui/LanguageSwitcher';

/**
 * Componente Footer para la aplicación web
 * Incluye enlaces a páginas importantes, redes sociales y políticas
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-32 h-8 bg-primary-500 flex items-center justify-center rounded">
                <span className="text-white font-bold text-xl">DiveIn</span>
              </div>
            </Link>
            <p className="text-sm text-neutral-600 mb-4">
              {t('common.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="h-5 w-5 text-neutral-500 hover:text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="h-5 w-5 text-neutral-500 hover:text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="h-5 w-5 text-neutral-500 hover:text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Enlaces de navegación */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-neutral-900 mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/experiences" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.allExperiences')}
                </Link>
              </li>
              <li>
                <Link href="/experiences/gastronomy" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.gastronomy')}
                </Link>
              </li>
              <li>
                <Link href="/experiences/adventure" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.adventure')}
                </Link>
              </li>
              <li>
                <Link href="/experiences/cultural" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.cultural')}
                </Link>
              </li>
              <li>
                <Link href="/experiences/nature" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.nature')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Enlaces para anfitriones */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-neutral-900 mb-4">{t('footer.hosts')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/host/signup" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.becomeHost')}
                </Link>
              </li>
              <li>
                <Link href="/host/resources" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.hostResources')}
                </Link>
              </li>
              <li>
                <Link href="/host/community" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.community')}
                </Link>
              </li>
              <li>
                <Link href="/host/faq" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Enlaces de soporte */}
          <div className="col-span-1">
            <h3 className="text-sm font-bold text-neutral-900 mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.termsAndConditions')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-600 hover:text-primary-500">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Barra inferior con copyright y selector de idioma */}
        <div className="border-t border-neutral-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500 mb-4 md:mb-0">
            {t('footer.copyright', { year: currentYear })}
          </p>
          
          <div className="flex items-center space-x-4">
            {/* Selector de idioma */}
            <LanguageSwitcher variant="dropdown" showFlags={true} showNames={true} />
            
            {/* Moneda */}
            <div className="relative group">
              <button className="flex items-center text-sm text-neutral-600">
                <span>USD</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute bottom-full mb-2 right-0 w-32 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  USD ($)
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  EUR (€)
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  GBP (£)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
