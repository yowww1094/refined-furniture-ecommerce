import { useFormState } from 'react-dom';
import { signInWithCredentials } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FieldError } from '@/components/auth/FieldError';

export default function SignInPage() {
  const [formState, formAction] = useFormState(signInWithCredentials, {
    error: null
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Sign In
          </h1>
          <p className="text-center text-muted-foreground">
            Welcome back to Refined Furniture. Please sign in to continue.
          </p>
        </div>

        {formState.error && (
          <Alert variant="destructive" className="w-full">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.error}</AlertDescription>
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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              className={formState.error?.includes('password') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('password') ? formState.error : undefined}
            />
          </div>

          <SubmitButton>
            Sign In
          </SubmitButton>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/auth/sign-up" className="font-medium text-primary hover:underline">
            Sign Up
          </a>
        </div>
        <div className="text-center text-sm">
          Forgot your password?{' '}
          <a href="/auth/forgot-password" className="font-medium text-primary hover:underline">
            Reset it here
          </a>
        </div>
      </div>
    </div>
  );
}