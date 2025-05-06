import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/authController';

// Inicializar controlador de autenticación
const authController = new AuthController();

/**
 * Rutas para la autenticación
 */
export async function authRoutes(fastify: FastifyInstance) {
  // Esquema para la respuesta de éxito
  const successResponseSchema = {
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
              phone: { type: 'string', nullable: true },
              profilePicture: { type: 'string', nullable: true },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' }
            }
          },
          token: { type: 'string' }
        }
      }
    }
  };

  // Registro de usuario
  fastify.post('/signup', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'password', 'role'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          phone: { type: 'string' },
          role: { type: 'string', enum: ['TRAVELER', 'HOST'] }
        }
      },
      response: {
        201: successResponseSchema
      }
    }
  }, authController.register);

  // Inicio de sesión
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      },
      response: {
        200: successResponseSchema
      }
    }
  }, authController.login);

  // Rutas protegidas que requieren autenticación
  fastify.register(async (protectedRoutes) => {
    // Middleware para verificar autenticación
    protectedRoutes.addHook('preHandler', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({
          success: false,
          error: {
            message: 'No autorizado',
            code: 'UNAUTHORIZED'
          }
        });
      }
    });

    // Obtener perfil del usuario
    protectedRoutes.get('/profile', {
      schema: {
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
                      phone: { type: 'string', nullable: true },
                      profilePicture: { type: 'string', nullable: true },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, authController.getProfile);

    // Actualizar perfil del usuario
    protectedRoutes.put('/profile', {
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
            profilePicture: { type: 'string' }
          }
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
                      phone: { type: 'string', nullable: true },
                      profilePicture: { type: 'string', nullable: true },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, authController.updateProfile);

    // Cambiar contraseña
    protectedRoutes.put('/change-password', {
      schema: {
        body: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: { type: 'string' },
            newPassword: { type: 'string', minLength: 6 }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' }
            }
          }
        }
      }
    }, authController.changePassword);
  });
}
