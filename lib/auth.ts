// Authentication utilities
import { createBrowserClient } from '@/lib/supabase';
import type { Database } from '@/types/database';

export type UserRole = Database['public']['Enums']['user_role'] | null;

export interface AuthUser {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  avatar_url: string | null;
}

/**
 * Get the current user session and profile data
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = createBrowserClient();

    // Get the session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return null;
    }

    // Get the profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('full_name, role, avatar_url')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      // Return basic user info even if profile fetch fails
      return {
        id: session.user.id,
        email: session.user.email ?? null,
        full_name: null,
        role: null,
        avatar_url: null,
      };
    }

    return {
      id: session.user.id,
      email: session.user.email ?? null,
      full_name: profile?.full_name ?? null,
      role: profile?.role ?? null,
      avatar_url: profile?.avatar_url ?? null,
    };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
}

/**
 * Check if the current user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'admin';
}

/**
 * Check if the current user has customer role
 */
export async function isCustomer(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'customer';
}

/**
 * Redirect based on user role
 * @param role - The user's role
 * @param fallback - Default path to redirect to if role is not recognized
 */
export function getRedirectPathForRole(role: UserRole, fallback: string = '/'): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'customer':
      return '/account';
    default:
      return fallback;
  }
}