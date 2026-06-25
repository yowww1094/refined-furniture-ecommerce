'use client';

import { FAQ } from '@/types/database';
import { supabase } from '@/lib/supabase/server';
import { Accordion } from '@/components/ui/accordion';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FAQProps {
  faqs: FAQ[];
}

export async function FaqList() {
  // Fetch FAQs from the database
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true })
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching FAQs:', error);
    return <p className="text-center text-destructive">Failed to load FAQs.</p>;
  }

  const faqs: FAQ[] = data || [];

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} faq={faq} />
      ))}
    </div>
  );
}

function AccordionItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-border/50 rounded-lg">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between p-4 text-left text-sm font-medium
          ${isOpen
            ? 'bg-accent/50 text-accent'
            : 'bg-background/50 hover:bg-accent/10'}`}
      >
        <div className="flex items-center w-0 flex-1 gap-3">
          <span className="flex h-4 w-4 shrink-0">
            {/* You can add an icon here if needed */}
            <span className="block">❓</span>
          </span>
          <span>{faq.question}</span>
        </div>
        <div className="flex-shrink-0 flex items-center px-2">
          {isOpen ? (
            <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="border-t border-border/50 bg-background/50 px-4 py-3 text-sm text-muted-foreground">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}