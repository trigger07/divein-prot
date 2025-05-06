'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/forms/SignupForm';
import AuthService from '@/services/auth.service';
import { toast } from 'react-hot-toast';

/**
 * Componente del cliente para el registro
 */
export default function SignupClient() {
  const router = useRouter();

  // Manejar el registro
  const handleSignup = async (name: string, email: string, password: string) => {
    try {
      // Llamar al servicio de autenticación
      const response = await AuthService.register(name, email, password);
      
      // Mostrar mensaje de éxito
      toast.success(response.message || 'Registro exitoso');
      
      // Redirigir al usuario a la página principal
      router.push('/');
    } catch (error: any) {
      // Mostrar mensaje de error
      toast.error(error.message || 'Error al registrarse');
      console.error('Error de registro:', error);
    }
  };

  return (
    <SignupForm onSubmit={handleSignup} />
  );
}
