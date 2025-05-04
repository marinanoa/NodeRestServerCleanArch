import { existsSync, mkdirSync } from 'fs';
import { format, transports, createLogger } from 'winston';
import { join } from 'path';

const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export function buildLogger() {
  const logDir = 'logs';
  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }

  return createLogger({
    level: 'debug',
    format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), logFormat),

    transports: [
      new transports.Console(),
      new transports.File({ filename: join(logDir, 'error.log'), level: 'error' }),
      new transports.File({ filename: join(logDir, 'combined.log') }),
    ],
    exitOnError: false,
  });
}
