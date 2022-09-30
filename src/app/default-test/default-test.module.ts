import { Module } from '@nestjs/common';
import { DefaultTestController } from './default-test.controller';

@Module({
  controllers: [DefaultTestController],
  providers: [],
})
export class DefaultTestModule {}
