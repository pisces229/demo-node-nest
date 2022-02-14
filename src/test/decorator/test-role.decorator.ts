import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { TestRoleGuard } from '../guard/test-role.guard';

// export const TestRole = (...args: string[]) => SetMetadata('role', args);
// export const TestRole = (args: string) => SetMetadata('role', args);
export const TestRole = (args: string) =>
  applyDecorators(SetMetadata('role', args), UseGuards(TestRoleGuard));
