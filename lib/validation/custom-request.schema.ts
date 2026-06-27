import { z } from 'zod';

/**
 * Schema for custom furniture request form validation
 */
export const customRequestSchema = z.object({
  furnitureType: z.string().min(1, 'Please select a furniture type'),
  dimensions: z.object({
    length: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Please enter a valid length',
    }),
    width: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Please enter a valid width',
    }),
    height: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Please enter a valid height',
    }),
    unit: z.enum(['cm', 'inches']).default('cm'),
  }),
  materials: z.array(z.string()).min(1, 'Please select at least one material'),
  budget: z.object({
    min: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: 'Please enter a valid minimum budget',
    }),
    max: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: 'Please enter a valid maximum budget',
    }),
    currency: z.enum(['USD', 'EUR', 'MAD']).default('MAD'),
  }).refine(data => parseFloat(data.max) >= parseFloat(data.min), {
    message: 'Maximum budget must be greater than or equal to minimum budget',
    path: ['max'],
  }),
  description: z.string().min(10, 'Please provide a detailed description'),
  pinterestUrls: z.array(z.string().url().optional()).max(5, 'Maximum 5 Pinterest URLs allowed'),
  // Note: File validation would be handled separately in the upload component
});

export type CustomRequestFormValues = z.infer<typeof customRequestSchema>;

/**
 * Default values for the form
 */
export const defaultCustomRequestValues: CustomRequestFormValues = {
  furnitureType: '',
  dimensions: {
    length: '',
    width: '',
    height: '',
    unit: 'cm',
  },
  materials: [],
  budget: {
    min: '',
    max: '',
    currency: 'MAD',
  },
  description: '',
  pinterestUrls: [''],
};