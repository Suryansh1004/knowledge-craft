
// src/app/courses/page.tsx
import { CourseCard } from "@/components/home/CourseCard";
import { courses as allCourses } from "@/data/courses";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
// This page will be a server component, filtering can be done here or client-side for more dynamic interaction

export default function AllCoursesPage() {
  // In a real app, you might fetch courses based on search/filter query params
  const courses = allCourses;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Explore Our Online Courses</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our extensive library of online tech courses. Find the perfect program to advance your career, whether you're a beginner or an expert in web development, AI, data science, or cloud computing.
        </p>
      </div>
      
      {/* Basic Search and Filter Placeholder */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search courses..." className="pl-10 rounded-full shadow-sm" />
        </div>
        {/* Placeholder for filters */}
        {/* <Select>
          <SelectTrigger className="w-full sm:w-[180px] rounded-full shadow-sm">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web Development</SelectItem>
            <SelectItem value="data">Data Science</SelectItem>
            <SelectItem value="cloud">Cloud Computing</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {courses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No courses found. Check back soon!</p>
      )}
    </div>
  );
}
