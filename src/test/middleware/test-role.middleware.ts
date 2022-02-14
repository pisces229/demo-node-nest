import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestRoleMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    request['role'] = 'staff';
    console.log('TestRoleMiddleware');
    next();
  }
}
