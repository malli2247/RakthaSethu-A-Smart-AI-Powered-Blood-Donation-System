import morgan from 'morgan';

export const requestLogger = morgan('combined');

export function logInfo(message: string, metadata?: Record<string, unknown>) {
  console.info(JSON.stringify({ level: 'info', message, ...metadata }));
}

export function logError(message: string, metadata?: Record<string, unknown>) {
  console.error(JSON.stringify({ level: 'error', message, ...metadata }));
}
