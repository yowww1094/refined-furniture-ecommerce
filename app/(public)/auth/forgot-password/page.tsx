import { useFormState } from 'react-dom';
import { requestPasswordReset } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SubmitButton } from '@/components/auth/SubmitButton';

export default function ForgotPasswordPage() {
  const [formState, formAction] = useFormState(requestPasswordReset, {
    error: null,
    success: null
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Forgot Password
          </h1>
          <p className="text-center text-muted-foreground">
            Enter your email address to receive a link to reset your password.
          </p>
        </div>

        {formState.error && (
          <Alert variant="destructive" className="w-full">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.error}</AlertDescription>
          </Alert>
        )}

        {formState.success && (
          <Alert variant="default" className="w-full">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{formState.success}</AlertDescription>
          </Alert>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              className={formState.error?.includes('email') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('email') ? formState.error : undefined}
            />
          </div>

          <SubmitButton>
            Send Reset Link
          </SubmitButton>
        </form>

        <div className="text-center text-sm">
          Remember your password?{' '}
          <a href="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign In
          </a>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/auth/sign-up" className="font-medium text-primary hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

// We need to import FieldError from the auth components
// Since we are in the auth directory, we can use a relative path
// But note: we are in app/(public)/auth/forgot-password/page.tsx
// So we can use: import { FieldError } from '@/components/auth/FieldError';
// However, we already used FieldError above without importing. Let's fix that.

// Actually, we used FieldError in the form but didn't import it. Let's add the import.