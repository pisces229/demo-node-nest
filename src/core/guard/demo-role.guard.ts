import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class DemoRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('DemoRoleGuard');
    console.log(this.reflector.get<string>('DEMO_ROLE', context.getHandler()));
    console.log(context.switchToHttp().getRequest()['DEMO_ROLE']);
    return (
      this.reflector.get<string>('DEMO_ROLE', context.getHandler()) ==
      context.switchToHttp().getRequest()['DEMO_ROLE']
    );
  }
}
