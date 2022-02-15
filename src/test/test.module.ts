import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
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
import { TestUserMiddleware } from './middleware/test-user.middleware';
import { TestRoleMiddleware } from './middleware/test-role.middleware';
import { MulterModule } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Agent } from 'https';

@Module({
  imports: [
    HttpModule,
    // HttpModule.register({
    //   timeout: 5000,
    //   maxRedirects: 5,
    //   httpsAgent: new Agent({ rejectUnauthorized: false }),
    // }),
    // HttpModule.registerAsync({
    //   useFactory: () => ({
    //     timeout: 5000,
    //     maxRedirects: 5,
    //     httpsAgent: new Agent({ rejectUnauthorized: false }),
    //   }),
    // }),
    // HttpModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     timeout: configService.get('HTTP_TIMEOUT'),
    //     maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
    //     httpsAgent: new Agent({ rejectUnauthorized: false }),
    //   }),
    //   inject: [ConfigService],
    // }),
    MulterModule.register({
      //dest: './upload',
      dest: 'd:/workSpace/demo-node-nest/upload',
    }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: (
    //       request: Request,
    //       file: Express.Multer.File,
    //       callback: (error: Error | null, destination: string) => void,
    //     ) => {
    //       //callback(null, join(__dirname, '/upload/'));
    //       callback(null, 'd:/workSpace/demo-node-nest/upload');
    //     },
    //     filename: (
    //       request: Request,
    //       file: Express.Multer.File,
    //       callback: (error: Error | null, destination: string) => void,
    //     ) => {
    //       callback(null, `${new Date().getTime()}-${file.originalname}`);
    //     },
    //   }),
    // }),
  ],
  controllers: [TestController],
  providers: [
    TestService,
    // {
    //   provide: TestService,
    //   useClass: TestService,
    //   scope: Scope.REQUEST,
    // },
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
    consumer.apply(TestUserMiddleware).forRoutes(TestController);
    consumer.apply(TestRoleMiddleware).forRoutes(TestController);
  }
}
