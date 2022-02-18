import { Inject, Injectable } from '@nestjs/common';
import { Enforcer } from 'casbin';

@Injectable()
export class DemoCasbinService {
  constructor(
    @Inject('DEMO_CASBIN_ENFORCER') private readonly enforcer: Enforcer,
  ) {
    console.log('DemoCasbinService');
  }
  public validate(subject: string, object: string, action: string) {
    return this.enforcer.enforce(subject, object, action);
  }
  // public mappingAction(method: string): string {
  //   switch (method.toUpperCase()) {
  //     case 'GET':
  //       return AuthorizationAction.READ;
  //     case 'POST':
  //       return AuthorizationAction.CREATE;
  //     case 'PATCH':
  //     case 'PUT':
  //       return AuthorizationAction.UPDATE;
  //     case 'DELETE':
  //       return AuthorizationAction.DELETE;
  //     default:
  //       return AuthorizationAction.NONE;
  //   }
  // }
}
