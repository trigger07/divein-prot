import { FastifyInstance } from 'fastify';
import authRoutes from './auth.routes';

/**
 * Registra todas las rutas de la API
 */
export async function registerRoutes(fastify: FastifyInstance) {
  // Prefijo para todas las rutas de la API
  fastify.register(async (api) => {
    // Registrar rutas de autenticación
    api.register(authRoutes, { prefix: '/auth' });

    // TODO: Registrar otras rutas a medida que se implementen
    // api.register(experienceRoutes, { prefix: '/experiences' });
    // api.register(reservationRoutes, { prefix: '/reservations' });
    // api.register(reviewRoutes, { prefix: '/reviews' });
    // api.register(hostRoutes, { prefix: '/host' });
  }, { prefix: '/api' });
}
