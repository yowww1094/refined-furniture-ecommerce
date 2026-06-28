import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { Features } from '@/components/home/Features';
import { CTA } from '@/components/home/CTA';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/utils/structured-data';

export const metadata = generateMetadata({
  title: 'Custom Furniture Atelier - Refined Furniture',
  description: 'Bring your unique vision to life with our custom Moroccan furniture service. Work with master craftsmen to create bespoke pieces tailored to your space.',
});

export default function CustomFurniturePage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Custom Furniture', href: '/custom-furniture' },
        ])}
      />
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        title="Custom Furniture Atelier"
        subtitle="Bring your vision to life with our master craftsmen"
        bgImage="/images/custom-furniture-hero.jpg" // This would be replaced with actual image
        buttonText="Start Your Custom Project"
        buttonHref="/custom-furniture/request"
      />

      {/* Features/Benefits Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Custom Furniture Service?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Master Craftsmanship */}
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
              <div className="flex items-center justify-center h-16 w-16 mb-6 bg-success/20 rounded-full">
                <span className="text-2xl text-success">🔨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Master Craftsmanship</h3>
              <p className="text-muted-foreground">
                Our artisans combine traditional Moroccan techniques with modern design to create heirloom-quality pieces.
              </p>
            </div>

            {/* Feature 2: Personalized Design */}
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
              <div className="flex items-center justify-center h-16 w-16 mb-6 bg-success/20 rounded-full">
                <span className="text-2xl text-success">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Design</h3>
              <p className="text-muted-foreground">
                Every piece is designed specifically for your space, style, and functional needs.
              </p>
            </div>

            {/* Feature 3: Premium Materials */}
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
              <div className="flex items-center justify-center h-16 w-16 mb-6 bg-success/20 rounded-full">
                <span className="text-2xl text-success">🌳</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Materials</h3>
              <p className="text-muted-foreground">
                We source the finest woods, metals, and textiles to ensure lasting beauty and durability.
              </p>
            </div>

            {/* Feature 4: Transparent Process */}
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
              <div className="flex items-center justify-center h-16 w-16 mb-6 bg-success/20 rounded-full">
                <span className="text-2xl text-success">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Transparent Process</h3>
              <p className="text-muted-foreground">
                From concept to delivery, you're involved at every step with regular updates and approvals.
              </p>
            </div>

            {/* Feature 5: Fair Pricing */}
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
              <div className="flex items-center justify-center h-16 w-16 mb-6 bg-success/20 rounded-full">
                <span className="text-2xl text-success">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Fair Pricing</h3>
              <p className="text-muted-foreground">
                Detailed quotes with no hidden fees. Cash on delivery for your peace of mind.
              </p>
            </div>

            {/* Feature 6: Delivery & Setup */}
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
              <div className="flex items-center justify-center h-16 w-16 mb-6 bg-success/20 rounded-full">
                <span className="text-2xl text-success">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Delivery & Setup</h3>
              <p className="text-muted-foreground">
                Professional delivery and setup included within our service area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Simple Custom Furniture Process
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Step 1: Inquiry */}
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-success/20 rounded-full">
                <span className="text-2xl text-success">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Submit Your Request</h3>
              <p className="text-muted-foreground">
                Share your vision with dimensions, inspiration images, materials preferences, and budget.
              </p>
            </div>

            {/* Step 2: Design Consultation */}
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-success/20 rounded-full">
                <span className="text-2xl text-success">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Design Consultation</h3>
              <p className="text-muted-foreground">
                Our designers review your request and create detailed sketches with material options.
              </p>
            </div>

            {/* Step 3: Quotation & Approval */}
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-success/20 rounded-full">
                <span className="text-2xl text-success">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quotation & Approval</h3>
              <p className="text-muted-foreground">
                Receive a detailed quotation. Once approved, we begin crafting your piece.
              </p>
            </div>

            {/* Step 4: Craftsmanship */}
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-success/20 rounded-full">
                <span className="text-2xl text-success">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Craftsmanship</h3>
              <p className="text-muted-foreground">
                Our master artisans handcraft your furniture with meticulous attention to detail.
              </p>
            </div>

            {/* Step 5: Delivery */}
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-success/20 rounded-full">
                <span className="text-2xl text-success">5</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Delivery & Setup</h3>
              <p className="text-muted-foreground">
                We deliver and set up your custom piece, ensuring it's perfect in your space.
              </p>
            </div>

            {/* Step 6: Enjoy */}
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-success/20 rounded-full">
                <span className="text-2xl text-success">6</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Enjoy for Generations</h3>
              <p className="text-muted-foreground">
                Your custom furniture becomes a cherished part of your home's story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Gallery Section would go here in a full implementation */}
      {/* For MVP, we'll use a CTA to drive action */}
      <CTA
        title="Ready to Create Your Dream Piece?"
        subtitle="Start your custom furniture journey today"
        buttonText="Begin Custom Request"
        buttonHref="/custom-furniture/request"
      />
    </div>
    </>
  );
}