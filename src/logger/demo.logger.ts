import { Injectable, ConsoleLogger } from '@nestjs/common';
import { configure, getLogger, Logger } from 'log4js';

@Injectable()
class DemoLogger extends ConsoleLogger {
  private readonly logger: Logger;
  constructor() {
    console.log('DemoLogger');
    super('', { logLevels: ['error', 'warn', 'log', 'verbose', 'debug'] });
    // super('', { logLevels: ['error', 'warn'] });
    configure({
      appenders: {
        console: {
          type: 'stdout',
          // level: 'all',
          layout: {
            // type: 'basic',
            type: 'pattern',
            pattern: '%d %p %c %X{user} %m',
          },
        },
        // file: { type: 'file', filename: 'log.txt', encoding: 'utf-8' },
        // network: { type: 'tcp', host: 'log.server', port: 12701 },
        file: {
          type: 'file',
          layout: {
            type: 'pattern',
            pattern: '%d %p %c %X{user} %m',
          },
          filename: 'd:/workSpace/demo-node-nest/log.log',
          maxLogSize: 10485760,
          // backups: 3,
          compress: true,
        },
        dateFile: {
          type: 'dateFile',
          layout: {
            type: 'pattern',
            pattern: '%d %p %c %X{user} %m',
          },
          filename: 'd:/workSpace/demo-node-nest/log.log',
          pattern: 'yyyy-MM-dd-hh',
          compress: true,
        },
      },
      categories: {
        default: { appenders: ['console'], level: 'debug' },
        // default: { appenders: ['dateFile'], level: 'debug' },
      },
    });
    this.logger = getLogger();
    this.logger.addContext('user', 'demo');
  }
  log(message: string, context?: string) {
    this.createLog({
      message,
      context,
      level: 'log',
    });
  }
  error(message: string, stack?: string, context?: string) {
    this.createLog({
      message: stack ? stack : message,
      context,
      level: 'error',
    });
  }
  warn(message: string, context?: string) {
    this.createLog({
      message,
      context,
      level: 'warn',
    });
  }
  debug(message: string, context?: string) {
    this.createLog({
      message,
      context,
      level: 'debug',
    });
  }
  verbose(message: string, context?: string) {
    this.createLog({
      message,
      context,
      level: 'verbose',
    });
  }
  private async createLog(data: any) {
    // write to database or file
    if (this.options.logLevels.includes(data.level)) {
      // console.log('[DemoLogger]:', data);
      this.logger.info(data.message);
    }
  }
}
export default DemoLogger;
