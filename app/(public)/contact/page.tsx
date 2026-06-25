import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { generateMetadata } from '@/lib/utils/generate-metadata';

export const metadata = generateMetadata({
  title: 'Contact Us - Refined Furniture',
  description: 'Get in touch with Refined Furniture. Contact us for product inquiries, custom furniture requests, or support.',
});

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}