import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class DefaultRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('DefaultRoleGuard');
    console.log(
      this.reflector.get<string>('DEFAULT_ROLE', context.getHandler()),
    );
    console.log(context.switchToHttp().getRequest()['DEFAULT_ROLE']);
    return (
      this.reflector.get<string>('DEFAULT_ROLE', context.getHandler()) ==
      context.switchToHttp().getRequest()['DEFAULT_ROLE']
    );
  }
}
