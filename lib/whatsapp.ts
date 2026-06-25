// WhatsApp utility functions
import type { Dispatch, SetStateAction } from 'react';

// Default WhatsApp number (should be set in environment variables)
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2125XXXXXXX';

/**
 * Generates a WhatsApp URL with a pre-filled message
 * @param phoneNumber - The phone number in international format (without +)
 * @param message - The message to pre-fill
 * @returns A URL that opens WhatsApp with the specified message
 */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  // Format the message for URL encoding
  const encodedMessage = encodeURIComponent(message);
  // WhatsApp web URL format: https://wa.me/<number>?text=<urlencoded-message>
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Generates a WhatsApp URL for a product inquiry
 */
export function getProductWhatsAppUrl(productName: string, productUrl: string): string {
  const message = `Hello, I'm interested in purchasing:\n\n${productName}\n${productUrl}\n\nPlease provide more details about pricing and availability.`;
  return getWhatsAppUrl(WHATSAPP_NUMBER, message);
}

/**
 * Generates a WhatsApp URL for a custom furniture request
 */
export function getCustomRequestWhatsAppUrl(): string {
  const message = `Hello, I'd like to make a custom furniture request.\n\nPlease provide details about:\n- Type of furniture needed\n- Dimensions\n- Materials preferred\n- Budget range\n- Any reference images or inspiration\n\nI'll provide more details in my message.`;
  return getWhatsAppUrl(WHATSAPP_NUMBER, message);
}

/**
 * Generates a WhatsApp URL for general inquiries
 */
export function getGeneralInquiryWhatsAppUrl(): string {
  const message = `Hello, I have a question about your products and services.\n\nPlease feel free to provide more information.`;
  return getWhatsAppUrl(WHATSAPP_NUMBER, message);
}

// Export the default number for use in other components
export { WHATSAPP_NUMBER };