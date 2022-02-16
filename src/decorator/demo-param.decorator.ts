import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';

// export const DemoParamDecorator = (...args: string[]) => SetMetadata('test-user', args);
export const DemoParamDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('DemoParamDecorator');
    const request = ctx.switchToHttp().getRequest<Request>();
    console.log(request);
    return data ? request['DEMO_USER'][data] : request['DEMO_USER'];
  },
);
