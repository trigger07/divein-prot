/**
 * Utilidades para formatear datos en la aplicación
 * Estas funciones ayudan a mantener la consistencia en el formato de datos
 * como precios, fechas, números, etc. en toda la aplicación.
 */

/**
 * Formatea un valor monetario según la moneda especificada
 * @param amount - Cantidad a formatear
 * @param currency - Código de moneda (ISO 4217)
 * @param locale - Configuración regional para el formato
 * @returns Cadena formateada con el símbolo de moneda
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'es-ES'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formatea una fecha según el formato especificado
 * @param date - Fecha a formatear (Date o string ISO)
 * @param format - Formato deseado ('short', 'medium', 'long', 'full')
 * @param locale - Configuración regional para el formato
 * @returns Cadena de fecha formateada
 */
export const formatDate = (
  date: Date | string,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'es-ES'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    dateStyle: format,
  }).format(dateObj);
};

/**
 * Formatea una hora según el formato especificado
 * @param date - Fecha/hora a formatear (Date o string ISO)
 * @param format - Formato deseado ('short', 'medium', 'long', 'full')
 * @param locale - Configuración regional para el formato
 * @returns Cadena de hora formateada
 */
export const formatTime = (
  date: Date | string,
  format: 'short' | 'medium' | 'long' | 'full' = 'short',
  locale: string = 'es-ES'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    timeStyle: format,
  }).format(dateObj);
};

/**
 * Formatea un número con separadores de miles y decimales
 * @param number - Número a formatear
 * @param decimals - Cantidad de decimales a mostrar
 * @param locale - Configuración regional para el formato
 * @returns Cadena de número formateada
 */
export const formatNumber = (
  number: number,
  decimals: number = 0,
  locale: string = 'es-ES'
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Formatea un rango de fechas
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha de fin
 * @param locale - Configuración regional para el formato
 * @returns Cadena con el rango de fechas formateado
 */
export const formatDateRange = (
  startDate: Date | string,
  endDate: Date | string,
  locale: string = 'es-ES'
): string => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Si las fechas son en el mismo día
  if (start.toDateString() === end.toDateString()) {
    return `${formatDate(start, 'long', locale)}`;
  }
  
  // Si las fechas son en el mismo mes
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.getDate()} - ${formatDate(end, 'long', locale)}`;
  }
  
  // Si las fechas son en años diferentes
  return `${formatDate(start, 'long', locale)} - ${formatDate(end, 'long', locale)}`;
};

/**
 * Trunca un texto a una longitud máxima y añade puntos suspensivos
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima del texto
 * @returns Texto truncado con puntos suspensivos si es necesario
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formatea una duración en horas y minutos
 * @param hours - Cantidad de horas
 * @param minutes - Cantidad de minutos
 * @returns Cadena formateada con la duración
 */
export const formatDuration = (hours: number, minutes: number = 0): string => {
  if (hours === 0 && minutes === 0) return '0 min';
  
  const parts = [];
  
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`);
  }
  
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
  }
  
  return parts.join(' y ');
};

/**
 * Formatea un valor de calificación (rating) a un número con decimales
 * @param rating - Valor de calificación
 * @param decimals - Cantidad de decimales a mostrar
 * @returns Cadena formateada con la calificación
 */
export const formatRating = (rating: number, decimals: number = 1): string => {
  return rating.toFixed(decimals);
};
