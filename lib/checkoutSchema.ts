import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City is required'),
  address: z.string().min(5, 'Address is required'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;