import { useFormState } from 'react-dom';
import { signUpWithEmail } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SubmitButton } from '@/components/auth/SubmitButton';
import { FieldError } from '@/components/auth/FieldError';
import { useTranslations } from '@/lib/i18n';

export default function SignUpPage() {
  const { t } = useTranslations();
  const [formState, formAction] = useFormState(signUpWithEmail, {
    error: null,
    success: null
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-foreground">
            {t('auth.signUp')}
          </h1>
          <p className="text-center text-muted-foreground">
            {t('auth.joinReflected')}
          </p>
        </div>

        {formState.error && (
          <Alert variant="destructive" className="w-full">
            <AlertTitle>{t('auth.error')}</AlertTitle>
            <AlertDescription>{formState.error}</AlertDescription>
          </Alert>
        )}

        {formState.success && (
          <Alert variant="default" className="w-full">
            <AlertTitle>{t('auth.success')}</AlertTitle>
            <AlertDescription>{formState.success}</AlertDescription>
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
            <Label htmlFor="fullName">
              {t('fields.fullName')}
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder={t('fields.placeholders.enterFullName')}
              name="fullName"
              className={formState.error?.includes('fullName') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('fullName') ? formState.error : undefined}
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t('fields.confirmPassword')}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={t('fields.placeholders.enterConfirmPassword')}
              name="confirmPassword"
              className={formState.error?.includes('confirmPassword') ? 'border-destructive' : ''}
            />
            <FieldError
              message={formState.error?.includes('confirmPassword') ? formState.error : undefined}
            />
          </div>

          <SubmitButton>
            {t('formActions.submit')}
          </SubmitButton>
        </form>

        <div className="text-center text-sm">
          {t('auth.alreadyHaveAccount')} {' '}
          <a href="/auth/sign-in" className="font-medium text-primary hover:underline">
            {t('auth.signIn')}
          </a>
        </div>
      </div>
    </div>
  );
}