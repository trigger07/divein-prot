import React from 'react';
import ForgotPasswordClient from './forgot-password-client';

/**
 * Página de recuperación de contraseña (componente del servidor)
 * Muestra un formulario para solicitar el restablecimiento de contraseña
 */
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Formulario de recuperación de contraseña */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <ForgotPasswordClient />
      </div>
      
      {/* Fondo decorativo */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-700">
          {/* Overlay para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4 font-heading">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-lg mb-8 max-w-md">
            No te preocupes, te enviaremos un enlace para que puedas recuperar el acceso a tu cuenta
          </p>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Email de recuperación</h3>
                <p className="text-sm text-white/80">Revisa tu bandeja de entrada</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Proceso seguro</h3>
                <p className="text-sm text-white/80">Protegemos tu información</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
