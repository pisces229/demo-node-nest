import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  console.log(`NODE_ENV:[${process.env.NODE_ENV}]`);
  const app = await NestFactory.create(AppModule);
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
