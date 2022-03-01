import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Demo02Service {
  private readonly logger = new Logger(Demo02Service.name);
  constructor() {
    this.logger.log('Demo02Service');
  }
}
