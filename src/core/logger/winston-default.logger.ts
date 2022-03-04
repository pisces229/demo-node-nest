import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable({ scope: Scope.REQUEST })
export class WinstonDefaultLogger {
  private readonly logger: Logger;
  constructor(@Inject(REQUEST) private readonly request: Request) {
    console.log('WinstonDefaultLogger');
    console.log(request.path);
    const filename = request.path
      .replace('/', '')
      .replace(new RegExp('/', 'g'), '.');
    this.logger = createLogger({
      format: format.json(),
      transports: [
        new transports.File({
          filename: `d:/workspace/demo-node-nest/${filename}.log`,
        }),
      ],
    });
  }
  debug = (message: string) => this.logger.debug(message);
  info = (message: string) => this.logger.info(message);
}
