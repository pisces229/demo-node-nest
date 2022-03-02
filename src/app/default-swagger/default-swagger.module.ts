import { Module } from '@nestjs/common';
import { DefaultSwaggerController } from './default-swagger.controller';

@Module({
  controllers: [DefaultSwaggerController],
  providers: [],
})
export class DefaultSwaggerModule {}
