import Link from 'next/link';

export function FeaturedProjects() {
  // In a real app, this data would come from a database or CMS
  const featuredProjects = [
    {
      id: 1,
      title: "Riad Restoration Project",
      description: "Complete furniture suite for a traditional Marrakech riad",
      image: "/project-1.jpg",
      slug: "riad-restoration"
    },
    {
      id: 2,
      title: "Modern Villa Furnishings",
      description: "Contemporary furniture with traditional Moroccan motifs",
      image: "/project-2.jpg",
      slug: "modern-villa"
    },
    {
      id: 3,
      title: "Restaurant Interior Design",
      description: "Custom booths, tables, and bar fixtures for Casablance restaurant",
      image: "/project-3.jpg",
      slug: "restaurant-design"
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Recent Projects</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From private residences to commercial spaces, we bring authentic Moroccan craftsmanship to every project.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map(project => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group">
              <div className="aspect-w-4 aspect-h-3 w-full rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/projects" className="text-accent hover:text-accent/80 font-medium">
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
}