export function CTA() {
  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our exquisite collection of handcrafted Moroccan furniture or start a custom design consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/shop" className="flex-1 sm:flex-none">
              <button className="w-full py-3 px-6 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors">
                Browse Collection
              </button>
            </a>
            <a href="/custom-furniture" className="flex-1 sm:flex-none">
              <button className="w-full py-3 px-6 border border-accent/50 text-accent font-medium rounded-lg hover:bg-accent/10 transition-colors">
                Custom Design
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}