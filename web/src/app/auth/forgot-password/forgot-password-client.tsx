'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import AuthService from '@/services/auth.service';
import { toast } from 'react-hot-toast';

/**
 * Componente del cliente para la recuperación de contraseña
 */
export default function ForgotPasswordClient() {
  const router = useRouter();

  // Manejar la solicitud de recuperación de contraseña
  const handleForgotPassword = async (email: string) => {
    try {
      // Llamar al servicio de autenticación
      const response = await AuthService.forgotPassword(email);
      
      // Mostrar mensaje de éxito
      toast.success(response.message || 'Solicitud enviada correctamente');
      
      // No redirigimos automáticamente, el componente ForgotPasswordForm 
      // muestra un mensaje de éxito y un botón para volver a la página de inicio de sesión
    } catch (error: any) {
      // Mostrar mensaje de error
      toast.error(error.message || 'Error al procesar la solicitud');
      console.error('Error de recuperación de contraseña:', error);
    }
  };

  return (
    <ForgotPasswordForm onSubmit={handleForgotPassword} />
  );
}
