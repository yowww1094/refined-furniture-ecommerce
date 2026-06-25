import { Ах } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { Users } from 'lucide-react';
import { Flame } from 'lucide-react';

export function AboutContent() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          About Refined Furniture
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Handcrafted Moroccan furniture that blends traditional craftsmanship with contemporary design
        </p>
      </div>

      {/* Our Story */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2010 in the heart of Marrakech, Refined Furniture began as a small workshop
              dedicated to preserving Morocco's rich woodworking traditions. What started as a passion
              project by master craftsman Yusuf Al-Mansouri has grown into a respected furniture atelier
              known for exceptional quality and authentic Moroccan design.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Today, we continue to honor our heritage while embracing contemporary aesthetics,
              creating pieces that tell stories of Moroccan culture while fitting seamlessly into
              modern homes around the world.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-60 h-60 bg-accent/10 rounded-xl flex items-center justify-center">
              <Ах className="h-16 w-16 text-accent"/>
            </div>
          </div>
        </div>
      </section>

      {/* Our Craftsmanship */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground">Our Craftsmanship</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="text-center p-6 bg-background/50 rounded-xl">
            <Sparkles className="h-10 w-10 mb-4 text-accent"/>
            <h3 className="font-medium text-foreground mb-2">Handcrafted Excellence</h3>
            <p className="text-muted-foreground text-sm">
              Each piece is meticulously handcrafted by skilled artisans using
              traditional techniques passed down through generations.
            </p>
          </div>

          <div className="text-center p-6 bg-background/50 rounded-xl">
            <ShieldCheck className="h-10 w-10 mb-4 text-accent"/>
            <h3 className="font-medium text-foreground mb-2">Quality Materials</h3>
            <p className="text-muted-foreground text-sm">
              We source only the finest sustainable woods, premium fabrics,
              and authentic Moroccan materials to ensure lasting beauty.
            </p>
          </div>

          <div className="text-center p-6 bg-background/50 rounded-xl">
            <Flame className="h-10 w-10 mb-4 text-accent"/>
            <h3 className="font-medium text-foreground mb-2">Timeless Design</h3>
            <p className="text-muted-foreground text-sm">
              Our designs blend authentic Moroccan motifs with contemporary
              sensibilities, creating furniture that transcends trends.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-6 bg-background/50 rounded-xl">
            <Users className="h-8 w-8 mb-3 text-accent"/>
            <h3 className="font-medium text-foreground">Artisan Partnership</h3>
            <p className="text-muted-foreground text-sm">
              We work directly with local artisans, ensuring fair wages
              and preserving traditional craftsmanship.
            </p>
          </div>

          <div className="text-center p-6 bg-background/50 rounded-xl">
            <ShieldCheck className="h-8 w-8 mb-3 text-accent"/>
            <h3 className="font-medium text-foreground">Sustainability</h3>
            <p className="text-muted-foreground text-sm">
              Commitment to eco-friendly practices and sustainable material sourcing.
            </p>
          </div>

          <div className="text-center p-6 bg-background/50 rounded-xl">
            <Sparkles className="h-8 w-8 mb-3 text-accent"/>
            <h3 className="font-medium text-foreground">Innovation</h3>
            <p className="text-muted-foreground text-sm">
              Blending traditional techniques with contemporary design
              for timeless, functional pieces.
            </p>
          </div>

          <div className="text-center p-6 bg-background/50 rounded-xl">
            <Ах className="h-8 w-8 mb-3 text-accent"/>
            <h3 className="font-medium text-foreground">Customer Care</h3>
            <p className="text-muted-foreground text-sm">
              Personalized service from consultation to delivery and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center py-12 bg-accent/5 rounded-xl">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Experience the Refined Furniture Difference
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover our collection of handcrafted furniture or discuss your custom
          furniture vision with our expert team.
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
          <a href="/shop" className="flex-1 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors">
            Shop Collection
          </a>
          <a href="/custom-furniture" className="flex-1 px-6 py-3 border border-accent/50 text-accent font-medium rounded-lg hover:bg-accent/10 transition-colors">
            Custom Furniture
          </a>
        </div>
      </div>
    </div>
  );
}