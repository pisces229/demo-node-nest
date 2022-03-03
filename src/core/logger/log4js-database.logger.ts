import { Logger as TypeOrmLogger } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';

class Log4jsDatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('DatabaseLogger');
  constructor() {
    this.logger.log('DatabaseLogger');
  }
  logQuery(query: string, parameters?: unknown[]) {
    this.logger.log(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)}`,
    );
  }
  logQueryError(error: string, query: string, parameters?: unknown[]) {
    this.logger.error(
      `${query} -- Parameters: ${this.stringifyParameters(
        parameters,
      )} -- ${error}`,
    );
  }
  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(
      `Time: ${time} -- Parameters: ${this.stringifyParameters(
        parameters,
      )} -- ${query}`,
    );
  }
  logMigration(message: string) {
    this.logger.log(message);
  }
  logSchemaBuild(message: string) {
    this.logger.log(message);
  }
  log(level: 'log' | 'info' | 'warn', message: string) {
    switch (level) {
      case 'log': {
        return this.logger.log(message);
      }
      case 'info': {
        return this.logger.debug(message);
      }
      case 'warn': {
        return this.logger.warn(message);
      }
    }
  }
  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}
export default Log4jsDatabaseLogger;
