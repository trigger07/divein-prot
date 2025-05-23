"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
}

/**
 * Componente de formulario de inicio de sesión
 * Incluye campos para email y contraseña, así como un selector de idioma
 */
const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit,
  isLoading = false
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    // Validar email
    if (!email) {
      newErrors.email = t('errors.required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('errors.invalidEmail');
    }
    
    // Validar contraseña
    if (!password) {
      newErrors.password = t('errors.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      {/* Cabecera del formulario */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 font-heading">
          {t('auth.login.title')}
        </h2>
        
        {/* Selector de idioma */}
        <LanguageSwitcher variant="dropdown" showFlags={true} showNames={false} />
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Campo de email */}
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {t('auth.login.email')}
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
        
        {/* Campo de contraseña */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-neutral-700"
            >
              {t('auth.login.password')}
            </label>
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              {t('auth.login.forgotPassword')}
            </Link>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.password ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        
        {/* Botón de inicio de sesión */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          className="mb-4"
        >
          {t('auth.login.loginButton')}
        </Button>
        
        {/* Separador */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              {t('auth.login.orContinueWith')}
            </span>
          </div>
        </div>
        
        {/* Botones de inicio de sesión con redes sociales */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            className="flex justify-center items-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white hover:bg-neutral-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
              />
              <path
                fill="#FBBC05"
                d="M12,18.1818182 C15.0545455,18.1818182 17.7818182,17.0363636 19.9090909,15.1818182 L16.4181818,11.6909091 C15.2181818,12.6818182 13.6909091,13.2818182 12,13.2818182 C8.86768422,13.2818182 6.21545562,11.2740909 5.27259491,8.46709686 L1.23999023,11.5757576 C3.19957626,15.5282241 7.26888026,18.1818182 12,18.1818182 Z"
              />
              <path
                fill="#4285F4"
                d="M12,13.2818182 C8.8040221,13.2818182 6.17660531,11.3313636 5.23570773,8.57318182 L1.23999023,11.6954545 C3.19957626,15.6318182 7.26888026,18.1818182 12,18.1818182 C14.9127273,18.1818182 17.6054545,17.0672727 19.6545455,15.1545455 L16.2181818,11.8636364 C15.0545455,12.6981818 13.6218182,13.2818182 12,13.2818182 Z"
              />
              <path
                fill="#34A853"
                d="M12,18.1818182 C7.27006974,18.1818182 3.1977497,15.4835203 1.23999023,11.5318182 L5.26620003,8.41727273 C6.19878754,11.2431636 8.85444915,13.2727273 12,13.2727273 C13.6909091,13.2727273 15.2181818,12.6727273 16.4181818,11.6909091 L19.9090909,15.1818182 C17.7818182,17.0363636 15.0545455,18.1818182 12,18.1818182 Z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex justify-center items-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white hover:bg-neutral-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </button>
        </div>
        
        {/* Enlace para registrarse */}
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            {t('auth.login.noAccount')}{' '}
            <Link href="/auth/signup" className="text-primary-600 hover:text-primary-500 font-medium">
              {t('auth.login.signUp')}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
