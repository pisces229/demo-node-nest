import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as Fs from 'fs';
import { MainModule } from './main.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import DemoLogger from './core/logger/demo.logger';

async function bootstrap() {
  console.log(`__dirname:${__dirname}`);
  console.log(`__filename:${__filename}`);
  console.log(`NODE_ENV:[${process.env.NODE_ENV}]`);
  // const app = await NestFactory.create(AppModule, {
  //   // logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  //   logger: ['error', 'warn'],
  // });
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    // httpsOptions: {
    //   // pfx: '',
    //   key: Fs.readFileSync('d:/openssl/server/server.key'),
    //   passphrase: '123456',
    //   cert: Fs.readFileSync('d:/openssl/server/server.crt'),
    //   // ca: '',
    // },
  });
  app.useLogger(app.get(DemoLogger));
  // app.enableCors();
  // const app = await NestFactory.create(AppModule, { cors: true });
  // app.setGlobalPrefix('api');
  // app.useGlobalFilters(new Filter());
  // app.use(Middleware);
  // app.useGlobalInterceptors(new Interceptor());
  // app.useGlobalGuards(new Guard());
  const configService = app.get(ConfigService);
  console.log(`ENVIRONMENT:
    [${configService.get<string>('ENVIRONMENT')}]
    [${process.env.ENVIRONMENT}]`);
  console.log(`PORT:
    [${configService.get<string>('PORT')}]
    [${process.env.PORT}]`);
  console.log(`Get:[${configService.get<string>('demo.value')}]`);
  setupSwagger(app);
  await app.listen(configService.get<number>('PORT'));
  // app.enableShutdownHooks();
  // await app.close();
  console.log(`http://localhost:${configService.get<number>('PORT')}`);
}
function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('Demo')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true,
  };
  SwaggerModule.setup('api', app, document, options);
  // http://localhost:3000/api
  // http://localhost:3000/api-json
}
bootstrap();
