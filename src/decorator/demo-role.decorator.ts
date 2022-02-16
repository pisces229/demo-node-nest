import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { DemoRoleGuard } from '../guard/demo-role.guard';

// export const DemoRoleDecorator = (...args: string[]) => SetMetadata('role', args);
// export const DemoRoleDecorator = (args: string) => SetMetadata('role', args);
export const DemoRoleDecorator = (args: string) =>
  applyDecorators(SetMetadata('DEMO_ROLE', args), UseGuards(DemoRoleGuard));
