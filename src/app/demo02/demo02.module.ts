import { Module } from '@nestjs/common';
import { Demo02Controller } from './demo02.controller';
import { Demo02Service } from './demo02.service';

@Module({
  controllers: [Demo02Controller],
  providers: [Demo02Service],
})
export class Demo02Module {}
