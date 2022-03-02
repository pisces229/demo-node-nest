import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultDynamicService {
  constructor() {
    console.log('DefaultDynamicService');
  }
  run = () => console.log('DefaultDynamicService.run');
}
