'use server';

import { z } from 'zod';
import { createServerClient } from '@/lib/supabase';
import { contactFormSchema } from '@/lib/validation/contact.schema';
import { revalidatePath } from 'next/cache';

// Contact form action
export async function submitContactForm(
  prevState: { message: string | null; error: string | null } | undefined,
  formData: FormData
) {
  // Validate form data
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return { error: 'Please fix the errors in the form', message: null };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    const supabase = await createServerClient();

    // Insert the contact form submission into the database
    // We'll use the notifications table or create a contact_form_submissions table
    // For now, let's use the notifications table since it exists
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: null, // Not associated with a user since it's a public form
        title: `Contact Form: ${subject}`,
        message: `From: ${name} (${email})\n\n${message}`,
        type: 'contact_form',
        is_read: false,
      });

    if (error) {
      throw error;
    }

    // Revalidate the contact page to clear the form
    revalidatePath('/contact');

    return {
      message: 'Your message has been sent successfully! We will get back to you soon.',
      error: null
    };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return {
      error: 'Failed to send message. Please try again later.',
      message: null
    };
  }
}