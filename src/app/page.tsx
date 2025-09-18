"use client";

export const dynamic = "force-dynamic";

import { CourseCard } from '@/components/home/CourseCard';
import { HeroSection } from '@/components/home/HeroSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { courses as allCourses } from '@/data/courses';
import { testimonials as allTestimonials } from '@/data/testimonials';
import { CheckCircle, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  const featuredCourses = allCourses.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Featured Courses */}
      <section className="w-full py-16 md:py-24 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured <span className="text-primary">Courses</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-prose">
              Kickstart your learning journey with our most popular online courses, designed for immediate impact and career growth.
            </p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-xl bg-primary text-white shadow hover:bg-primary/90 transition"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-16 md:py-24 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Why Choose <span className="text-primary">Knowledge Craft?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-prose">
              We are committed to providing high-quality, accessible, and practical tech education. 
              Empowering you with skills that are relevant in today&apos;s industry.
            </p>
          </motion.div>

          <div className="mt-12 max-w-3xl mx-auto">
            <ul className="space-y-8">
              {[
                {
                  Icon: CheckCircle,
                  title: "Expert-Crafted Content",
                  desc: "Courses taught by industry professionals with real-world experience, ensuring you learn what truly matters."
                },
                {
                  Icon: Zap,
                  title: "Learn at Your Own Pace",
                  desc: "Flexible schedules that fit your life. Access materials anytime, anywhere, and progress on your own terms."
                },
                {
                  Icon: Users,
                  title: "Supportive Community",
                  desc: "Connect with peers, mentors, and instructors in our active forums. You're never alone in your journey."
                },
              ].map(({ Icon, title, desc }, i) => (
                <motion.li
                  key={title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Icon aria-label={title} className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xl text-foreground">{title}</h4>
                    <p className="text-muted-foreground mt-1">{desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection testimonials={allTestimonials} />
    </div>
  );
}