import { Injectable, ConsoleLogger } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
class WinstonSystemLogger extends ConsoleLogger {
  private readonly logger: Logger;
  constructor() {
    // super('', { logLevels: ['error', 'warn', 'log', 'verbose', 'debug'] });
    super('', { logLevels: [] });
    console.log('WinstonSystemLogger');
    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      // format.combine(
      //   format.timestamp({
      //     format: 'YYYY-MM-DD HH:mm:ss'
      //   }),
      //   format.errors({ stack: true }),
      //   format.splat(),
      //   format.json()
      // ),
      // defaultMeta: { service: 'default' },
      transports: [
        // new transports.File({ filename: 'quick-start-error.log', level: 'error' }),
        // new transports.File({ filename: 'd:/workspace/demo-node/quick-start-combined.log' }),
        // new transports.Console({ level: 'debug' }),
        new transports.Console(),
      ],
    });
    this.logger.info(`WinstonSystemLogger`);
  }
  log = (message: string, context?: string) =>
    this.logger.info(message, { context });
  error = (message: string, stack?: string, context?: string) =>
    this.logger.error(message, { context });
  warn = (message: string, context?: string) =>
    this.logger.warn(message, { context });
  debug = (message: string, context?: string) =>
    this.logger.debug(message, { context });
  verbose = (message: string, context?: string) =>
    this.logger.verbose(message, { context });
}
export default WinstonSystemLogger;