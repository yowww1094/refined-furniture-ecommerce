import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/utils/structured-data';
import { useRouter } from 'next/navigation';

export const metadata = generateMetadata({
  title: 'Contact Us - Refined Furniture',
  description: 'Get in touch with Refined Furniture. Contact us for product inquiries, custom furniture requests, or support.',
});

export default function ContactPage() {
  const router = useRouter();
  const locale = router.locale;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ])}
      />
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactInfo />
          <ContactForm />
       </div>
     </div>
    </>
  );
}