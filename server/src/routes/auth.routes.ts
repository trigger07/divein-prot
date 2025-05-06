import { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

/**
 * Rutas de autenticación
 * @param fastify Instancia de Fastify
 */
export default async function authRoutes(fastify: FastifyInstance) {
  // Registro de usuario
  fastify.post('/register', {
    schema: {
      tags: ['auth'],
      summary: 'Registrar un nuevo usuario',
      body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                  },
                },
                token: { type: 'string' },
              },
            },
          },
        },
      },
    },
    handler: authController.register,
  });

  // Inicio de sesión
  fastify.post('/login', {
    schema: {
      tags: ['auth'],
      summary: 'Iniciar sesión',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                  },
                },
                token: { type: 'string' },
              },
            },
          },
        },
      },
    },
    handler: authController.login,
  });

  // Recuperación de contraseña
  fastify.post('/forgot-password', {
    schema: {
      tags: ['auth'],
      summary: 'Solicitar recuperación de contraseña',
      body: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
          },
        },
      },
    },
    handler: authController.forgotPassword,
  });

  // Obtener usuario actual
  fastify.get('/me', {
    schema: {
      tags: ['auth'],
      summary: 'Obtener información del usuario actual',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    preHandler: authenticate,
    handler: authController.getCurrentUser,
  });
}
