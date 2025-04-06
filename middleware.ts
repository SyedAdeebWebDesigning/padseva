import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
	"/",
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api/webhook",
	"/view-issues",
	"/view-issues/(.*)", // Allow all routes under /view-issues
	"/verification/(.*)",
]);

// Clerk middleware wrapper
export default clerkMiddleware((auth, request) => {
	// 🔐 Protect against the Next.js middleware authorization bypass vulnerability
	const xMiddlewareSubRequest = request.headers.get("x-middleware-subrequest");
	if (xMiddlewareSubRequest) {
		return new Response("Forbidden", { status: 403 });
	}

	// Protect routes that are not publicly allowed
	if (!isPublicRoute(request)) {
		auth().protect();
	}
});

// Define what routes this middleware applies to
export const config = {
	matcher: [
		// Skip internal Next.js files and static assets
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

		// Always run middleware for API and TRPC routes
		"/(api|trpc)(.*)",
	],
};
