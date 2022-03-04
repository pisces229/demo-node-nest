import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class DefaultAppRepository {
  private count = 0;
  constructor() {
    //console.log('DefaultAppRepository');
  }
  async run() {
    return `DefaultAppRepository.run`;
  }
  plusCount = () => ++this.count;
  getCount = () => this.count;
}
