'use client';

import Link from 'next/link';
import { Menu, X, Moon, Sun, ShoppingCart } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';
import { useCartStore } from '@/stores/cart';
import { useUIStore } from '@/stores/ui';

export function Navbar() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCartStore();
  const { openCartDrawer } = useUIStore();

  // For demo, we'll toggle a mobile menu. In a real app, we'd use a proper mobile menu.
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when navigating (for mobile)
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname, isOpen]);

  if (!t) {
    // Return a fallback while translations are loading
    return (
      <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="h-6 w-6">🪑</span>
                <span className="text-xl font-bold text-foreground">Loading...</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/50">
      <div className="max-w-7xl mx-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="h-6 w-6">🪑</span>
              <span className="text-xl font-bold text-foreground">{t('navigate.home')}</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname === '/' ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {t('navigate.home')}
            </Link>
            <Link
              href="/shop"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname.startsWith('/shop') ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {t('navigate.shop')}
            </Link>
            <Link
              href="/custom-furniture"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname === '/custom-furniture'
                  ? 'bg-accent/20 text-accent'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {t('navigate.customFurniture')}
            </Link>
            <Link
              href="/about"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname === '/about' ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {t('navigate.about')}
            </Link>
            <Link
              href="/contact"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname === '/contact'
                  ? 'bg-accent/20 text-accent'
                  : 'text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {t('navigate.contact')}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Locale switcher */}
            <LocaleSwitcher />

            {/* Theme toggle - placeholder */}
            <button
              aria-label={t('navigate.themeToggle')}
              className="rounded-md p-2 hover:bg-accent/20"
              onClick={() => {
                // TODO: Implement theme toggle
              }}
            >
              {/* We'll use sun/moon icons based on current theme - placeholder */}
              <Sun className="h-4 w-4" />
            </button>

            {/* Cart button */}
            <button
              onClick={() => openCartDrawer()}
              aria-label={t('navigate.viewCart')}
              className="relative rounded-md p-2 hover:bg-accent/20"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -left-1 rtl:-right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              aria-label={t('navigate.openMenu')}
              className="-m-2 p-2 md:hidden rounded-md hover:bg-accent/20"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={[
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname === '/' ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {t('navigate.home')}
              </Link>
              <Link
                href="/shop"
                className={[
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname.startsWith('/shop') ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {t('navigate.shop')}
              </Link>
              <Link
                href="/custom-furniture"
                className={[
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname === '/custom-furniture'
                    ? 'bg-accent/20 text-accent'
                    : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {t('navigate.customFurniture')}
              </Link>
              <Link
                href="/about"
                className={[
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname === '/about' ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {t('navigate.about')}
              </Link>
              <Link
                href="/contact"
                className={[
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname === '/contact'
                    ? 'bg-accent/20 text-accent'
                    : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {t('navigate.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}