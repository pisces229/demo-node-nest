import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DemoCasbinService } from 'src/demo-casbin.service';
import { Request } from 'express';

@Injectable()
export class DemoCasbinGuard implements CanActivate {
  constructor(private readonly demoCasbinService: DemoCasbinService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return this.demoCasbinService.validate(
      'role:people1',
      request.path,
      request.method,
    );
  }
}
