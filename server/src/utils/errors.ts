/**
 * Clase base para errores personalizados de la aplicación
 */
export class AppError extends Error {
  statusCode: number;
  code: string;
  
  constructor(message: string, statusCode = 500, code = 'INTERNAL_SERVER_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error para recursos no encontrados
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Recurso', id?: string) {
    const message = id 
      ? `${resource} con ID ${id} no encontrado` 
      : `${resource} no encontrado`;
    super(message, 404, 'NOT_FOUND');
  }
}

/**
 * Error para solicitudes no autorizadas
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

/**
 * Error para acceso prohibido
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Acceso prohibido') {
    super(message, 403, 'FORBIDDEN');
  }
}

/**
 * Error para solicitudes con datos inválidos
 */
export class BadRequestError extends AppError {
  constructor(message = 'Solicitud inválida') {
    super(message, 400, 'BAD_REQUEST');
  }
}

/**
 * Error para conflictos (ej: recurso ya existe)
 */
export class ConflictError extends AppError {
  constructor(message = 'Conflicto con el estado actual del recurso') {
    super(message, 409, 'CONFLICT');
  }
}

/**
 * Error para validación fallida
 */
export class ValidationError extends AppError {
  errors?: Record<string, string[]>;
  
  constructor(message = 'Error de validación', errors?: Record<string, string[]>) {
    super(message, 422, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

/**
 * Error para servicios externos
 */
export class ExternalServiceError extends AppError {
  constructor(service: string, message = 'Error en servicio externo') {
    super(`${service}: ${message}`, 502, 'EXTERNAL_SERVICE_ERROR');
  }
}
