import Link from 'next/link';

export function Floater() {
  return (
    <div className="fixed bottom-6 left-6 rtl:right-6 rtl:left-auto z-50">
      <Link
        href="https://wa.me/2125XXXXXXX"
        className="block w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        {/* WhatsApp icon - we can use a simple placeholder or an actual icon */}
        <span className="text-white text-2xl">💬</span>
      </Link>
    </div>
  );
}