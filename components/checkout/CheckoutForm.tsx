'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { checkoutSchema } from '@/lib/checkoutSchema';
import { useCartStore } from '@/stores/cart';
import { useTranslations } from '@/lib/i18n';

// Form schema matching our checkout data
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutForm() {
  const { items, totalPrice } = useCartStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ error: string | null; success: string | null }>(
    { error: null, success: null }
  );
  const { t } = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting: isValidating },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      city: '',
      address: '',
      notes: '',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);

    try {
      // Call our server action with form data and cart items
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        }),
      });

      const result = await response.json();

      if (result.error) {
        setSubmitStatus({ error: result.error, success: null });
      } else {
        // Redirect to order confirmation page with order ID
        setSubmitStatus({ error: null, success: t('checkout.success') });
        // In a real app, we would redirect to: `/order-confirmation?orderId=${result.orderId}`
        // For now, we'll simulate by showing a success message and then redirecting
        setTimeout(() => {
          router.push(`/order-confirmation`);
        }, 1500);
      }
    } catch (error: any) {
      setSubmitStatus({ error: t('auth.unexpectedError'), success: null });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">
            {t('fields.firstName')} {t('fields.lastName')}
          </Label>
          <Input
            id="fullName"
            placeholder={t('fields.placeholders.enterFullName')}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{t('validation.required')}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">
            {t('fields.phone')}
          </Label>
          <Input
            id="phone"
            placeholder={t('fields.placeholders.enterPhone')}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{t('validation.required')}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">
            {t('fields.email')}
          </Label>
          <Input
            id="email"
            placeholder={t('fields.placeholders.enterEmail')}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{t('validation.email')}</p>
          )}
        </div>
        <div>
          <Label htmlFor="city">
            {t('fields.city')}
          </Label>
          <Input
            id="city"
            placeholder={t('fields.placeholders.enterCity')}
            {...register('city')}
          />
          {errors.city && (
            <p className="text-sm text-destructive">{t('validation.required')}</p>
          )}
        </div>
      </div>

      <div>
          <Label htmlFor="address">
            {t('fields.address')}
          </Label>
          <Input
            id="address"
            placeholder={t('fields.placeholders.enterAddress')}
            {...register('address')}
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

      <div>
        <Label htmlFor="notes">
            {t('fields.notes')}
          </Label>
          <Textarea
            id="notes"
            placeholder={t('fields.placeholders.enterNotes')}
            {...register('notes')}
            rows={4}
          />
          {errors.notes && (
            <p className="text-sm text-destructive">{errors.notes.message}</p>
          )}
      </div>

      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isSubmitting || isValidating}>
          {isSubmitting ? t('formActions.placingOrder') : t('formActions.placeOrder')}
        </Button>
      </div>

      {/* Display status messages */}
      {submitStatus.error && (
        <div className="mt-4 flex items-start space-x-3 rounded-md border p-4 bg-destructive/50 text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">{t('auth.error')}</h3>
            <p className="mt-1 text-sm">{submitStatus.error}</p>
          </div>
        </div>
      )}

      {submitStatus.success && (
        <div className="mt-4 flex items-start space-x-3 rounded-md border p-4 bg-success/50 text-success">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">{t('auth.success')}</h3>
            <p className="mt-1 text-sm">
              {submitStatus.success}
            </p>
          </div>
        </div>
      )}
    </form>
  );
}