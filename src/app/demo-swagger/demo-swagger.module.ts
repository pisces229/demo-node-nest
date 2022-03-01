import { Module } from '@nestjs/common';
import { DemoSwaggerController } from './demo-swagger.controller';

@Module({
  controllers: [DemoSwaggerController],
  providers: [],
})
export class DemoSwaggerModule {}
