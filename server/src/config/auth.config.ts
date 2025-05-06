import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * Configuración para la autenticación
 */
export const authConfig = {
  // Secreto para firmar tokens JWT
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key-for-development-only',
  
  // Tiempo de expiración de tokens JWT
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // Secreto para tokens de restablecimiento de contraseña
  jwtResetSecret: process.env.JWT_RESET_SECRET || 'reset-secret-key-for-development-only',
  
  // Tiempo de expiración de tokens de restablecimiento (1 hora)
  jwtResetExpiresIn: '1h',
  
  // Configuración de bcrypt
  bcryptSaltRounds: 10,
  
  // URL base del frontend para enlaces de correo electrónico
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};

/**
 * Configuración para SendGrid (envío de correos)
 */
export const emailConfig = {
  apiKey: process.env.SENDGRID_API_KEY || '',
  fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@divein.com',
  templates: {
    welcome: 'd-xxxxxxxxxxxxxxxxxxxxxxxx', // ID de plantilla de bienvenida en SendGrid
    resetPassword: 'd-xxxxxxxxxxxxxxxxxxxxxxxx', // ID de plantilla de restablecimiento de contraseña
  },
};
