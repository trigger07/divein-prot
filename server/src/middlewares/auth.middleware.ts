import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Definir el tipo de payload JWT
interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Middleware para autenticar usuarios mediante JWT
 * Verifica el token y añade el usuario a la solicitud
 */
export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // Verificar el token usando el plugin @fastify/jwt
    const decoded = await request.jwtVerify<JwtPayload>();
    
    // Verificar que el usuario existe en la base de datos
    const dbUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!dbUser) {
      return reply.status(401).send({
        success: false,
        message: 'Usuario no encontrado o token inválido',
      });
    }

    // Continuar con la solicitud
    return;
  } catch (error) {
    // Error de autenticación
    return reply.status(401).send({
      success: false,
      message: 'Acceso no autorizado',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

/**
 * Middleware para autorización basada en roles
 * @param allowedRoles Roles permitidos para acceder al recurso
 */
export const authorize = (allowedRoles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Obtener el token decodificado
      const decoded = await request.jwtVerify<JwtPayload>();
      
      // Verificar el rol
      if (!allowedRoles.includes(decoded.role)) {
        return reply.status(403).send({
          success: false,
          message: 'No tienes permiso para acceder a este recurso',
        });
      }
      
      // Usuario autorizado, continuar
      return;
    } catch (error) {
      // Error en la autorización
      if (error instanceof Error && error.message.includes('token')) {
        return reply.status(401).send({
          success: false,
          message: 'Acceso no autorizado',
          error: error.message,
        });
      }
      
      return reply.status(500).send({
        success: false,
        message: 'Error en la autorización',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };
};
