import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DefaultCasbinService } from 'src/core/service/default-casbin.service';
import { Request } from 'express';

@Injectable()
export class DefaultCasbinGuard implements CanActivate {
  constructor(private readonly defaultCasbinService: DefaultCasbinService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return this.defaultCasbinService.validate(
      'role:people1',
      request.path,
      request.method,
    );
  }
}
