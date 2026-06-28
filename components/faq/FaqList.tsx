'use client';

import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Pure client-side accordion. The parent Server Component is responsible for
 * fetching the FAQ rows from Supabase — this component just renders an
 * open/close list. Keeping the data fetch out of the client tree means
 * JSON-LD schema can be built on the server with the same data.
 */
export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No FAQs available right now.
     </p>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} faq={faq} />
      ))}
   </div>
  );
}

function AccordionItem({ faq }: { faq: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${faq.id}`}
        className={`flex w-full items-center justify-between p-4 text-left text-sm font-medium ${
          isOpen
            ? 'bg-accent/50 text-accent'
            : 'bg-background/50 hover:bg-accent/10'
        }`}
      >
        <div className="flex items-center w-0 flex-1 gap-3">
          <span className="block" aria-hidden="true">❓</span>
          <span>{faq.question</span>
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
        <div
          id={`faq-panel-${faq.id}`}
          className="border-t border-border/50 bg-background/50 px-4 py-3 text-sm text-muted-foreground"
        >
          <p>{faq.answer</p>
       </div>
      )}
   </div>
  );
}
