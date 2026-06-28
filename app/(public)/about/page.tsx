import { AboutContent } from '@/components/about/AboutContent';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/utils/structured-data';
import { useRouter } from 'next/navigation';

export const metadata = generateMetadata({
  title: 'About Us - Refined Furniture',
  description: 'Learn about Refined Furniture, our story, craftsmanship, and values. Discover what makes our Moroccan furniture exceptional.',
});

export default function AboutPage() {
  const router = useRouter();
  const locale = router.locale;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ])}
      />
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutContent />
        </div>
      </section>
    </>
  );
}