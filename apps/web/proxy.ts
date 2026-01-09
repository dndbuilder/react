import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the user is authenticated
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Define protected routes
  const protectedRoutes = ["/builder", "/preview", "/dashboard"];

  const guestRoutes = ["/login", "/register"];

  // Check if the request is for a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  // Check if the request is for a guest route
  const isGuestRoute = guestRoutes.some((route) => path.startsWith(route));

  // If the route is protected and the user is not authenticated
  if (isProtectedRoute && !token) {
    // Redirect to the login page
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the route is a guest route and the user is authenticated
  if (isGuestRoute && token) {
    // Redirect to the dashboard or home page
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Continue with the request if the user is authenticated or the route is not protected
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/builder", "/preview", "/dashboard", "/login", "/register"],
};
