import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import DemoConfigFactory from './config/demo.config';
import { DemoSwaggerController } from './demo/demo-swagger/demo-swagger.controller';
import { Demo01Controller } from './demo/demo01/demo01.controller';
import { Demo01Service } from './demo/demo01/demo01.service';
import { Demo02Controller } from './demo/demo02/demo02.controller';
import { Demo02Service } from './demo/demo02/demo02.service';
import { Demo03Controller } from './demo/demo03/demo03.controller';
import { Demo03Service } from './demo/demo03/demo03.service';
import { DemoExceptionFilter } from './filter/demo-exception.filter';
import { DemoFirstGuard } from './guard/demo-first.guard';
import { DemoFirstInterceptor } from './interceptor/demo-first.interceptor';
import { DemoFirstPipe } from './pipe/demo-first.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environment/${process.env.NODE_ENV}.env`,
      load: [DemoConfigFactory],
      // envFilePath: ['development.local.env', 'development.env'],
      // expandVariables: true,
    }),
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // const secret = config.get<string>('secrets.jwt');
        const secret = 'qwertyuiop';
        return {
          secret,
          signOptions: {
            expiresIn: '60s',
            // expiresIn: '0s',
          },
        };
      },
    }),
  ],
  controllers: [
    Demo01Controller,
    Demo02Controller,
    Demo03Controller,
    DemoSwaggerController,
  ],
  providers: [
    // {
    //   provide: Service,
    //   useClass: Service,
    //   scope: Scope.REQUEST,
    // },
    Demo01Service,
    Demo02Service,
    Demo03Service,
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
    },
    {
      provide: APP_FILTER,
      useClass: DemoExceptionFilter,
    },
  ],
})
export class DemoModule {}
