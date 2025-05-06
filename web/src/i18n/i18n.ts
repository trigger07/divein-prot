import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones
import esTranslation from './locales/es.json';
import enTranslation from './locales/en.json';

// Configuración de i18next
i18n
  // Detectar idioma del navegador
  .use(LanguageDetector)
  // Pasar el módulo i18n a react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    // Recursos de traducción
    resources: {
      es: {
        translation: esTranslation
      },
      en: {
        translation: enTranslation
      }
    },
    // Idioma por defecto
    fallbackLng: 'es',
    // Depuración en desarrollo
    debug: process.env.NODE_ENV === 'development',
    // Opciones de detección de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    // Opciones de interpolación
    interpolation: {
      escapeValue: false // React ya escapa los valores
    }
  });

export default i18n;
