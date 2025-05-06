import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/authService';
import { ValidationError } from '../utils/errors';
import { UserRole } from '@prisma/client';

// Inicializar servicio de autenticación
const authService = new AuthService();

/**
 * Controlador para manejar las operaciones de autenticación
 */
export class AuthController {
  /**
   * Registra un nuevo usuario
   */
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password, phone, role } = request.body as {
        name: string;
        email: string;
        password: string;
        phone?: string;
        role: string;
      };

      // Validar datos
      if (!name || !email || !password) {
        throw new ValidationError('Nombre, email y contraseña son obligatorios');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new ValidationError('Email inválido');
      }

      // Validar contraseña
      if (password.length < 6) {
        throw new ValidationError('La contraseña debe tener al menos 6 caracteres');
      }

      // Validar rol
      const userRole = role as UserRole;
      if (!Object.values(UserRole).includes(userRole)) {
        throw new ValidationError('Rol inválido');
      }

      // Registrar usuario
      const user = await authService.register({
        name,
        email,
        password,
        phone,
        role: userRole,
      });

      // Generar token JWT
      const token = await reply.jwtSign({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return reply.code(201).send({
        success: true,
        message: 'Usuario registrado correctamente',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      // El manejador global de errores se encargará de esto
      throw error;
    }
  }

  /**
   * Inicia sesión con email y contraseña
   */
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      // Validar datos
      if (!email || !password) {
        throw new ValidationError('Email y contraseña son obligatorios');
      }

      // Iniciar sesión
      const user = await authService.login({ email, password });

      // Generar token JWT
      const token = await reply.jwtSign({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return reply.code(200).send({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      // El manejador global de errores se encargará de esto
      throw error;
    }
  }

  /**
   * Obtiene el perfil del usuario autenticado
   */
  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.user as { id: string };

      // Obtener usuario
      const user = await authService.getUserById(id);

      return reply.code(200).send({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      // El manejador global de errores se encargará de esto
      throw error;
    }
  }

  /**
   * Actualiza el perfil del usuario autenticado
   */
  async updateProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.user as { id: string };
      const { name, phone, profilePicture } = request.body as {
        name?: string;
        phone?: string;
        profilePicture?: string;
      };

      // Actualizar perfil
      const user = await authService.updateProfile(id, {
        name,
        phone,
        profilePicture,
      });

      return reply.code(200).send({
        success: true,
        message: 'Perfil actualizado correctamente',
        data: {
          user,
        },
      });
    } catch (error) {
      // El manejador global de errores se encargará de esto
      throw error;
    }
  }

  /**
   * Cambia la contraseña del usuario autenticado
   */
  async changePassword(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.user as { id: string };
      const { currentPassword, newPassword } = request.body as {
        currentPassword: string;
        newPassword: string;
      };

      // Validar datos
      if (!currentPassword || !newPassword) {
        throw new ValidationError('Contraseña actual y nueva son obligatorias');
      }

      // Validar nueva contraseña
      if (newPassword.length < 6) {
        throw new ValidationError('La nueva contraseña debe tener al menos 6 caracteres');
      }

      // Cambiar contraseña
      await authService.changePassword(id, currentPassword, newPassword);

      return reply.code(200).send({
        success: true,
        message: 'Contraseña actualizada correctamente',
      });
    } catch (error) {
      // El manejador global de errores se encargará de esto
      throw error;
    }
  }
}
