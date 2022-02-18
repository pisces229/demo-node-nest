import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('AppService');
  }
  getHello(): string {
    console.log('AppService getHello');
    return 'Hello World!';
  }
}
