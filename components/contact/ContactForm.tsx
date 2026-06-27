'use client';

import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/validation/contact.schema';
import type { ContactFormValues } from '@/lib/validation/contact.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitContactForm } from '@/lib/actions/contact';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  const { t } = useTranslations();

  const [{ message, error }, submit] = useFormState(submitContactForm, {
    initialState: { message: null, error: null },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">
            {t('fields.firstName')} {t('fields.lastName')}
          </Label>
          <Input
            id="name"
            placeholder={t('fields.placeholders.enterFullName')}
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-destructive">{t('validation.required')}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">
            {t('fields.email')}
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t('fields.placeholders.enterEmail')}
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-destructive">{t('validation.email')}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">
          {t('fields.subject')}
        </Label>
        <Input
          id="subject"
          placeholder={t('fields.placeholders.enterSubject')}
          {...register('subject')}
          className={errors.subject ? 'border-destructive' : ''}
        />
        {errors.subject && (
          <p className="mt-2 text-sm text-destructive">{t('validation.required')}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">
          {t('fields.description')}
        </Label>
        <Textarea
          id="message"
          placeholder={t('fields.placeholders.enterMessage')}
          {...register('message')}
          className={errors.message ? 'border-destructive' : ''}
          minRows={5}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-destructive">{t('validation.required')}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3"
      >
        {isSubmitting ? t('formActions.submitting') : t('formActions.submit')}
      </Button>

      {error && (
        <div className="mt-4 flex items-start space-x-3 rounded-md border p-4 bg-destructive/50 text-destructive">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">{t('contactForm.error')}</h3>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      )}

      {message && (
        <div className="mt-4 flex items-start space-x-3 rounded-md border p-4 bg-success/50 text-success">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">{t('contactForm.success')}</h3>
            <p className="mt-1 text-sm">
              {t('contactForm.messageSent')}
            </p>
          </div>
        </div>
      )}
    </form>
  );
}