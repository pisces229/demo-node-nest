import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable({ scope: Scope.REQUEST })
export class DefaultLogger {
  private readonly logger: Logger;
  constructor(@Inject(REQUEST) private readonly request: Request) {
    console.log('DefaultLogger');
    console.log(request.path);
    const filename = request.path
      .replace('/', '')
      .replace(new RegExp('/', 'g'), '.');
    this.logger = createLogger({
      format: format.json(),
      // defaultMeta: { service: 'system' },
      transports: [
        new transports.File({
          filename: `${process.env.APP_LOG_DEST}/${filename}.log`,
          maxsize: 102400,
          maxFiles: 10,
        }),
        new transports.Console(),
      ],
    });
  }
  debug = (message: string) => this.logger.debug(message);
  info = (message: string) => this.logger.info(message);
}
