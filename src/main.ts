import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`NODE_ENV:[${process.env.NODE_ENV}]`);
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalFilters(new Filter());
  // app.use(Middleware);
  // app.useGlobalInterceptors(new Interceptor());
  // app.useGlobalGuards(new Guard());
  const configService = app.get(ConfigService);
  console.log(`ENVIRONMENT:[${configService.get<string>('ENVIRONMENT')}]`);
  await app.listen(configService.get<number>('PORT'));
  // app.enableShutdownHooks();
  // await app.close();
  console.log(`http://localhost:${configService.get<number>('PORT')}`);
}
bootstrap();
