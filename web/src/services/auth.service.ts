import axios from 'axios';

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Configuración de axios para incluir cookies en las peticiones
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Servicio de autenticación
 * Proporciona métodos para registrar, iniciar sesión, cerrar sesión y recuperar contraseña
 */
export const AuthService = {
  /**
   * Registrar un nuevo usuario
   * @param name Nombre completo
   * @param email Correo electrónico
   * @param password Contraseña
   * @returns Respuesta con token y datos del usuario
   */
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      
      // Guardar token en localStorage
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw { success: false, message: 'Error de conexión' };
    }
  },
  
  /**
   * Iniciar sesión
   * @param email Correo electrónico
   * @param password Contraseña
   * @returns Respuesta con token y datos del usuario
   */
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      
      // Guardar token en localStorage
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw { success: false, message: 'Error de conexión' };
    }
  },
  
  /**
   * Cerrar sesión
   */
  logout: () => {
    localStorage.removeItem('token');
  },
  
  /**
   * Solicitar recuperación de contraseña
   * @param email Correo electrónico
   * @returns Respuesta de la API
   */
  forgotPassword: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', {
        email,
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw { success: false, message: 'Error de conexión' };
    }
  },
  
  /**
   * Obtener usuario actual
   * @returns Datos del usuario actual
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw { success: false, message: 'Error de conexión' };
    }
  },
  
  /**
   * Verificar si el usuario está autenticado
   * @returns true si hay un token en localStorage
   */
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },
};

export default AuthService;
