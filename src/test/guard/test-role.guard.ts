import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class TestRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('TestRoleGuard');
    console.log(this.reflector.get<string>('role', context.getHandler()));
    console.log(context.switchToHttp().getRequest().role);
    return (
      this.reflector.get<string>('role', context.getHandler()) ==
      context.switchToHttp().getRequest().role
    );
  }
}
