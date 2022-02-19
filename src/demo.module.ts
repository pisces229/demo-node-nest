import { HttpModule } from '@nestjs/axios';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { newEnforcer } from 'casbin';
import { AppService } from './app.service';
import DemoConfigFactory from './config/demo.config';
import { DemoDynamicModule } from './demo-dynamic.module';
import { DemoDynamicService } from './demo-dynamic.service';
import { DemoCasbinService } from './demo-casbin.service';
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
import { Connection, createConnection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoOrmController } from './demo/demo-orm/demo-orm.controller';
import { DemoOrmService } from './demo/demo-orm/demo-orm.service';
import { First } from './entities/first.entity';

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
    TypeOrmModule.forRoot({
      name: 'DemoConnection',
      // mssql
      // type: 'mssql',
      // host: 'localhost',
      // port: 1433,
      // username: 'username',
      // password: 'password',
      // database: 'database',
      // sqlite
      type: 'sqlite',
      database: 'd:/Database/SQLite/DemoNodeNest.db',
      // entities
      // entities: [__dirname + '/src/entities/*.entity{.ts,.js}'],
      // entities: [First],
      autoLoadEntities: true,
      // synchronize: true,
    }),
    TypeOrmModule.forFeature([First], 'DemoConnection'),
    DemoDynamicModule.register(),
  ],
  controllers: [
    Demo01Controller,
    Demo02Controller,
    Demo03Controller,
    DemoSwaggerController,
    DemoOrmController,
  ],
  providers: [
    // {
    //   provide: 'TypeORMInstance',
    //   useFactory: async () =>
    //     await createConnection({
    //       // mssql
    //       // type: 'mssql',
    //       // host: 'localhost',
    //       // port: 1433,
    //       // username: 'username',
    //       // password: 'password',
    //       // database: 'database',
    //       // sqlite
    //       type: 'sqlite',
    //       database: 'd:/Database/SQLite/DemoNodeNest.db',
    //       // entities
    //       entities: [__dirname + '/scr/entities/*.entity{.ts,.js}'],
    //     }),
    // },
    // {
    //   provide: 'FirstRepository',
    //   useFactory: (connection: Connection) => connection.getRepository(First),
    //   inject: ['TypeORMInstance'],
    // },
    // {
    //   provide: Service,
    //   useClass: Service,
    //   scope: Scope.REQUEST,
    // },
    Demo01Service,
    Demo02Service,
    Demo03Service,
    DemoOrmService,
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
    {
      provide: 'DEMO_CASBIN_ENFORCER',
      useFactory: async () =>
        await newEnforcer('casbin/model.conf', 'casbin/policy.csv'),
    },
    DemoCasbinService,
  ],
})
export class DemoModule {}
