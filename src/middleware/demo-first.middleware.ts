import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DemoFirstMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log('DemoFirstMiddleware');
    request['DEMO_USER'] = { name: 'Pete' };
    request['DEMO_ROLE'] = 'staff';
    next();
  }
}
