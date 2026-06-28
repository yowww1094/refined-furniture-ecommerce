import type { Metadata } from 'next';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'Refined Furniture',
  description: 'Premium Moroccan Furniture — handcrafted elegance for your home',
  // Add basic Open Graph tags for social sharing
  openGraph: {
    title: 'Refined Furniture',
    description: 'Premium Moroccan Furniture — handcrafted elegance for your home',
    url: 'https://refinedfurniture.ma',
    siteName: 'Refined Furniture',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refined Furniture',
    description: 'Premium Moroccan Furniture — handcrafted elegance for your home',
  },
  // Add theme color for mobile browsers
  themeColor: '#6B4F3A', // Primary brand color
};

export default function RootLayout({
  children, // This parameter is actually not used since we're wrapping children in ClientLayout
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className="font-sans bg-background text-foreground antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}