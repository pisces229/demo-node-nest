import { Controller, Get, Scope } from '@nestjs/common';
import { DefaultAppService } from './default-app.service';

@Controller({ path: 'default-app', scope: Scope.REQUEST })
export class DefaultAppController {
  constructor(private readonly defaultAppService: DefaultAppService) {
    //console.log('DefaultAppController');
  }
  @Get('run')
  async run() {
    return `DefaultAppController.${await this.defaultAppService.run()}`;
  }
}
