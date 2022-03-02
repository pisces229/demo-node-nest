import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
// @Injectable({ scope: Scope.REQUEST })
export class DefaultMiddleware implements NestMiddleware {
  constructor() {
    console.log('DefaultMiddleware');
  }
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
