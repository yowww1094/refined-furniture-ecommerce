export function Features() {
  return (
    <section className="py-12 bg-background/50">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover what sets our Moroccan furniture apart - from authentic craftsmanship to personalized service.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1: Craftsmanship */}
          <div className="text-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/20 text-accent mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M5 13l2 2 2-2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Authentic Craftsmanship</h3>
            <p className="text-muted-foreground">
              Each piece is handcrafted by skilled artisans using traditional Moroccan techniques passed down through generations.
            </p>
          </div>

          {/* Feature 2: Customization */}
          <div className="text-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/20 text-accent mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Custom Design</h3>
            <p className="text-muted-foreground">
              Work with our designers to create bespoke furniture pieces tailored to your exact specifications and space requirements.
            </p>
          </div>

          {/* Feature 3: Quality Materials */}
          <div className="text-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/20 text-accent mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a6 6 0 01-9.629 8.106l1.242-1.562a6 6 0 1011.387-2.544" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
            <p className="text-muted-foreground">
              We source only the finest woods, fabrics, and materials to ensure lasting beauty and durability in every piece.
            </p>
          </div>

          {/* Feature 4: Customer Service */}
          <div className="text-center p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/20 text-accent mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Exceptional Service</h3>
            <p className="text-muted-foreground">
              From initial consultation to delivery and beyond, our dedicated team ensures a seamless experience every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}