// src/app/page.tsx
"use client";

// src/app/page.tsx
export const dynamic = "force-dynamic";

import { useAuth } from "@/contexts/AuthContext";
// src/app/page.tsx
import { CourseCard } from '@/components/home/CourseCard';
import { HeroSection } from '@/components/home/HeroSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { courses as allCourses } from '@/data/courses'; // Mock data
import { testimonials as allTestimonials } from '@/data/testimonials'; // Mock data
import { CheckCircle, Zap, Users } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/app/lib/placeholder-images.json';

export default function HomePage() {
  // For demonstration, taking first 3 courses for the homepage
  const featuredCourses = allCourses.slice(0, 3); 

  return (
    <div className="flex flex-col">
      <HeroSection />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Featured <span className="text-primary">Courses</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Kickstart your learning journey with our most popular online courses, designed for immediate impact and career growth.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                Why Choose <span className="text-primary">Knowledge Craft?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
                We are committed to providing high-quality, accessible, and practical tech education. We empower you to achieve your career goals with skills that are relevant in today's industry.
              </p>
              <ul className="space-y-4 text-left">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Expert-Crafted Content</h4>
                    <p className="text-muted-foreground">Courses designed and taught by industry professionals with real-world experience.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Zap className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Learn at Your Own Pace</h4>
                    <p className="text-muted-foreground">Flexible learning schedules that fit your life. Access materials anytime, anywhere.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Supportive Community</h4>
                    <p className="text-muted-foreground">Connect with peers, mentors, and instructors in our active forums and discussion groups.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-80 md:h-96">
               <Image 
                src={placeholderImages['why-k-craft']}
                alt="Why Knowledge Craft" 
                fill
                className="object-cover rounded-xl shadow-xl"
                data-ai-hint="team collaboration"
                />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={allTestimonials} />
    </div>
  );
}
