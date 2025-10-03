import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required permissions
const protectedRoutes = {
  '/dashboard': {
    permissions: ['read:all', 'read:own'],
    roles: ['hr_manager', 'payroll_admin', 'business_owner', 'employee'],
  },
  '/dashboard/employees': {
    permissions: ['read:all', 'read:employees'],
    roles: ['hr_manager', 'payroll_admin'],
  },
  '/dashboard/payroll': {
    permissions: ['read:payroll', 'write:payroll'],
    roles: ['hr_manager', 'payroll_admin'],
  },
  '/dashboard/time-tracking': {
    permissions: ['read:all', 'read:own', 'write:own_timesheet'],
    roles: ['hr_manager', 'payroll_admin', 'employee'],
  },
  '/dashboard/reports': {
    permissions: ['read:reports', 'read:analytics'],
    roles: ['hr_manager', 'payroll_admin', 'business_owner'],
  },
  '/dashboard/settings': {
    permissions: ['admin:all', 'admin:settings'],
    roles: ['hr_manager', 'business_owner'],
  },
};

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/login',
  '/api/auth',
  '/dashboard', // Temporarily allow dashboard - protected by client-side ProtectedRoute component
];

// Helper function to check if a route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    route => pathname === route || pathname.startsWith(route + '/')
  );
}

// Helper function to get route permissions
function getRoutePermissions(pathname: string) {
  // Check for exact match first
  if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
    return protectedRoutes[pathname as keyof typeof protectedRoutes];
  }

  // Check for nested routes
  for (const [route, permissions] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route + '/')) {
      return permissions;
    }
  }

  // Default permissions for dashboard routes
  if (pathname.startsWith('/dashboard')) {
    return {
      permissions: ['read:all', 'read:own'],
      roles: ['hr_manager', 'payroll_admin', 'business_owner', 'employee'],
    };
  }

  return null;
}

// Helper function to parse JWT token (mock implementation)
function parseToken(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (error) {
    return null;
  }
}

// Helper function to check if token is expired
function isTokenExpired(payload: any): boolean {
  if (!payload.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

// Helper function to check user permissions
function hasRequiredPermissions(
  userPermissions: string[],
  requiredPermissions: string[]
): boolean {
  return requiredPermissions.some(permission =>
    userPermissions.includes(permission)
  );
}

// Helper function to check user role
function hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Get authentication token from cookies
  const token = request.cookies.get('accupay_token')?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Parse and validate token
  const payload = parseToken(token);
  if (!payload || isTokenExpired(payload)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('error', 'session_expired');
    return NextResponse.redirect(loginUrl);
  }

  // Get route permissions
  const routePermissions = getRoutePermissions(pathname);
  if (!routePermissions) {
    return NextResponse.next();
  }

  // Check user permissions and role
  const userPermissions = payload.permissions || [];
  const userRole = payload.role;

  const hasPermission = hasRequiredPermissions(
    userPermissions,
    routePermissions.permissions
  );
  const hasRole = hasRequiredRole(userRole, routePermissions.roles);

  if (!hasPermission && !hasRole) {
    // Redirect to unauthorized page or dashboard
    const unauthorizedUrl = new URL('/dashboard', request.url);
    unauthorizedUrl.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
