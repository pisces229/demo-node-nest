import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Fs from 'fs';
import { MainModule } from './main.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SystemLogger } from './core/logger/system.logger';
import { DefaultConfigService } from './core/service/default-config.service';

async function bootstrap() {
  console.log(`__dirname:[${__dirname}]`);
  console.log(`__filename:[${__filename}]`);
  Object.entries(process.env)
    .map(([key, value]) => ({ key, value }))
    .filter((f) => f.key.startsWith('APP_'))
    .forEach((f) => console.log(`[${f.key}]:[${f.value}]`));
  // const app = await NestFactory.create(AppModule, {
  //   // logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  //   logger: ['error', 'warn'],
  // });
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    httpsOptions: {
      // ca: '',
      // pfx: '',
      // passphrase: '123456',
      key: Fs.readFileSync(process.env.APP_HTTPS_KEY),
      cert: Fs.readFileSync(process.env.APP_HTTPS_CERT),
    },
  });
  app.useLogger(app.get(SystemLogger));
  // app.enableCors();
  // const app = await NestFactory.create(AppModule, { cors: true });
  // app.setGlobalPrefix('api');
  // app.useGlobalFilters(new Filter());
  // app.use(Middleware);
  // app.useGlobalInterceptors(new Interceptor());
  // app.useGlobalGuards(new Guard());
  const defaultConfigService = app.get(DefaultConfigService);
  setupSwagger(app);
  await app.listen(defaultConfigService.port());
  // app.enableShutdownHooks();
  // await app.close();
  console.log(`https://localhost:${defaultConfigService.port()}`);
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
