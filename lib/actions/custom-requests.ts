'use server';

import { z } from 'zod';
import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { customRequestSchema } from '@/lib/validation/custom-request.schema';

// Define the input schema matching our form
const submitCustomRequestSchema = z.object({
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
});

export type CustomRequestFormValues = z.infer<typeof submitCustomRequestSchema>;

/**
 * Submit a custom furniture request
 */
export async function submitCustomRequest(
  _prevState: { error: string | null; success: string | null } | undefined,
  formData: FormData
) {
  // Convert FormData to plain object
  const formDataObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    // Handle multiple values for the same key (arrays)
    if (formDataObject[key]) {
      if (!Array.isArray(formDataObject[key])) {
        formDataObject[key] = [formDataObject[key]];
      }
      formDataObject[key].push(value);
    } else {
      formDataObject[key] = value;
    }
  });

  // Parse and validate the form data
  const validatedFields = submitCustomRequestSchema.safeParse(formDataObject);

  if (!validatedFields.success) {
    // Log the validation errors for debugging
    console.log('Validation errors:', validatedFields.error.format());
    return { error: 'Please fix the errors in the form', success: null };
  }

  const {
    furnitureType,
    dimensions,
    materials,
    budget,
    description,
    pinterestUrls,
  } = validatedFields.data;

  try {
    const supabase = await createServerClient();

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { error: 'You must be logged in to submit a custom request', success: null };
    }

    // 1. Create the custom request
    const { data: customRequest, error: customRequestError } = await supabase
      .from('custom_requests')
      .insert({
        user_id: session.user.id,
        furniture_type: furnitureType,
        dimensions: {
          length: parseFloat(dimensions.length),
          width: parseFloat(dimensions.width),
          height: parseFloat(dimensions.height),
          unit: dimensions.unit,
        },
        materials: materials,
        budget_min: parseFloat(budget.min),
        budget_max: parseFloat(budget.max),
        budget_currency: budget.currency,
        description: description,
        pinterest_urls: pinterestUrls.filter(Boolean), // Remove any empty strings
        status: 'received', // Initial status
      })
      .select()
      .single();

    if (customRequestError) {
      throw customRequestError;
    }

    // Note: In a full implementation, we would handle file uploads here
    // For now, we'll note that file uploads would be handled separately

    // Revalidate relevant paths
    revalidatePath('/account/custom-requests');

    // Return success
    return {
      error: null,
      success: 'Your custom request has been submitted successfully! Our team will review it and contact you via WhatsApp to discuss details and provide a quotation.',
    };
  } catch (error: any) {
    console.error('Error submitting custom request:', error);
    return {
      error: error.message || 'An unexpected error occurred. Please try again.',
      success: null
    };
  }
}