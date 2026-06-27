import type { Metadata } from 'next';

/**
 * Creates locale-aware metadata
 * @param options - Metadata options
 */
export function createMetadata(options: {
  title: string;
  description?: string;
  image?: string;
  icons?: Array<{
    rel: string;
    url: string;
  }>;
}): Metadata {
  const baseTitle = 'Refined Furniture';
  const baseDescription = 'Premium Moroccan Furniture — handcrafted elegance for your home';

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
    metadataBase: new URL('https://refinedfurniture.ma'),
    alternates: {
      canonical: '/',
    },
  };
}