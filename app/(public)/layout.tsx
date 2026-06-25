import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout';
import { Footer } from '@/components/layout';
import { WhatsAppFloater } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Refined Furniture',
  description: 'Premium Moroccan Furniture — handcrafted elegance for your home',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloater />
    </>
  );
}