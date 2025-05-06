import dotenv from 'dotenv';
import { z } from 'zod';

// Cargar variables de entorno
dotenv.config();

// Esquema de validación para variables de entorno
const envSchema = z.object({
  // Base de datos
  DATABASE_URL: z.string(),

  // JWT
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Servicios externos
  SUPABASE_URL: z.string().optional(),
  SUPABASE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_FROM_EMAIL: z.string().optional(),

  // Servidor
  PORT: z.string().transform(val => parseInt(val, 10)).default('3001'),
  HOST: z.string().default('localhost'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Cors
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:19006'),

  // Logging
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

// Validar y extraer variables de entorno
const _env = envSchema.safeParse(process.env);

// Manejar errores de validación
if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

// Exportar configuración validada
export const config = {
  database: {
    url: _env.data.DATABASE_URL,
  },
  jwt: {
    secret: _env.data.JWT_SECRET,
    expiresIn: _env.data.JWT_EXPIRES_IN,
  },
  services: {
    supabase: {
      url: _env.data.SUPABASE_URL,
      key: _env.data.SUPABASE_KEY,
    },
    stripe: {
      secretKey: _env.data.STRIPE_SECRET_KEY,
      webhookSecret: _env.data.STRIPE_WEBHOOK_SECRET,
    },
    sendgrid: {
      apiKey: _env.data.SENDGRID_API_KEY,
      fromEmail: _env.data.SENDGRID_FROM_EMAIL,
    },
  },
  server: {
    port: _env.data.PORT,
    host: _env.data.HOST,
    nodeEnv: _env.data.NODE_ENV,
    isDev: _env.data.NODE_ENV === 'development',
    isProd: _env.data.NODE_ENV === 'production',
    isTest: _env.data.NODE_ENV === 'test',
  },
  cors: {
    origin: _env.data.CORS_ORIGIN.split(','),
  },
  logger: {
    level: _env.data.LOG_LEVEL,
  },
};
