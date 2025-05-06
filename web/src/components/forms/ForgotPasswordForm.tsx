"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

/**
 * Componente de formulario para recuperación de contraseña
 * Incluye campo para email y selector de idioma
 */
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onSubmit,
  isLoading = false
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
    } = {};
    
    // Validar email
    if (!email) {
      newErrors.email = t('errors.required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('errors.invalidEmail');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      {/* Cabecera del formulario */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 font-heading">
          {t('auth.forgotPassword.title')}
        </h2>
        
        {/* Selector de idioma */}
        <LanguageSwitcher variant="dropdown" showFlags={true} showNames={false} />
      </div>
      
      {isSubmitted ? (
        // Mensaje de éxito
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            {t('common.success')}
          </h3>
          <p className="text-neutral-600 mb-6">
            {t('auth.forgotPassword.emailSent', { email })}
          </p>
          <Button 
            href="/auth/login" 
            variant="primary"
          >
            {t('auth.forgotPassword.backToLogin')}
          </Button>
        </div>
      ) : (
        // Formulario
        <form onSubmit={handleSubmit}>
          <p className="text-neutral-600 mb-6">
            {t('auth.forgotPassword.instructions')}
          </p>
          
          {/* Campo de email */}
          <div className="mb-6">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              {t('auth.forgotPassword.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.email ? 'border-red-500' : 'border-neutral-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          
          {/* Botón de envío */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            className="mb-4"
          >
            {t('auth.forgotPassword.sendButton')}
          </Button>
          
          {/* Enlace para volver a iniciar sesión */}
          <div className="text-center mt-4">
            <Link 
              href="/auth/login" 
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              {t('auth.forgotPassword.backToLogin')}
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
