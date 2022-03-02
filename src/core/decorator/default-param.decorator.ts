import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';

// export const DefaultParamDecorator = (...args: string[]) => SetMetadata('test-user', args);
export const DefaultParamDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('DefaultParamDecorator');
    const request = ctx.switchToHttp().getRequest<Request>();
    console.log(request);
    return data ? request['DEFAULT_USER'][data] : request['DEFAULT_USER'];
  },
);
