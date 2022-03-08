import { Logger as TypeOrmLogger } from 'typeorm';
import { createLogger, format, Logger, transports } from 'winston';

export class DatabaseLogger implements TypeOrmLogger {
  private readonly logger: Logger;
  constructor() {
    this.logger = createLogger({
      format: format.json(),
      transports: [
        new transports.File({
          filename: `d:/workspace/demo-node-nest/database.log`,
          maxsize: 102400,
          maxFiles: 10,
        }),
      ],
    });
  }
  logQuery(query: string, parameters?: unknown[]) {
    this.logger.info(
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
    this.logger.info(message);
  }
  logSchemaBuild(message: string) {
    this.logger.info(message);
  }
  log(level: 'log' | 'info' | 'warn', message: string) {
    switch (level) {
      case 'log': {
        return this.logger.info(message);
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
