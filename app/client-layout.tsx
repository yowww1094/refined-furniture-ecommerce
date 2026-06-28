'use client';

import { useEffect } from 'react';
import './globals.css';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useUIStore } from '@/stores/ui';
import { usePathname, useRouter } from 'next/navigation';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cartDrawerOpen, openCartDrawer, closeCartDrawer } = useUIStore();
  const pathname = usePathname();
  const { locale } = useRouter();

  // Determine text direction based on locale
  const isRTL = locale === 'ar';

  useEffect(() => {
    // Add a viewport meta tag for optimal mobile experience
    // This helps with Cumulative Layout Shift (CLS) and other mobile performance metrics
    if (typeof document !== 'undefined') {
      let viewportMeta = document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        document.head.appendChild(viewportMeta);
      }
    }
  }, []);

  // Note: For setting dir on html element, we'd need to communicate this up to the parent
  // For now, we'll leave it as ltr in the parent and handle dir-specific styling here if needed
  // A more complete solution would involve passing the dir direction up via context or props

  return (
    <>
      {children}
      <CartDrawer
        open={cartDrawerOpen}
        onOpenChange={(open) => {
          if (open) {
            openCartDrawer();
          } else {
            closeCartDrawer();
          }
        }}
      />
    </>
  );
}