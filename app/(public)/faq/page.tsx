import { FaqList } from '@/components/faq/FaqList';
import { generateMetadata } from '@/lib/utils/generate-metadata';

export const metadata = generateMetadata({
  title: 'FAQ - Refined Furniture',
  description: 'Find answers to frequently asked questions about our products, custom furniture, ordering, and more.',
});

export default function FAQPage() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-3xl font-bold text-center text-foreground">
          Frequently Asked Questions
        </h1>
        <FaqList />
      </div>
    </section>
  );
}