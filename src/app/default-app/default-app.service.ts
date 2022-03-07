import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonDefaultLogger } from 'src/core/logger/winston-default.logger';
import { DefaultAppRepository } from './default-app.repository';

@Injectable({ scope: Scope.REQUEST })
export class DefaultAppService {
  constructor(
    private readonly winstonDefaultLogger: WinstonDefaultLogger,
    private readonly configService: ConfigService,
    private readonly defaultAppRepository: DefaultAppRepository,
  ) {
    //console.log('DefaultAppService');
    this.winstonDefaultLogger.debug(
      `${new Date().toISOString()} SERVER_PORT':
      ${this.configService.get<number>('server.port')}`,
    );
    this.winstonDefaultLogger.debug(
      `${new Date().toISOString()} SERVER_ENVIRONMENT:
      ${this.configService.get<string>('server.environment')}`,
    );
  }
  async run() {
    return `DefaultAppService.${await this.defaultAppRepository.run()}`;
  }
  plusCount = () => this.defaultAppRepository.plusCount();
  getCount = () => this.defaultAppRepository.getCount();
}
