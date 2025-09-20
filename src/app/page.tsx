import HeroSection from "@/components/home/HeroSection";
import CourseCard from "@/components/home/CourseCard";
import { courses } from "@/data/courses";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section className="py-20 md:py-28 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular courses to kickstart your learning
              journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
