import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Testimonials } from '@/components/home/Testimonials';
import { Features } from '@/components/home/Features';
import { CTA } from '@/components/home/CTA';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/utils/structured-data';

export const metadata = generateMetadata({
  title: 'Home - Refined Furniture',
  description: 'Discover handcrafted Moroccan furniture, premium ready-made pieces and bespoke custom atelier service. Shop luxury furniture inspired by Moroccan craftsmanship.',
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([{ name: 'Home', href: '/' }])}
        id="ld-home-breadcrumb"
      />
      <Hero />
      <Features />
      <FeaturedProducts />
      <Testimonials />
      <CTA />
    </>
  );
}