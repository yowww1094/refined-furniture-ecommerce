'use client';

import type { Metadata } from 'next';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Manrope } from 'next/font/google';
import { NotoSansArabic } from 'next/font/google';
import './globals.css';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useUIStore } from '@/stores/ui';
import { usePathname, useRouter } from 'next/navigation';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSansArabic = NotoSansArabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Refined Furniture',
  description: 'Premium Moroccan Furniture — handcrafted elegance for your home',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cartDrawerOpen, openCartDrawer, closeCartDrawer } = useUIStore();
  const pathname = usePathname();
  const { locale } = useRouter();

  // Determine text direction based on locale
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={`${manrope.variable} ${notoSansArabic.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">
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
      </body>
    </html>
  );
}