import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';

import { config } from './config/config';
import { registerRoutes } from './routes';

/**
 * Crea y configura la instancia de Fastify
 */
export async function buildApp(): Promise<FastifyInstance> {
  // Crear instancia de Fastify con opciones de logging
  const app = Fastify({
    logger: {
      level: config.logger.level,
      transport: config.server.isDev
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    },
  });

  // Registrar plugins
  await app.register(cors, {
    origin: config.cors.origin,
    credentials: true,
  });

  await app.register(helmet, {
    contentSecurityPolicy: config.server.isDev ? false : undefined,
  });

  await app.register(jwt, {
    secret: config.jwt.secret,
    sign: {
      expiresIn: config.jwt.expiresIn,
    },
  });

  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Swagger para documentación de API (solo en desarrollo)
  if (config.server.isDev) {
    await app.register(swagger, {
      openapi: {
        info: {
          title: 'DiveIn API',
          description: 'API para la plataforma DiveIn de experiencias turísticas locales',
          version: '1.0.0',
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        }
      },
      exposeRoute: true
    });
  }

  // Registrar rutas
  await registerRoutes(app);

  // Ruta de health check
  app.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Manejador global de errores
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    
    // Determinar el código de estado HTTP
    const statusCode = error.statusCode || 500;
    
    // Preparar la respuesta de error
    const response = {
      success: false,
      error: {
        message: error.message || 'Error interno del servidor',
        code: error.code || 'INTERNAL_SERVER_ERROR',
      },
    };
    
    // Incluir detalles del error en desarrollo
    if (config.server.isDev && error.stack) {
      response.error.stack = error.stack;
    }
    
    reply.status(statusCode).send(response);
  });

  return app;
}
