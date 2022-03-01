import {
  BeforeApplicationShutdown,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { newEnforcer } from 'casbin';
import { DemoDynamicModule } from './common/demo-dynamic.module';
import { DemoCasbinService } from './core/demo-casbin.service';
import { DemoFirstMiddleware } from './core/middleware/demo-first.middleware';
import { DemoExceptionFilter } from './core/filter/demo-exception.filter';
import { DemoFirstGuard } from './core/guard/demo-first.guard';
import { DemoFirstInterceptor } from './core/interceptor/demo-first.interceptor';
import { DemoFirstPipe } from './core/pipe/demo-first.pipe';
import DemoConfigFactory from './config/demo.config';
import DemoLogger from './core/logger/demo.logger';
import { DatabaseModule } from './common/database/database.module';
import { Demo01Module } from './app/demo01/demo01.module';
import { Demo02Module } from './app/demo02/demo02.module';
import { Demo03Module } from './app/demo03/demo03.module';
import { DemoSwaggerModule } from './app/demo-swagger/demo-swagger.module';
import { DemoOrmModule } from './app/demo-orm/demo-orm.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environment/${process.env.NODE_ENV}.env`,
      load: [DemoConfigFactory],
      // envFilePath: ['development.local.env', 'development.env'],
      // expandVariables: true,
    }),
    DemoDynamicModule.register(),
    DatabaseModule,
    Demo01Module,
    Demo02Module,
    Demo03Module,
    DemoSwaggerModule,
    DemoOrmModule,
  ],
  controllers: [],
  providers: [
    DemoLogger,
    // {
    //   provide: Service,
    //   useClass: Service,
    //   scope: Scope.REQUEST,
    // },
    {
      provide: APP_GUARD,
      useClass: DemoFirstGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DemoFirstInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: DemoFirstPipe,
      // provide: APP_PIPE,
      // useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: DemoExceptionFilter,
    },
  ],
})
export class MainModule
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
