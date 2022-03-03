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
  Scope,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DefaultDynamicModule } from './common/default-dynamic.module';
import { DefaultMiddleware } from './core/middleware/default.middleware';
import { DefaultExceptionFilter } from './core/filter/default-exception.filter';
import { DefaultGuard } from './core/guard/default.guard';
import { DefaultInterceptor } from './core/interceptor/default.interceptor';
import { DefaultPipe } from './core/pipe/default.pipe';
import DefaultConfigFactory from './config/default.config';
import DefaultLogger from './core/logger/log4js-system.logger';
import { DatabaseModule } from './common/database/database.module';
import { CoreModule } from './core/core.module';
import { DefaultTestModule } from './app/default-test/default-test.module';
import { DefaultGetModule } from './app/default-get/default-get.module';
import { DefaultPostModule } from './app/default-post/default-post.module';
import { DefaultSwaggerModule } from './app/default-swagger/default-swagger.module';
import { DefaultOrmModule } from './app/default-orm/default-orm.module';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environment/${process.env.NODE_ENV}.env`,
      load: [DefaultConfigFactory],
      // envFilePath: ['development.local.env', 'development.env'],
      // expandVariables: true,
    }),
    DefaultDynamicModule.register(),
    DatabaseModule,
    DefaultTestModule,
    DefaultGetModule,
    DefaultPostModule,
    DefaultSwaggerModule,
    DefaultOrmModule,
  ],
  controllers: [],
  providers: [
    DefaultLogger,
    // {
    //   provide: Service,
    //   useClass: Service,
    //   scope: Scope.REQUEST,
    // },
    {
      provide: APP_GUARD,
      useClass: DefaultGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DefaultInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: DefaultPipe,
      // provide: APP_PIPE,
      // useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: DefaultExceptionFilter,
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
    consumer.apply(DefaultMiddleware).forRoutes('*');
    // consumer.apply(Middleware, Middleware).forRoutes('/router');
    // consumer.apply(Middleware, Middleware).forRoutes(Controller);
    // consumer
    //   .apply(Middleware)
    //   .forRoutes(
    //     { path: '/router', method: RequestMethod.POST },
    //     { path: '/', method: RequestMethod.GET },
    //   );
    // consumer
    //   .apply(Middleware)
    //   .exclude({ path: '/router', method: RequestMethod.GET })
    //   .forRoutes(Controller);
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
