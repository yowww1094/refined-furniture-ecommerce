import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Metadata } from 'next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMetadata(options: {
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
