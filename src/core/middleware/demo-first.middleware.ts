import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DemoFirstMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    console.log(`DemoFirstMiddleware [STARTED]`);
    request['DEMO_USER'] = { name: 'Pete' };
    request['DEMO_ROLE'] = 'staff';
    response.on('finish', () => {
      console.log(`DemoFirstMiddleware [FINISHED]`);
    });
    response.on('close', () => {
      console.log(`DemoFirstMiddleware [CLOSED]`);
    });
    next();
  }
}
