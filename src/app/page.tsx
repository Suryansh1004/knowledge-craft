
// src/app/page.tsx
import { CourseCard } from '@/components/home/CourseCard';
import { HeroSection } from '@/components/home/HeroSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { courses as allCourses } from '@/data/courses'; // Mock data
import { testimonials as allTestimonials } from '@/data/testimonials'; // Mock data
import { CheckCircle, Zap, Users } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  // For demonstration, taking first 3 courses for the homepage
  const featuredCourses = allCourses.slice(0, 3); 

  return (
    <div className="flex flex-col">
      <HeroSection />

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured <span className="text-primary">Courses</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Kickstart your learning journey with our most popular courses.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Choose <span className="text-primary">Knowledge Craft?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Knowledge Craft is dedicated to providing high-quality, accessible, and practical tech education. We empower you to achieve your career goals with skills that matter.
              </p>
              <ul className="space-y-4">
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
                src="https://placehold.co/500x400/4DD0E1/FFFFFF?text=Why+Knowledge+Craft" 
                alt="Why Knowledge Craft" 
                layout="fill" 
                objectFit="cover" 
                className="rounded-xl shadow-xl"
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

