import { Module } from '@nestjs/common';
import { Demo03Controller } from './demo03.controller';
import { Demo03Service } from './demo03.service';

@Module({
  controllers: [Demo03Controller],
  providers: [Demo03Service],
})
export class Demo03Module {}
