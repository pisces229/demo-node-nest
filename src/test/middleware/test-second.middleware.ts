import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestSecondMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('TestSecondMiddleware');
    next();
  }
}
