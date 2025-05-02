import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/subscribe",
    "/api/webhook",
    "/subscribe",
    "/success"
  ],
  // Force authentication on dashboard routes
  afterAuth(auth, req, evt) {
    // Redirect to sign in if trying to access protected route without auth
    if (!auth.userId && req.nextUrl.pathname.startsWith('/dashboard')) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  runtime: 'experimental-edge'
};
