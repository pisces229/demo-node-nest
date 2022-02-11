import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TestExceptionFilter } from './test-exception.filter';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  controllers: [TestController],
  providers: [
    TestService,
    // {
    //   provide: APP_FILTER,
    //   useClass: TestExceptionFilter,
    // },
  ],
})
export class TestModule {}
