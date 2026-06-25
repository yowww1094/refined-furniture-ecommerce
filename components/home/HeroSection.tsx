import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-b from-background/50 to-background/0">
      {/* Background image - placeholder */}
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: 'url("/hero-bg.jpg")'}}></div>

      <div className="relative z-10 flex flex-col items-center justify-start py-20 px-6 text-center text-foreground">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
          Handcrafted Moroccan Furniture
        </h1>
        <p className="mb-8 text-lg max-w-2xl">
          Discover exquisite, custom-made furniture pieces that blend traditional Moroccan craftsmanship with contemporary design.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/shop" className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium">
            Shop Collection
          </a>
          <a href="/custom-furniture" className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors font-medium">
            Custom Orders
          </a>
        </div>
      </div>
    </section>
  );
}