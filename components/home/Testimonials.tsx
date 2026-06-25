export function Testimonials() {
  // In a real app, this data would come from a database or CMS
  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      location: "Marrakech, Morocco",
      content: "The craftsmanship is absolutely stunning. Our custom dining table became the centerpiece of our home, and we've received countless compliments from guests.",
      rating: 5,
      image: "/testimonial-1.jpg"
    },
    {
      id: 2,
      name: "Michael & Lisa T.",
      location: "Paris, France",
      content: "Working with the team was a pleasure from start to finish. They captured our vision perfectly and delivered exceptional quality.",
      rating: 5,
      image: "/testimonial-2.jpg"
    },
    {
      id: 3,
      name: "David K.",
      location: "New York, USA",
      content: "The attention to detail is remarkable. Every piece feels like a work of art, and the materials are of the highest quality.",
      rating: 5,
      image: "/testimonial-3.jpg"
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hear from those who have experienced the beauty and quality of our handcrafted furniture.
          </p>
        </header>

        <div className="grid gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}`}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <div className="mt-1 flex space-x-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= testimonial.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}