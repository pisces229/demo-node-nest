import { Injectable, Scope } from '@nestjs/common';
import { DefaultAppRepository } from './default-app.repository';

@Injectable({ scope: Scope.REQUEST })
export class DefaultAppService {
  constructor(private readonly defaultAppRepository: DefaultAppRepository) {
    //console.log('DefaultAppService');
  }
  async run() {
    return `DefaultAppService.${await this.defaultAppRepository.run()}`;
  }
  plusCount = () => this.defaultAppRepository.plusCount();
  getCount = () => this.defaultAppRepository.getCount();
}
