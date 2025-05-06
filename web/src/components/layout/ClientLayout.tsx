"use client";

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import i18n from '@/i18n';
import MainLayout from './MainLayout';

interface ClientLayoutProps {
  children: React.ReactNode;
}

/**
 * Componente de layout del lado del cliente
 * Contiene los proveedores que requieren "use client"
 */
const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <MainLayout>{children}</MainLayout>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }} 
      />
    </I18nextProvider>
  );
};

export default ClientLayout;
