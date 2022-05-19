import { Injectable, Scope } from '@nestjs/common';
import { DefaultLogger } from 'src/core/logger/default.logger';
import { DefaultConfigService } from 'src/core/service/default-config.service';
import { DefaultAppRepository } from './default-app.repository';

@Injectable({ scope: Scope.REQUEST })
export class DefaultAppService {
  constructor(
    private readonly defaultLogger: DefaultLogger,
    private readonly defaultConfigService: DefaultConfigService,
    private readonly defaultAppRepository: DefaultAppRepository,
  ) {
    this.defaultLogger.info(defaultConfigService.environment());
  }
  async run() {
    return `DefaultAppService.${await this.defaultAppRepository.run()}`;
  }
  plusCount = () => this.defaultAppRepository.plusCount();
  getCount = () => this.defaultAppRepository.getCount();
}
