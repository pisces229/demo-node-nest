import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class DemoFirstGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('DemoFirstGuard');
    return true;
    // return of(false).pipe(delay(2000));
  }
}
