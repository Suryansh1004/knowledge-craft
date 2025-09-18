// src/components/home/TestimonialsSection.tsx
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/types';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center">
            What Our <span className="text-primary">Learners Say</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who have transformed their careers with Knowledge Craft.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col">
              <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic leading-relaxed mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <h3 className="text-xl font-semibold text-foreground mt-auto">{testimonial.name}</h3>
                <p className="text-sm text-accent font-medium">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
