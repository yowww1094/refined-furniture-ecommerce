import type { MetadataRoute } from 'next'

/**
 * robots.txt for Refined Furniture.
 *
 * • Allows search engines to crawl every public page.
 * • Blocks indexation of the private areas (account, admin, auth) and the
 *   internal Next.js assets.
 * • Points crawlers at the generated sitemap so the public surface stays
 *   discoverable as products / projects / categories grow.
 *
 * The `host` field advertises the canonical domain.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://refinedfurniture.example.com'

const NORMALIZED_SITE_URL = SITE_URL.replace(/\/$/, '')

// Locale prefixes we serve (must mirror middleware.ts).
// Default locale (en) lives at the unprefixed path.
const LOCALES = ['fr', 'ar'] as const

const SITEMAP_URL = `${NORMALIZED_SITE_URL}/sitemap.xml`

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Protected customer surfaces
          '/account',
          '/account/*',
          '/fr/account',
          '/fr/account/*',
          '/ar/account',
          '/ar/account/*',

          // Admin area (defence in depth — middleware blocks unauth, but bots
          // shouldn't index it under any locale).
          '/admin',
          '/admin/*',
          '/fr/admin',
          '/fr/admin/*',
          '/ar/admin',
          '/ar/admin/*',

          // Auth pages — not meaningful for organic ranking.
          '/auth',
          '/auth/*',
          '/fr/auth',
          '/fr/auth/*',
          '/ar/auth',
          '/ar/auth/*',

          // Cart / checkout — no organic value, only conversion flows.
          '/cart',
          '/checkout',
          '/order-confirmation',

          // Internal Next.js + asset surfaces.
          '/api',
          '/api/*',
          '/_next',
          '/_next/*',
        ],
      },
      // Explicitly block AI training scrapers from the catalogue. Visitors
      // and search engines can still crawl the site.
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    sitemap: SITEMAP_URL,
    host: NORMALIZED_SITE_URL,
  }
}
