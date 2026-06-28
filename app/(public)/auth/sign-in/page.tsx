import { useFormState } from 'react-dom';
import { signInWithCredentials } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FieldError } from '@/components/auth/FieldError';
import { useTranslations } from '@/lib/i18n';
import { generateMetadata } from '@/lib/utils/generate-metadata';

export const metadata = generateMetadata({
  title: 'Sign In - Refined Furniture',
  description: 'Sign in to your Refined Furniture account to access your orders, wishlist, custom requests, and profile.',
  pathname: '/auth/sign-in',
});

export default function SignInPage() {
  const { t } = useTranslations();
  const [formState, formAction] = useFormState(signInWithCredentials, {
    error: null
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            {t('auth.signIn')}
          </h1>
          <p className="text-center text-muted-foreground">
            {t('auth.welcomeBack')}
          </p>
        </div>

        {formState.error && (
          <Alert variant="destructive" className="w-full">
            <AlertTitle>{t('auth.error')}</AlertTitle>
            <AlertDescription>{formState.error}</AlertDescription>
          </Alert>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">
              {t('fields.email')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('fields.placeholders.enterEmail')}
              name="email"
              className={formState.error?.includes('email') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('email') ? formState.error : undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {t('fields.password')}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={t('fields.placeholders.enterPassword')}
              name="password"
              className={formState.error?.includes('password') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('password') ? formState.error : undefined}
            />
          </div>

          <SubmitButton>
            {t('formActions.submit')}
          </SubmitButton>
        </form>

        <div className="text-center text-sm">
          {t('auth.noAccount')} {' '}
          <a href="/auth/sign-up" className="font-medium text-primary hover:underline">
            {t('auth.signUp')}
          </a>
        </div>
        <div className="text-center text-sm">
          {t('auth.forgotPassword')} {' '}
          <a href="/auth/forgot-password" className="font-medium text-primary hover:underline">
            {t('auth.resetPassword')}
          </a>
        </div>
      </div>
    </div>
  );
}