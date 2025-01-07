import { clerkMiddleware } from '@clerk/nextjs/server';

// Export the default middleware
export default clerkMiddleware();

// Configure the middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|.*\\..*|api|trpc).*)',
    // Always run for API routes
    '/api/(.*)',
  ],
};