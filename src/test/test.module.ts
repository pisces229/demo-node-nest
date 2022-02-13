import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TestExceptionFilter } from './filter/test-exception.filter';
import { TestController } from './controller/test.controller';
import { TestService } from './service/test.service';
import { TestFirstMiddleware } from './middleware/test-first.middleware';
import { TestSecondMiddleware } from './middleware/test-second.middleware';
import { TestFirstInterceptor } from './interceptor/test-first.interceptor';
import { TestFirstPipe } from './pipe/test-first.pipe';
import { TestFirstGuard } from './guard/test-first.guard';

@Module({
  controllers: [TestController],
  providers: [
    TestService,
    {
      provide: APP_GUARD,
      useClass: TestFirstGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TestFirstInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: TestFirstPipe,
    },
    {
      provide: APP_FILTER,
      useClass: TestExceptionFilter,
    },
  ],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(TestFirstMiddleware).forRoutes('/todos');
    // consumer
    //   .apply(TestFirstMiddleware)
    //   .forRoutes(
    //     { path: '/todos', method: RequestMethod.POST },
    //     { path: '/', method: RequestMethod.GET },
    //   );
    // consumer
    //   .apply(TestFirstMiddleware)
    //   .exclude({ path: '/todos', method: RequestMethod.GET })
    //   .forRoutes(TestController);
    consumer.apply(TestFirstMiddleware).forRoutes(TestController);
    // consumer
    //   .apply(TestFirstMiddleware, TestSecondMiddleware)
    //   .forRoutes(TestController);
  }
}
