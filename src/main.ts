import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { TestExceptionFilter } from './test/test-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new TestExceptionFilter());
  await app.listen(3000);
}
bootstrap();
