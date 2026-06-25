import { useFormState } from 'react-dom';
import { signUpWithEmail } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FieldError } from '@/components/auth/FieldError';

export default function SignUpPage() {
  const [formState, formAction] = useFormState(signUpWithEmail, {
    error: null,
    success: null
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            Sign Up
          </h1>
          <p className="text-center text-muted-foreground">
            Join Refined Furniture to start exploring our custom furniture collections.
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

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              name="fullName"
              className={formState.error?.includes('fullName') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('fullName') ? formState.error : undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              name="password"
              className={formState.error?.includes('password') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('password') ? formState.error : undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              className={formState.error?.includes('confirmPassword') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('confirmPassword') ? formState.error : undefined}
            />
          </div>

          <SubmitButton>
            Sign Up
          </SubmitButton>
        </form>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <a href="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}