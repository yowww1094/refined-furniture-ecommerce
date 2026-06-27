'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/i18n';
import { Menu, Moon, Sun } from 'lucide-react';

export default function Header() {
  const t = useTranslations();
  const { pathname } = usePathname();
  const { locale } = useRouter();

  return (
    <header className="bg-white border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex flex-1 items-center justify-between lg:hidden">
          <button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5">
            <Menu className="h-6 w-6" aria-label="Open menu" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center lg:flex-none">
          <Link href="/" className="-mx-3 flex items-center px-3 py-2 text-sm font-medium">
            {t('navigate.home')}
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          {/* Language switcher */}
          <div className="relative inline-block text-left">
            <button type="button"
                    className={`flex items-center text-sm font-medium text-gray-500 ${locale === 'en' ? 'text-gray-900' : ''}`}
                    aria-haspopup="true">
              {locale === 'en' ? 'English' : locale === 'fr' ? 'Français' : 'العربية'}
              <svg className="-mr-0.5 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-2.938a.75.75 0 111.081 1.27l-4.25 3.367a.75.75 0 01-1.082 0l-4.25-3.367a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Theme toggle */}
          <button className="p-1 rounded-md hover:bg-gray-100" aria-label="Toggle theme">
            {/* Simple sun/moon icon based on placeholder - in real app would check theme state */}
            {false ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* User menu (placeholder) */}
          <div className="relative">
            <button className="p-1 rounded-md hover:bg-gray-100" aria-label="User menu">
              <Circle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}