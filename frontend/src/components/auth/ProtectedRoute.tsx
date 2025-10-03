'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader2, Shield, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  fallback,
}) => {
  const router = useRouter();
  const { state, hasPermission, hasRole } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!state.isLoading && !state.isAuthenticated) {
      router.push('/login');
    }
  }, [state.isAuthenticated, state.isLoading, router]);

  // Show loading state while checking authentication
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softBg">
        <Card className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-s1 mx-auto mb-4" />
          <p className="text-bodyText">Checking authentication...</p>
        </Card>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softBg">
        <Card className="p-8 text-center max-w-md">
          <Shield className="w-12 h-12 text-s1 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-mainTextColor mb-2">
            Authentication Required
          </h2>
          <p className="text-bodyText mb-6">
            Please sign in to access this page.
          </p>
          <Button onClick={() => router.push('/login')}>Sign In</Button>
        </Card>
      </div>
    );
  }

  // Check permissions and roles
  const hasRequiredPermissions =
    requiredPermissions.length === 0 ||
    requiredPermissions.some(permission => hasPermission(permission));

  const hasRequiredRoles =
    requiredRoles.length === 0 || requiredRoles.some(role => hasRole(role));

  // Show unauthorized access if user doesn't have required permissions/roles
  if (!hasRequiredPermissions || !hasRequiredRoles) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-softBg">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-mainTextColor mb-2">
            Access Denied
          </h2>
          <p className="text-bodyText mb-6">
            You don't have permission to access this page.
          </p>
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="w-full"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // User is authenticated and has required permissions
  return <>{children}</>;
};
