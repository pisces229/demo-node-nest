import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { DefaultRoleGuard } from '../guard/default-role.guard';

// export const DefaultRoleDecorator = (...args: string[]) => SetMetadata('role', args);
// export const DefaultRoleDecorator = (args: string) => SetMetadata('role', args);
export const DefaultRoleDecorator = (args: string) =>
  applyDecorators(
    SetMetadata('DEFAULT_ROLE', args),
    UseGuards(DefaultRoleGuard),
  );
