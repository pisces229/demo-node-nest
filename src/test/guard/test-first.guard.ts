import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class TestFirstGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('TestFirstGuard');
    return true;
    // return of(false).pipe(delay(2000));
  }
}
