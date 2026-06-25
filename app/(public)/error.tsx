'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon, Search, MessageCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Link from '@/components/ui/link';

export default function Error({
  error,
  resetError
}: {
  error: Error & { digest?: string };
  resetError: () => void;
}) {
  const [message, setMessage] = useState(error.message);

  // Provide a more user-friendly message in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      setMessage('Something went wrong. Please try again later.');
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background">
      <div className="text-center space-y-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-accent/20 text-accent mb-4">
          <AlertCircle className="h-7 w-7" />
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          Something went wrong
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="flex-1 sm:flex-none">
            <Button variant="outline">Return to Home</Button>
          </Link>

          <Button onClick={resetError} className="flex-1 sm:flex-none">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>

        <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
          <Link href="/contact">
            Report this issue
          </Link>
        </div>
      </div>
    </section>
  );
}

// Error boundaries don't need metadata typically, but we can export an empty object
export const generateMetadata = () => ({});