import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Shape of the JWT payload attached to the request by JwtAuthGuard. */
export interface JwtUser {
  sub: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Injects the authenticated user (or one of its fields) into a controller
 * handler: `@CurrentUser() user: JwtUser` or `@CurrentUser('sub') id: string`.
 */
export const CurrentUser = createParamDecorator(
  (data: keyof JwtUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
