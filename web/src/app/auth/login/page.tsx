import React from 'react';
import LoginClient from './login-client';

/**
 * Página de inicio de sesión (componente del servidor)
 * Muestra un formulario de inicio de sesión junto con un fondo decorativo
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Formulario de inicio de sesión */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <LoginClient />
      </div>
      
      {/* Fondo decorativo */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700">
          {/* Overlay para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4 font-heading">
            Descubre experiencias únicas
          </h2>
          <p className="text-lg mb-8 max-w-md">
            Conecta con anfitriones locales y vive aventuras auténticas en tu próximo destino
          </p>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Experiencias globales</h3>
                <p className="text-sm text-white/80">En más de 50 países</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Anfitriones locales</h3>
                <p className="text-sm text-white/80">Expertos en su región</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
