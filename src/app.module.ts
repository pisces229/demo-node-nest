import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environment/${process.env.NODE_ENV}.env`,
      // envFilePath: ['development.local.env', 'development.env'],
      // expandVariables: true,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
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
