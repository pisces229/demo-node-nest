import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
// @Injectable({ scope: Scope.REQUEST })
export class DefaultInterceptor implements NestInterceptor {
  constructor() {
    console.log('DefaultInterceptor');
  }
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
