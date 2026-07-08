import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../modules/users/schemas/user.schema';

/**
 * Restricts a route to the given roles. Enforced by RolesGuard, which runs
 * after JwtAuthGuard so `request.user` is already populated.
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
