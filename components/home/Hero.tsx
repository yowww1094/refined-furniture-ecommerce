export function Hero() {
  return (
    <section className="relative pt-20 pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Handcrafted Moroccan Furniture
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Exquisite pieces that blend traditional craftsmanship with contemporary design
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
            <a
              href="/shop"
              className="flex-1 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              Shop Collection
            </a>
            <a
              href="/custom-furniture"
              className="flex-1 px-6 py-3 border border-accent/50 text-accent font-medium rounded-lg hover:bg-accent/10 transition-colors"
            >
              Custom Furniture
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 left-1/2 -z-10 w-[10 w-20 h-20 bg-accent/10 rounded-full transform -translate-x-1/2 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/2 -z-10 w-28 h-28 bg-accent/5 rounded-full transform translate-x-1/2 animate-pulse-slow delay-1000"></div>
        </div>
      </div>
    </section>
  );
}