import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestSecondMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('TestSecondMiddleware');
    next();
  }
}
