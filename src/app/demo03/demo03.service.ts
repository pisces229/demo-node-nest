import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Demo03Service {
  private readonly logger = new Logger(Demo03Service.name);
  constructor() {
    this.logger.log('Demo03Service');
  }
}
