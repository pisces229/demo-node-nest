import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoDynamicService {
  constructor() {
    console.log('DemoDynamicService');
  }
  run = () => console.log('DemoDynamicService.run');
}
