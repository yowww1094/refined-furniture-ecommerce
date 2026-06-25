import { AboutContent } from '@/components/about/AboutContent';
import { generateMetadata } from '@/lib/utils/generate-metadata';

export const metadata = generateMetadata({
  title: 'About Us - Refined Furniture',
  description: 'Learn about Refined Furniture, our story, craftsmanship, and values. Discover what makes our Moroccan furniture exceptional.',
});

export default function AboutPage() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutContent />
      </div>
    </section>
  );
}