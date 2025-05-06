"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import TransparentNavbar from './TransparentNavbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Componente de layout principal para la aplicación web
 * Incluye la navegación y el footer en todas las páginas
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Determinar si estamos en una página de detalle de experiencia
  const isExperienceDetailPage = pathname?.includes('/experiences/');
  
  return (
    <div className="flex flex-col min-h-screen">
      <TransparentNavbar forceWhite={isExperienceDetailPage} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
