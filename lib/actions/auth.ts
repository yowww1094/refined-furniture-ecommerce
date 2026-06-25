'use server';

import { z } from 'zod';
import { createServerClient } from '@/lib/supabase';
import { signInSchema, signUpSchema } from '@/lib/validation';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// Sign in action
export async function signInWithCredentials(
  prevState: { error: string | null } | undefined,
  formData: FormData
) {
  // Validate form data
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid email or password' };
  }

  const { email, password } = validatedFields.data;

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    // Redirect to account dashboard on success
    redirect('/account');
  } catch (error: any) {
    return { error: error.message };
  }
}

// Sign up action
export async function signUpWithEmail(
  prevState: { error: string | null; success: string | null } | undefined,
  formData: FormData
) {
  // Validate form data
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    fullName: formData.get('fullName'),
  });

  if (!validatedFields.success) {
    return { error: 'Please fix the errors in the form', success: null };
  }

  const { email, password, fullName } = validatedFields.data;

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { error: error.message, success: null };
    }

    // Return success message - user needs to check email for confirmation
    return {
      error: null,
      success: 'Check your email to confirm your account. You can sign in once your email is verified.'
    };
  } catch (error: any) {
    return { error: error.message, success: null };
  }
}

// Sign out action
export async function signOutUser() {
  try {
    const supabase = await createServerClient();
    await supabase.auth.signOut();

    // Redirect to home page after sign out
    redirect('/');
  } catch (error: any) {
    // Even if sign out fails, redirect to home
    redirect('/');
  }
}

// Forgot password action
export async function requestPasswordReset(
  prevState: { error: string | null; success: string | null } | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address', success: null };
  }

  try {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // You can set a redirect URL here if needed
      // redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
    });

    if (error) {
      return { error: error.message, success: null };
    }

    // Return success message
    return {
      error: null,
      success: 'If an account exists with that email, you will receive a password reset link.'
    };
  } catch (error: any) {
    return { error: error.message, success: null };
  }
}