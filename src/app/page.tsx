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

export default function HomePage() {
  // For demonstration, taking first 3 courses for the homepage
  const featuredCourses = allCourses.slice(0, 3); 

  return (
    <div className="flex flex-col">
      <HeroSection />

      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Featured <span className="text-primary">Courses</span>
              </h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-prose">
                Kickstart your learning journey with our most popular online courses, designed for immediate impact and career growth.
              </p>
            </div>
            <div className="mt-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Why Choose <span className="text-primary">Knowledge Craft?</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-prose">
                  We are committed to providing high-quality, accessible, and practical tech education. We empower you to achieve your career goals with skills that are relevant in today's industry.
                </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-xl text-foreground">Expert-Crafted Content</h4>
                      <p className="text-muted-foreground mt-1">Courses designed and taught by industry professionals with real-world experience, ensuring you learn what truly matters.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Zap className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-xl text-foreground">Learn at Your Own Pace</h4>
                      <p className="text-muted-foreground mt-1">Flexible learning schedules that fit your life. Access materials anytime, anywhere, and progress on your own terms.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Users className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-xl text-foreground">Supportive Community</h4>
                      <p className="text-muted-foreground mt-1">Connect with peers, mentors, and instructors in our active forums and discussion groups. You're never alone in your journey.</p>
                    </div>
                  </li>
                </ul>
            </div>
        </div>
      </section>

      <TestimonialsSection testimonials={allTestimonials} />
    </div>
  );
}
