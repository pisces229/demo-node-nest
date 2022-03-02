import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const timestamp = new Date().toISOString();
    const responseObject = {
      title: 'DefaultExceptionFilter',
      code: status,
      message,
      timestamp,
    };
    response.status(status).json(responseObject);
  }
}
