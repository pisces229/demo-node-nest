import { Injectable, ConsoleLogger } from '@nestjs/common';
import { configure, getLogger, Logger } from 'log4js';

@Injectable()
class Log4jsSystemLogger extends ConsoleLogger {
  private readonly logger: Logger;
  constructor() {
    // super('', { logLevels: ['error', 'warn', 'log', 'verbose', 'debug'] });
    super('', { logLevels: [] });
    console.log('Log4jsSystemLogger');
    configure({
      appenders: {
        console: {
          type: 'stdout',
          layout: {
            type: 'pattern',
            pattern: '%d %p %c %m',
          },
        },
        file: {
          type: 'file',
          layout: {
            type: 'pattern',
            pattern: '%d %p %c %m',
          },
          filename: 'd:/workSpace/demo-node-nest/log.log',
          maxLogSize: 10485760,
          // backups: 3,
          compress: true,
        },
        multiFile: {
          type: 'multiFile',
          layout: {
            type: 'pattern',
            pattern: '%d %p %c %m',
          },
          base: 'd:/workSpace/demo-node-nest/',
          property: 'system',
          pattern: 'yyyy-MM-dd-hh',
          extension: '.log',
          compress: true,
        },
        dateFile: {
          type: 'dateFile',
          layout: {
            type: 'pattern',
            pattern: '%d %p %c %m',
          },
          filename: 'd:/workSpace/demo-node-nest/system.log',
          maxLogSize: 10240,
          pattern: 'yyyy-MM-dd-hh',
          compress: true,
        },
      },
      categories: {
        // default: { appenders: ['console', 'dateFile'], level: 'all' },
        default: { appenders: ['console'], level: 'all' },
      },
    });
    this.logger = getLogger();
  }
  log = (message: string, context?: string) =>
    this.logger.info(message, context);
  error = (message: string, stack?: string, context?: string) =>
    this.logger.error(message, context);
  warn = (message: string, context?: string) =>
    this.logger.warn(message, context);
  debug = (message: string, context?: string) =>
    this.logger.debug(message, context);
  verbose = (message: string, context?: string) =>
    this.logger.trace(message, context);
}
export default Log4jsSystemLogger;
