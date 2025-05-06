import { buildApp } from './app';
import { config } from './config/config';

/**
 * Función principal para iniciar el servidor
 */
async function startServer() {
  try {
    // Construir la aplicación Fastify
    const app = await buildApp();

    // Iniciar el servidor
    await app.listen({
      port: config.server.port,
      host: config.server.host === 'localhost' ? '0.0.0.0' : config.server.host,
    });

    // Registrar manejadores para señales de cierre
    const signals = ['SIGINT', 'SIGTERM'] as const;
    for (const signal of signals) {
      process.on(signal, () => {
        app.log.info(`Recibida señal ${signal}, cerrando servidor...`);
        app.close().then(() => {
          app.log.info('Servidor cerrado correctamente');
          process.exit(0);
        });
      });
    }
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer();
