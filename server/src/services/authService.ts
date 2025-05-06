import { PrismaClient, User, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UnauthorizedError, ConflictError, NotFoundError } from '../utils/errors';

// Inicializar cliente Prisma
const prisma = new PrismaClient();

/**
 * Interfaz para datos de registro
 */
interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
}

/**
 * Interfaz para datos de inicio de sesión
 */
interface LoginData {
  email: string;
  password: string;
}

/**
 * Servicio para manejar la autenticación de usuarios
 */
export class AuthService {
  /**
   * Registra un nuevo usuario
   */
  async register(data: RegisterData): Promise<Omit<User, 'password'>> {
    // Verificar si el email ya está en uso
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('El email ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: data.role,
      },
    });

    // Excluir la contraseña de la respuesta
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Inicia sesión con email y contraseña
   */
  async login(data: LoginData): Promise<Omit<User, 'password'>> {
    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    // Excluir la contraseña de la respuesta
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Obtiene un usuario por ID
   */
  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError('Usuario', id);
    }

    // Excluir la contraseña de la respuesta
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Actualiza el perfil de un usuario
   */
  async updateProfile(
    id: string,
    data: Partial<Pick<User, 'name' | 'phone' | 'profilePicture'>>
  ): Promise<Omit<User, 'password'>> {
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundError('Usuario', id);
    }

    // Actualizar el usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    // Excluir la contraseña de la respuesta
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * Cambia la contraseña de un usuario
   */
  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundError('Usuario', id);
    }

    // Verificar contraseña actual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Contraseña actual incorrecta');
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}
