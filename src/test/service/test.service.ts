import { Injectable, Scope } from '@nestjs/common';

@Injectable()
// @Injectable({ scope: Scope.REQUEST })
export class TestService {
  constructor() {
    console.log('TestService');
  }
  private readonly data = { title: 'TestService', description: 'Data' };
  getData = () => this.data;
}
