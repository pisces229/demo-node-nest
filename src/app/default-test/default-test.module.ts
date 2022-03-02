import { Module } from '@nestjs/common';
import { DefaultTestController } from './default-test.controller';
import { DefaultTestService } from './default-test.service';

@Module({
  controllers: [DefaultTestController],
  providers: [DefaultTestService],
})
export class DefaultTestModule {}
