'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { getRedirectPathForRole, UserRole } from '@/lib/auth';

/**
 * Hook to redirect users based on their role
 * @param redirectIfUnauthenticated - Path to redirect to if user is not authenticated
 */
export function useRoleBasedRedirect(redirectIfUnauthenticated: string = '/auth/sign-in') {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect based on auth state and role
  React.useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    // If not authenticated, redirect to login
    if (!user) {
      router.replace(redirectIfUnauthenticated);
      return;
    }

    // If authenticated, redirect based on role
    // Note: We don't redirect on every render to avoid interfering with navigation
    // This effect runs when user or auth state changes
  }, [router, user, loading, redirectIfUnauthenticated]);

  /**
   * Function to redirect user to appropriate page based on role
   * Use this in event handlers or effects where you want to perform the redirect
   */
  const redirectToAppropriatePage = React.useCallback(() => {
    if (!user) {
      router.replace(redirectIfUnauthenticated);
      return;
    }

    const redirectPath = getRedirectPathForRole(user.role);
    router.replace(redirectPath);
  }, [router, user, redirectIfUnauthenticated]);

  return { user, loading, redirectToAppropriatePage };
}

/**
 * Component wrapper that automatically redirects based on user role
 * Useful for protecting entire layouts or pages
 */
export function RoleBasedRedirector({
  children,
  redirectIfUnauthenticated = '/auth/sign-in',
}: {
  children: React.ReactNode;
  redirectIfUnauthenticated?: string;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    // If not authenticated, redirect to login
    if (!user) {
      router.replace(redirectIfUnauthenticated);
      return;
    }

    // If authenticated, redirect based on role
    // Only redirect if we're not already on the appropriate page
    const appropriatePath = getRedirectPathForRole(user.role);
    const currentPath = window.location.pathname;

    // Avoid redirect loop by checking if we're already on the right path
    // or if we're on a public auth page when authenticated
    const isOnAuthPage = currentPath.startsWith('/auth/');
    const isOnAppropriatePage =
      currentPath === appropriatePath ||
      currentPath.startsWith(`${appropriatePath}/`) ||
      (user.role === 'admin' && currentPath.startsWith('/admin')) ||
      (user.role === 'customer' && currentPath.startsWith('/account'));

    if (isOnAuthPage && !isOnAppropriatePage) {
      // User is on auth page but should be in app - redirect to app
      router.replace(appropriatePath);
    } else if (!isOnAuthPage && !isOnAppropriatePage) {
      // User is in app but on wrong section - redirect to correct section
      router.replace(appropriatePath);
    }
  }, [router, user, loading, redirectIfUnauthenticated]);

  if (loading) {
    return null; // or return a loading indicator
  }

  return children;
}