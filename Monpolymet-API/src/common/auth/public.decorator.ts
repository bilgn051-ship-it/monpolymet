import { SetMetadata } from '@nestjs/common';

/**
 * Marks a route (or whole controller) as reachable without authentication.
 * The global JwtAuthGuard skips token checks for anything decorated with it —
 * used for login and the public website's read + application-submit endpoints.
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
