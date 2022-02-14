import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestUserMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('TestUserMiddleware');
    request['user'] = { name: 'HAO' };
    next();
  }
}
