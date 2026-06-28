import type { MetadataRoute } from 'next'
import { createServerClientAdmin } from '@/lib/supabase/server'

/**
 * Sitemap for Refined Furniture.
 *
 * Combines:
 *   • Static public routes (home, shop, about, contact, faq, …)
 *   • Dynamic content pulled from Supabase (products, projects, categories)
 *
 * Each non-default locale (fr, ar) is emitted alongside the default-locale
 * route under `/{locale}/...`. The default-locale (en) lives at the unprefixed
 * path because next-intl is configured with `localePrefix: 'as-needed'`.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://refinedfurniture.example.com'

const LOCALES = ['en', 'fr', 'ar'] as const
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = 'en'

type Route = { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }

const STATIC_ROUTES: Route[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/shop', changeFrequency: 'daily', priority: 0.9 },
  { path: '/custom-furniture', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/search', changeFrequency: 'weekly', priority: 0.4 },
]

/** Converts a path to its locale-prefixed variant.
 *  For the default locale we keep the un-prefixed path.
 */
function withLocale(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return locale === DEFAULT_LOCALE ? normalized : `/${locale}${normalized}`
}

function fullUrl(locale: Locale, path: string): string {
  return `${SITE_URL.replace(/\/$/, '')}${withLocale(path, locale)}`
}

/** Builds the localized variants for every URL across supported locales. */
function forEachLocale(path: string): {
  url: string
  lastModified?: Date
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
  priority?: number
  alternates?: { languages?: Record<string, string> }
}[] {
  const base = STATIC_ROUTES.find((r) => r.path === path)
  const routesForPath = (base ? [base] : [{ path, changeFrequency: undefined as never, priority: 0.7 }])

  return routesForPath.map((route) => ({
    url: fullUrl(DEFAULT_LOCALE, route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, fullUrl(locale, route.path)])
      ),
    },
  }))
}

/**
 * Fetches dynamic content from Supabase. If the query fails (e.g. env vars
 * not configured during local dev), it gracefully returns an empty array so
 * build does not break.
 */
async function fetchSlugs(table: 'products' | 'projects' | 'categories'): Promise<string[]> {
  try {
    const supabase = createServerClientAdmin()
    const { data, error } = await supabase
      .from(table)
      .select('slug')
      .not('slug', 'is', null)

    if (error || !data) {
      console.warn(`[sitemap] Failed to fetch ${table}:`, error?.message ?? 'no data')
      return []
    }

    return data
      .map((row) => row.slug as string | null)
      .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
  } catch (err) {
    console.warn(`[sitemap] Skipping ${table} (Supabase not available):`, err)
    return []
  }
}

function localizedDynamic(
  basePath: string,
  slug: string,
  base: { changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']; priority?: number } = {}
) {
  return {
    url: fullUrl(DEFAULT_LOCALE, `${basePath}/${slug}`),
    lastModified: new Date(),
    changeFrequency: base.changeFrequency ?? 'weekly',
    priority: base.priority ?? 0.7,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, fullUrl(locale, `${basePath}/${slug}`)])
      ),
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, projectSlugs, categorySlugs] = await Promise.all([
    fetchSlugs('products'),
    fetchSlugs('projects'),
    fetchSlugs('categories'),
  ])

  const entries: MetadataRoute.Sitemap = []

  // Static routes
  for (const route of STATIC_ROUTES) {
    entries.push(...forEachLocale(route.path))
  }

  // Dynamic products
  for (const slug of productSlugs) {
    entries.push(
      localizedDynamic('/product', slug, { changeFrequency: 'daily', priority: 0.8 })
    )
  }

  // Dynamic categories
  for (const slug of categorySlugs) {
    entries.push(
      localizedDynamic('/shop/category', slug, { changeFrequency: 'weekly', priority: 0.7 })
    )
  }

  // Dynamic projects
  for (const slug of projectSlugs) {
    entries.push(
      localizedDynamic('/projects', slug, { changeFrequency: 'monthly', priority: 0.6 })
    )
  }

  return entries
}
