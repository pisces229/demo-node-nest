import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  private readonly data = { title: 'TestService', description: 'Data' };
  getData = () => this.data;
}
