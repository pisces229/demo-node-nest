import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DefaultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('DefaultInterceptor [STARTED]');
    // const controller: TestController = context.getClass<TestController>();
    // const method: Function = context.getHandler();
    return next.handle();
    // const input = Date.now();
    // return next
    //   .handle()
    //   .pipe(tap(() => console.log(`${Date.now() - input} ms`)));
  }
}