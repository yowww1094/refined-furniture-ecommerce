import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LucideIcon, Search, MessageCircle, Treasure } from 'lucide-react';
import { Link } from '@/components/ui/link';

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background">
      <div className="text-center space-y-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-muted-foreground mb-4">
          <Search className="h-6 w-6" />
        </div>

        <h1 className="text-4xl font-bold text-foreground">
          Page Not Found
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="flex-1 sm:flex-none">
            <Button variant="outline">Return to Home</Button>
          </Link>

          <Button
            onClick={() => {
              // Simple search redirect - we could enhance this with actual search
              const searchTerm = prompt('What are you looking for?');
              if (searchTerm) {
                window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
              }
            }}
          >
            Search Our Site
          </Button>
        </div>

        <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
          <Link href="/contact">
            Need help? Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

// Export the generateMetadata function for SEO
export const generateMetadata = () => ({
  title: 'Page Not Found - Refined Furniture',
  description: 'The page you are looking for cannot be found. Please check the URL or return to the homepage.',
});