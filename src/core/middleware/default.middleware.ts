import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DefaultMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log(`DefaultMiddleware [STARTED]`);
    request['DEMO_USER'] = { name: 'Pete' };
    request['DEMO_ROLE'] = 'staff';
    response.on('finish', () => {
      console.log(`DefaultMiddleware [FINISHED]`);
    });
    response.on('close', () => {
      console.log(`DefaultMiddleware [CLOSED]`);
    });
    next();
  }
}
