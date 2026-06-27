'use server';

import { z } from 'zod';
import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { sendEmail, getOrderConfirmationEmail } from '@/lib/email';
import { getWhatsAppUrl } from '@/lib/whatsapp';

// Define the input schema matching our form
const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 be at least 5 characters'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().int().positive(),
      image: z.string(),
    })
  ),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

/**
 * Create a new order from cart items
 */
export async function createOrder(
  _prevState: { error: string | null; success: string | null } | undefined,
  formData: FormData
) {
  // Convert FormData to plain object
  // Note: For complex objects like arrays, we need to handle them specially
  // Since we're using react-hook-form with useFormState, the formData
  // will have properly formatted values

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
  const validatedFields = checkoutSchema.safeParse(formDataObject);

  if (!validatedFields.success) {
    // Log the validation errors for debugging
    console.log('Validation errors:', validatedFields.error.format());
    return { error: 'Please fix the errors in the form', success: null };
  }

  const { fullName, phone, email, city, address, notes, items } = validatedFields.data;

  try {
    const supabase = await createServerClient();

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { error: 'You must be logged in to place an order', success: null };
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: session.user.id,
        status: 'pending', // For Cash on Delivery
        total_amount: totalAmount,
        shipping_address: `${address}, ${city}`,
        notes: notes || null,
        customer_name: fullName,
        customer_phone: phone,
        customer_email: email,
      })
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    // 2. Create order items and update inventory
    for (const item of items) {
      // Create order item
      const { error: orderItemError } = await supabase
        .from('order_items')
        .insert({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
        });

      if (orderItemError) {
        throw orderItemError;
      }

      // Decrease product inventory
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single();

      if (productError) {
        throw productError;
      }

      const newStock = product.stock - item.quantity;
      if (newStock < 0) {
        // Rollback order creation if insufficient stock
        await supabase.from('orders').delete().eq('id', order.id);
        return {
          error: `Insufficient stock for ${item.name}. Available: ${product.stock}`,
          success: null
        };
      }

      const { error: stockError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', item.id);

      if (stockError) {
        // Rollback order and order items if stock update fails
        await supabase.from('orders').delete().eq('id', order.id);
        throw stockError;
      }

      // Record inventory movement
      const { error: inventoryError } = await supabase
        .from('inventory_movements')
        .insert({
          product_id: item.id,
          quantity_change: -item.quantity, // Negative for outflow
          reason: `Order #${order.id}`,
          reference_type: 'order',
          reference_id: order.id,
        });

      if (inventoryError) {
        // Rollback changes if inventory record fails
        await supabase.from('orders').delete().eq('id', order.id);
        throw inventoryError;
      }
    }

    // Revalidate relevant paths
    revalidatePath('/account/orders');
    revalidatePath('/');

    // Send notifications (email and WhatsApp)
    try {
      // Prepare customer info for notifications
      const customerInfo = {
        email,
        phone,
        address,
        city
      };

      // Send email notification
      const emailData = getOrderConfirmationEmail(fullName, order.id, items, totalAmount.toString(), customerInfo);
      await sendEmail(emailData);

      // Log WhatsApp notification (in production, use WhatsApp Business API)
      const whatsappMessage = `Hello ${fullName},\n\nThank you for your order #${order.id}!\n\nOrder Summary:\n${items.map(item => `- ${item.name} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: $${totalAmount.toFixed(2)}\n\nWe'll contact you shortly to confirm delivery details and arrange cash on delivery payment.\n\nRefined Furniture`;

      // For MVP, we'll log the WhatsApp message that would be sent
      // In production, you would use WhatsApp Business API to send this message
      console.log('=== WHATSAPP NOTIFICATION THAT WOULD BE SENT ===');
      console.log('To:', phone);
      console.log('Message:', whatsappMessage);
      console.log('==================================================');

      // Alternative: We could redirect the user to WhatsApp after order confirmation
      // But since we're in a server action, we'll just log it for now
    } catch (notificationError) {
      // Log notification error but don't fail the order
      console.error('Failed to send notifications:', notificationError);
    }

    // Return success
    return {
      error: null,
      success: 'Order placed successfully! We will contact you shortly to confirm delivery and arrange payment upon delivery.',
    };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return {
      error: error.message || 'An unexpected error occurred. Please try again.',
      success: null
    };
  }
}