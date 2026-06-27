import { NextRouter, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Dynamically import locale messages
const loadLocaleMessages = async (locale: string) => {
  switch (locale) {
    case 'en':
      return (await import('../locales/en.json')).default;
    case 'fr':
      return (await import('../locales/fr.json')).default;
    case 'ar':
      return (await import('../locales/ar.json')).default;
    default:
      return (await import('../locales/en.json')).default;
  }
};

// For next-intl configuration
export const locales = ['en', 'fr', 'ar'] as const;
export const defaultLocale = 'en' as const;
export const localePrefix = 'as-needed';

// Type definitions
export type Locale = typeof locales[number];

// Hook to get current locale and translations
export function useTranslations() {
  const router = useRouter();
  const locale = router.locale as Locale;
  const [messages, setMessages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadMessages = async () => {
      try {
        const msg = await loadLocaleMessages(locale);
        if (!cancelled) {
          setMessages(msg);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Failed to load messages for locale ${locale}:`, error);
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (loading || !messages) {
    return null;
  }

  return {
    t: (key: string) => {
      const keys = key.split('.');
      let result = messages;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = (result as any)[k];
        } else {
          return key; // Return the key if not found
        }
      }
      return result || key;
    },
    locale
  };
}