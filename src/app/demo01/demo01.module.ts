import { Module } from '@nestjs/common';
import { Demo01Controller } from './demo01.controller';
import { Demo01Service } from './demo01.service';

@Module({
  controllers: [Demo01Controller],
  providers: [Demo01Service],
})
export class Demo01Module {}
