'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/forms/LoginForm';
import AuthService from '@/services/auth.service';
import { toast } from 'react-hot-toast';

/**
 * Componente del cliente para el inicio de sesión
 */
export default function LoginClient() {
  const router = useRouter();

  // Manejar el inicio de sesión
  const handleLogin = async (email: string, password: string) => {
    try {
      // Llamar al servicio de autenticación
      const response = await AuthService.login(email, password);
      
      // Mostrar mensaje de éxito
      toast.success(response.message || 'Inicio de sesión exitoso');
      
      // Redirigir al usuario a la página principal
      router.push('/');
    } catch (error: any) {
      // Mostrar mensaje de error
      toast.error(error.message || 'Error al iniciar sesión');
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <LoginForm onSubmit={handleLogin} />
  );
}
