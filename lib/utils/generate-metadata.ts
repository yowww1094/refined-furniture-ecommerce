import type { Metadata } from 'next';
import { Locales } from '@/lib/i18n';

export function generateMetadata(options: {
  title: string;
  description?: string;
  image?: string;
  icons?: Array<{
    rel: string;
    url: string;
  }>;
  locale?: string;
  pathname?: string;
}): Metadata {
  const baseTitle = 'Refined Furniture';
  const baseDescription = 'Premium Moroccan Furniture — handcrafted elegance for your home';
  const locale = options.locale || 'en';
  const pathname = options.pathname || '/';

  // Determine base URL based on locale (for as-needed prefixing)
  const isDefaultLocale = locale === 'en';
  const localePrefix = isDefaultLocale ? '' : `/${locale}`;
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://refinedfurniture.ma'; // fallback for SSR

  const canonicalUrl = `${baseUrl}${localePrefix}${pathname}`;

  return {
    title: `${options.title} | ${baseTitle}`,
    description: options.description || baseDescription,
    ...(options.image && {
      openGraph: {
        images: [
          {
            url: options.image,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        images: [
          {
            url: options.image,
          },
        ],
      },
    }),
    ...(options.icons && {
      icons: options.icons,
    }),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      // Add hreflang alternates
      languages: {
        en: `${baseUrl}/${pathname}`,
        fr: `${baseUrl}/fr${pathname}`,
        ar: `${baseUrl}/ar${pathname}`
      }
    }
  };
}