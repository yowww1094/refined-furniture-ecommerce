import Link from 'next/link';
import { getWhatsAppUrl, WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function WhatsAppFloater() {
  const whatsappUrl = getWhatsAppUrl(
    WHATSAPP_NUMBER,
    'Hello, I am interested in your products. Please contact me.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={whatsappUrl}
        className="block w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp icon */}
        <span className="text-white text-2xl">💬</span>
      </Link>
    </div>
  );
}