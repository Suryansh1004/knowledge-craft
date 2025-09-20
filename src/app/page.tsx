// src/app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";
import { CourseCard } from "@/components/home/CourseCard";
import { courses as allCourses } from "@/data/courses";

export default function HomePage() {
  const featuredCourses = allCourses.slice(0, 4); // Show first 4 courses

  return (
    <>
      <HeroSection />

      <section className="py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Featured <span className="text-primary">Courses</span>
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your learning journey with our most popular courses.
          </p>
        </div>
        {featuredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No featured courses available.</p>
        )}
      </section>
    </>
  );
}
