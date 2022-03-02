import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class DefaultGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('DefaultGuard [STARTED]');
    return true;
    // return of(false).pipe(delay(2000));
  }
}
