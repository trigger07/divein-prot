import React from 'react';
import SignupClient from './signup-client';

/**
 * Página de registro (componente del servidor)
 * Muestra un formulario de registro junto con un fondo decorativo
 */
export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Fondo decorativo (a la izquierda en pantallas grandes) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-700">
          {/* Overlay para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-black/10" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4 font-heading">
            Únete a nuestra comunidad
          </h2>
          <p className="text-lg mb-8 max-w-md">
            Descubre experiencias auténticas o comparte tu pasión como anfitrión
          </p>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Registro rápido</h3>
                <p className="text-sm text-white/80">En menos de 2 minutos</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">100% Seguro</h3>
                <p className="text-sm text-white/80">Tus datos protegidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Formulario de registro */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <SignupClient />
      </div>
    </div>
  );
}
