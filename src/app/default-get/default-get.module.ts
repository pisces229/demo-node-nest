import { Module } from '@nestjs/common';
import { DefaultGetController } from './default-get.controller';

@Module({
  controllers: [DefaultGetController],
  providers: [],
})
export class DefaultGetModule {}
