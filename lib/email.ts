// Email utility functions
import type { Resend } from 'resend';

// In a real application, you would use an email service like Resend, SendGrid, etc.
// For this MVP, we'll create a simple utility that logs emails
// In production, you would replace this with actual email sending

// Mock email sending function - replace with actual implementation in production
export async function sendEmail(emailData: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> {
  // In development, just log the email
  console.log('=== EMAIL SENT ===');
  console.log('To:', emailData.to);
  console.log('Subject:', emailData.subject);
  console.log('HTML Content:', emailData.html);
  if (emailData.text) {
    console.log('Text Content:', emailData.text);
  }
  console.log('==================');

  // In production, you would uncomment and use something like:
  /*
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Refined Furniture <noreply@refinedfurniture.ma>',
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.html,
    text: emailData.text,
  });
  */
}

// Generate order confirmation email content
export function getOrderConfirmationEmail(
  customerName: string,
  orderId: string,
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>,
  totalAmount: string,
  customerInfo: {
    email: string;
    phone: string;
    address: string;
    city: string;
  }
) {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" width="60" style="border-radius: 4px;">
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        <strong>${item.name}</strong>
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  return {
    to: customerInfo.email,
    subject: `Order Confirmation #${orderId} - Refined Furniture`,
    html: `
      <div style="font-family: 'Manrope', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #6B4F3A; margin-bottom: 10px;">Order Confirmed!</h1>
          <p style="color: #666; font-size: 16px;">Thank you for your purchase!</p>
        </div>

        <div style="background-color: #f8f6f3; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #1F1F1F; margin-top: 0;">Hello ${customerName},</h2>
          <p>Thank you for choosing Refined Furniture. We're excited to confirm your order details:</p>

          <div style="margin: 20px 0;">
            <h3 style="color: #6B4F3A; margin-bottom: 15px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                  <th style="padding: 8px; text-align: left; border-bottom: 2px solid #ddd;">Description</th>
                  <th style="padding: 8px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 8px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #ddd;">Total:</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; border-top: 2px solid #ddd; font-size: 1.2em; color: #6B4F3A;">
                    $${totalAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style="background-color: #fff; padding: 16px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #6B4F3A; margin-top: 0;">Delivery Information</h3>
            <p style="margin: 8px 0;"><strong>Delivery Address:</strong></p>
            <p style="margin: 4px 0 16px 0;">${customerInfo.address}, ${customerInfo.city}</p>
            <p style="margin: 8px 0;"><strong>Contact:</strong></p>
            <p style="margin: 4px 0;">${customerInfo.phone}</p>
          </div>

          <div style="background-color: #f0f7f1; padding: 16px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #68735B; margin-top: 0;">Important Information</h3>
            <ul style="margin: 12px 0; padding-left: 20px;">
              <li>We will contact you via WhatsApp (${customerInfo.phone}) to confirm delivery details.</li>
              <li>Payment is Cash on Delivery (COD) - please have the exact amount ready.</li>
              <li>Our team will prepare your furniture with the utmost care and attention to detail.</li>
              <li>Delivery will be arranged to your specified address.</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Thank you for choosing Refined Furniture!<br>
              Handcrafted with pride in Morocco
            </p>
            <div style="margin-top: 15px;">
              <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2125XXXXXXX'}"
                 style="display: inline-block; background-color: #6B4F3A; color: white; padding: 10px 20px;
                        text-decoration: none; border-radius: 4px; font-weight: 500;">
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
    text: `
      Order Confirmation #${orderId} - Refined Furniture

      Hello ${customerName},

      Thank you for choosing Refined Furniture. We're excited to confirm your order details:

      ORDER SUMMARY:
      ${items.map(item => `- ${item.name} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

      TOTAL: $${totalAmount}

      DELIVERY INFORMATION:
      Delivery Address: ${customerInfo.address}, ${customerInfo.city}
      Contact: ${customerInfo.phone}

      IMPORTANT INFORMATION:
      - We will contact you via WhatsApp (${customerInfo.phone}) to confirm delivery details.
      - Payment is Cash on Delivery (COD) - please have the exact amount ready.
      - Our team will prepare your furniture with the utmost care and attention to detail.
      - Delivery will be arranged to your specified address.

      Thank you for choosing Refined Furniture!
      Handcrafted with pride in Morocco

      Chat with us on WhatsApp: https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2125XXXXXXX'}
    `
  };
}