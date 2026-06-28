import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout';
import { Footer } from '@/components/layout';
import { WhatsAppFloater } from '@/components/shared';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from '@/lib/utils/structured-data';

export const metadata: Metadata = {
  title: 'Refined Furniture',
  description: 'Premium Moroccan Furniture — handcrafted elegance for your home',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global identity schemas — emitted site-wide so every public page inherits
  // Organization / LocalBusiness / WebSite without per-page repetition.
  const globalSchemas = [
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
  ];

  return (
    <>
      <JsonLd schema={globalSchemas} />
      <Navbar />
      <main>
        {children}
     </main>
      <Footer />
      <WhatsAppFloater />
    </>
  );
}
