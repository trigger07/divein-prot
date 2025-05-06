import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

// Esquemas de validación
const loginSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
});

/**
 * Controladores para la autenticación de usuarios
 */
export const authController = {
  /**
   * Controlador para manejar el registro de usuarios
   */
  register: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Validar datos de entrada
      const validation = registerSchema.safeParse(request.body);
      
      if (!validation.success) {
        return reply.status(400).send({
          success: false,
          message: 'Datos de registro inválidos',
          errors: validation.error.format(),
        });
      }
      
      const { name, email, password } = validation.data;
      
      // Verificar si el correo ya está registrado
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      
      if (existingUser) {
        return reply.status(400).send({
          success: false,
          message: 'El correo electrónico ya está registrado',
        });
      }
      
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Crear nuevo usuario
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'TRAVELER', // Rol por defecto
        },
      });
      
      // Generar token JWT
      const token = await reply.jwtSign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        { expiresIn: '7d' }
      );
      
      // Responder sin incluir la contraseña
      const { password: _, ...userWithoutPassword } = newUser;
      
      return reply.status(201).send({
        success: true,
        message: 'Usuario registrado correctamente',
        data: {
          user: userWithoutPassword,
          token,
        },
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        success: false,
        message: 'Error al registrar usuario',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  },
  
  /**
   * Controlador para manejar el inicio de sesión
   */
  login: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Validar datos de entrada
      const validation = loginSchema.safeParse(request.body);
      
      if (!validation.success) {
        return reply.status(400).send({
          success: false,
          message: 'Datos de inicio de sesión inválidos',
          errors: validation.error.format(),
        });
      }
      
      const { email, password } = validation.data;
      
      // Buscar usuario por correo
      const user = await prisma.user.findUnique({
        where: { email },
      });
      
      if (!user) {
        return reply.status(401).send({
          success: false,
          message: 'Credenciales inválidas',
        });
      }
      
      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return reply.status(401).send({
          success: false,
          message: 'Credenciales inválidas',
        });
      }
      
      // Generar token JWT
      const token = await reply.jwtSign(
        { id: user.id, email: user.email, role: user.role },
        { expiresIn: '7d' }
      );
      
      // Responder sin incluir la contraseña
      const { password: _, ...userWithoutPassword } = user;
      
      return reply.status(200).send({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          user: userWithoutPassword,
          token,
        },
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        success: false,
        message: 'Error al iniciar sesión',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  },
  
  /**
   * Controlador para manejar la recuperación de contraseña
   */
  forgotPassword: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Validar datos de entrada
      const validation = forgotPasswordSchema.safeParse(request.body);
      
      if (!validation.success) {
        return reply.status(400).send({
          success: false,
          message: 'Correo electrónico inválido',
          errors: validation.error.format(),
        });
      }
      
      const { email } = validation.data;
      
      // Verificar si el usuario existe
      const user = await prisma.user.findUnique({
        where: { email },
      });
      
      if (!user) {
        // No revelar si el usuario existe o no por seguridad
        return reply.status(200).send({
          success: true,
          message: 'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña',
        });
      }
      
      // Generar token de recuperación (expira en 1 hora)
      const resetToken = await reply.jwtSign(
        { id: user.id, email: user.email },
        { expiresIn: '1h' }
      );
      
      // En una implementación real, aquí enviaríamos un correo con el enlace de recuperación
      // Por ahora, solo simulamos el proceso
      
      // TODO: Implementar envío de correo con SendGrid
      console.log(`Token de recuperación para ${email}: ${resetToken}`);
      
      return reply.status(200).send({
        success: true,
        message: 'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña',
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        success: false,
        message: 'Error al procesar la solicitud',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  },
  
  /**
   * Controlador para obtener el usuario actual
   */
  getCurrentUser: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // El middleware de autenticación ya verificó el token
      // y añadió el usuario a la solicitud
      const decoded = await request.jwtVerify<{id: string, email: string, role: string}>();
      
      // Buscar usuario en la base de datos
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });
      
      if (!user) {
        return reply.status(404).send({
          success: false,
          message: 'Usuario no encontrado',
        });
      }
      
      // Responder sin incluir la contraseña
      const { password: _, ...userWithoutPassword } = user;
      
      return reply.status(200).send({
        success: true,
        data: {
          user: userWithoutPassword,
        },
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        success: false,
        message: 'Error al obtener usuario actual',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  },
};
