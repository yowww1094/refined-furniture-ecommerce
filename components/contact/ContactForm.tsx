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
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Brief summary of your inquiry"
          {...register('subject')}
          className={errors.subject ? 'border-destructive' : ''}
        />
        {errors.subject && (
          <p className="mt-2 text-sm text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="How can we help you?"
          {...register('message')}
          className={errors.message ? 'border-destructive' : ''}
          minRows={5}
        />
        {errors.message && (
          <p className="mt-2 text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {error && (
        <div className="mt-4 flex items-start space-x-3 rounded-md border p-4 bg-destructive/50 text-destructive">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">Failed to send message</h3>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      )}

      {message && (
        <div className="mt-4 flex items-start space-x-3 rounded-md border p-4 bg-success/50 text-success">
          <CheckCircle className="h-5 w-5 flex-shrink-0 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">Message sent!</h3>
            <p className="mt-1 text-sm">
              Thank you for contacting us. We'll get back to you soon.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}