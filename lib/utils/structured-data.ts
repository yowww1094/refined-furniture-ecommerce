/**
 * Schema.org JSON-LD builders.
 *
 * Every builder returns a plain object conforming to https://schema.org.
 * The actual <script> tag is emitted by `<JsonLd />` so we never hand-write
 * the dangerouslySetInnerHTML call from a page.
 *
 * Conventions:
 *   • Money values are strings like "2400.00" + ISO 4217 currency → `${"2400.00"} MAD`.
 *     schema.org does NOT accept MAD as a top-level type, but Google's
 *     documentation repeatedly accepts ISO-4217 codes ("USD", "EUR", "MAD", …).
 *   • Dates use ISO 8601 strings.
 *   • Image URLs are absolute (schema.org disallows relative URLs).
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  'https://refinedfurniture.example.com'

export const BRAND = {
  name: 'Refined Furniture',
  legalName: 'Refined Furniture SARL',
  description:
    'Premium Moroccan furniture manufacturer and atelier — handcrafted ready-made pieces and bespoke custom furniture, delivered across Morocco.',
  url: SITE_URL.replace(/\/$/, ''),
  logo: `${SITE_URL.replace(/\/$/, '')}/logo.png`,
  email: 'contact@refinedfurniture.example.com',
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+212600000000',
  city: 'Marrakech',
  region: 'Marrakesh-Safi',
  country: 'MA',
  postalCode: '40000',
  street: 'Avenue Mohammed VI',
  facebook: 'https://www.facebook.com/refinedfurniture',
  instagram: 'https://www.instagram.com/refinedfurniture',
  sameAs: [
    'https://www.facebook.com/refinedfurniture',
    'https://www.instagram.com/refinedfurniture',
  ] as string[],
} as const

export type WithContext<T, C extends string> = T & { '@context': 'https://schema.org'; '@type': C }

function absUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  const normalised = path.startsWith('/') ? path : `/${path}`
  return `${BRAND.url}${normalised}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Organization (site-wide identity)
// ─────────────────────────────────────────────────────────────────────────────

export function organizationSchema(): WithContext<Record<string, unknown>, 'Organization'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: BRAND.url,
    logo: BRAND.logo,
    description: BRAND.description,
    email: BRAND.email,
    telephone: BRAND.phone,
    sameAs: [...BRAND.sameAs],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LocalBusiness (Moroccan storefront, used on every public page)
// ─────────────────────────────────────────────────────────────────────────────

export function localBusinessSchema(): WithContext<Record<string, unknown>, 'FurnitureStore'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    '@id': `${BRAND.url}/#store`,
    name: BRAND.name,
    description: BRAND.description,
    url: BRAND.url,
    logo: BRAND.logo,
    image: BRAND.logo,
    telephone: BRAND.phone,
    email: BRAND.email,
    priceRange: 'MAD $$',
    currenciesAccepted: 'MAD',
    paymentAccepted: 'Cash on Delivery',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.street,
      addressLocality: BRAND.city,
      addressRegion: BRAND.region,
      postalCode: BRAND.postalCode,
      addressCountry: BRAND.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Marrakech city centre (rough) — replace through CMS-driven settings
      // later when admins can override the storefront location.
      latitude: 31.6295,
      longitude: -7.9811,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [...BRAND.sameAs],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// WebSite + SearchAction (sitelinks search box in Google)
// ─────────────────────────────────────────────────────────────────────────────

export function websiteSchema(): WithContext<Record<string, unknown>, 'WebSite'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BRAND.url}/#website`,
    name: BRAND.name,
    url: BRAND.url,
    publisher: { '@id': `${BRAND.url}/#store` },
    inLanguage: ['en', 'fr', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BRAND.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// BreadcrumbList
// ─────────────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string
  /** Absolute URL OR a path starting with `/`. */
  href: string
}

export function breadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<Record<string, unknown>, 'BreadcrumbList'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absUrl(item.href),
    })),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Product
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductSchemaInput {
  name: string
  description: string
  image: string | string[]
  sku?: string
  brand?: string
  price: number
  /** ISO 4217 currency code, default "MAD". */
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'LimitedAvailability'
  url: string
  ratingValue?: number
  reviewCount?: number
  category?: string
}

export function productSchema(input: ProductSchemaInput): WithContext<Record<string, unknown>, 'Product'> {
  const images = Array.isArray(input.image) ? input.image : [input.image]
  const currency = input.currency ?? 'MAD'
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: images.map(absUrl),
    sku: input.sku,
    brand: {
      '@type': 'Brand',
      name: input.brand ?? BRAND.name,
    },
    category: input.category,
    offers: {
      '@type': 'Offer',
      url: absUrl(input.url),
      priceCurrency: currency,
      price: input.price.toFixed(2),
      availability: `https://schema.org/${input.availability ?? 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: BRAND.name,
        '@id': `${BRAND.url}/#store`,
      },
      priceValidUntil: new Date(new Date().getFullYear(), 11, 31)
        .toISOString()
        .slice(0, 10),
    },
  }

  if (input.ratingValue !== undefined && input.reviewCount !== undefined && input.reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: input.ratingValue,
      reviewCount: input.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return schema as WithContext<Record<string, unknown>, 'Product'>
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQPage
// ─────────────────────────────────────────────────────────────────────────────

export interface FaqSchemaItem {
  question: string
  answer: string
}

export function faqPageSchema(items: FaqSchemaItem[]): WithContext<Record<string, unknown>, 'FAQPage'> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: emit a JSON-LD script tag object (server-friendly, no React import).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Stringify a schema object safely, ready to embed as innerHTML.
 * Prevents XSS via</script>" sequences and just emits clean JSON otherwise.
 */
export function serialiseSchema(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}
