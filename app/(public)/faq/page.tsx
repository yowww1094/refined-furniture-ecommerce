import { FaqList, type FaqItem } from '@/components/faq/FaqList';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqPageSchema } from '@/lib/utils/structured-data';
import { createServerClient } from '@/lib/supabase/server';
import { useRouter } from 'next/navigation';

export const metadata = generateMetadata({
  title: 'FAQ: 'FAQ - Refined Furniture',
  description: 'Find answers to frequently asked questions about our products, custom furniture, ordering, and more.',
});

export default async function FAQPage() {
  const router = useRouter();
  const locale = router.locale;

  const faqs = await loadFaqs();

  // LocalBusiness + Organization + WebSite are emitted globally from the
  // (public) layout, so we only add the page-specific schemas here.
  const pageSchemas = [
    breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'FAQ', href: '/faq' },
    ]),
    faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
  ];

  return (
    <section className="py-16 bg-background">
      <JsonLd schema={pageSchemas} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-3xl font-bold text-center text-foreground">
          Frequently Asked Questions
        </h1>
        <FaqList faqs={faqs} />
       </div>
     </section>
  );
}

async function loadFaqs(): Promise<FaqItem[]> {
  // Pull the same rows the client accordion renders. Server-side access so
  // JSON-LD can be built off the same source of truth (no duplicate logic).
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer, sort_order, is_active')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(50);

  if (error) {
    console.warn('[faq/page] failed to load FAQs:', error.message);
    return [];
  }

  return ((data ?? []) as FaqRow[]).map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
  }));
}

interface FaqRow {
  id: string;
  question: string;
  answer: string;
}