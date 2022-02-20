import {
  BeforeApplicationShutdown,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoFirstMiddleware } from './middleware/demo-first.middleware';
import { DemoModule } from './demo.module';
import DemoLogger from './logger/demo.logger';

@Module({
  imports: [DemoModule],
  controllers: [AppController],
  providers: [DemoLogger, AppService],
})
export class AppModule
  implements
    NestModule,
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoFirstMiddleware).forRoutes('*');
    // consumer.apply(DemoFirstMiddleware, DemoSecondMiddleware).forRoutes('/router');
    // consumer.apply(DemoFirstMiddleware, DemoSecondMiddleware).forRoutes(Controller);
    // consumer
    //   .apply(DemoFirstMiddleware)
    //   .forRoutes(
    //     { path: '/router', method: RequestMethod.POST },
    //     { path: '/', method: RequestMethod.GET },
    //   );
    // consumer
    //   .apply(DemoFirstMiddleware)
    //   .exclude({ path: '/router', method: RequestMethod.GET })
    //   .forRoutes(TestController);
  }
  onModuleInit() {
    console.log(`onModuleInit`);
  }
  onModuleDestroy() {
    console.log(`onModuleDestroy`);
  }
  onApplicationBootstrap() {
    console.log(`onApplicationBootstrap`);
  }
  beforeApplicationShutdown(signal?: string) {
    console.log(`onApplicationShutdown:[${signal}]`);
  }
  onApplicationShutdown(signal?: string) {
    console.log(`onApplicationShutdown:[${signal}]`);
  }
}
