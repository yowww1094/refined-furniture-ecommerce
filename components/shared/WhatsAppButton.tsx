import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  /** The phone number to send the message to (uses default if not provided) */
  phoneNumber?: string;
  /** The pre-filled message */
  message: string;
  /** Optional CSS class for styling */
  className?: string;
  /** Whether to open in a new tab */
  targetBlank?: boolean;
  /** Children to display inside the button (if not provided, uses default WhatsApp icon/text) */
  children?: React.ReactNode;
}

export function WhatsAppButton({
  phoneNumber,
  message,
  className = '',
  targetBlank = true,
  children,
}: WhatsAppButtonProps) {
  const whatsappUrl = getWhatsAppUrl(
    phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2125XXXXXXX',
    message
  );

  const btnClassName = `
    inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
    text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
    ${className}
  `;

  return (
    <Link
      href={whatsappUrl}
      className={btnClassName}
      target={targetBlank ? '_blank' : undefined}
      rel={targetBlank ? 'noopener noreferrer' : undefined}
    >
      {children ?? (
        <>
          {/* WhatsApp icon - using simple text for now, could replace with actual icon */}
          <span className="mr-2">💬</span>
          <span>WhatsApp</span>
        </>
      )}
    </Link>
  );
}