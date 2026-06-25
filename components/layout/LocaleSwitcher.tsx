import { Link } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define locales to match next-intl config
const locales = ['en', 'fr', 'ar'];

// Language names in their native form
const languageNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
};

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Extract locale from pathname
  const getLocaleFromPathname = (path: string): string => {
    // Check if pathname starts with a locale prefix
    const pathWithoutLeadingSlash = path.startsWith('/') ? path.slice(1) : path;
    const firstSegment = pathWithoutLeadingSlash.split('/')[0];

    // If the first segment is a valid locale, return it
    if (locales.includes(firstSegment as 'en' | 'fr' | 'ar')) {
      return firstSegment;
    }

    // Default locale if no prefix found
    return 'en';
  };

  const currentLocale = getLocaleFromPathname(pathname);

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Change locale
  const changeLocale = (locale: string) => {
    // Build the new path with the selected locale
    const pathWithoutLocale = pathname.replace(
      new RegExp(`^/${currentLocale}(/|$)`),
      '/$2'
    );
    const newPath = locale === 'en'
      ? pathWithoutLocale
      : `/${locale}${pathWithoutLocale}`;

    // Replace the current URL with the new one
    router.push(newPath);
  };

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Language selector"
        aria-expanded={isOpen}
      >
        {/* Language name */}
        <span className="whitespace-nowrap">{languageNames[currentLocale]}</span>
        {/* Dropdown indicator */}
        <span className="ml-1 h-4 w-4">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
          {locales.map((locale) => (
            <Link
              key={locale}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeLocale(locale);
              }}
              className={`
                block px-4 py-2 text-sm text-left ${locale === currentLocale
                  ? 'bg-accent/20 text-accent'
                  : 'text-gray-700 hover:bg-gray-100'}
                w-full
              `}
            >
              {languageNames[locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}