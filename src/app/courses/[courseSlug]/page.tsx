// src/app/courses/[courseSlug]/page.tsx
import { courses as allCourses } from '@/data/courses';
import { blogs as allBlogs } from '@/data/blogs';
import type { Course, Blog } from '@/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogListItem } from '@/components/blog/BlogListItem';
import { Clock, BarChart3, Users, PlayCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface CoursePageProps {
  params: {
    courseSlug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Mock function to get course by slug
async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return allCourses.find(course => course.slug === slug);
}

// Mock function to get blogs by course ID
async function getBlogsByCourseId(courseId: string): Promise<Blog[]> {
  return allBlogs.filter(blog => blog.courseId === courseId);
}

export async function generateStaticParams() {
  return allCourses.map(course => ({
    courseSlug: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) {
    return {
      title: "Course Not Found | Knowledge Craft",
      description: "The course you are looking for could not be found."
    }
  }
  return {
    title: `${course.title} | Knowledge Craft`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseBySlug(params.courseSlug);

  if (!course) {
    notFound();
  }

  const courseBlogs = await getBlogsByCourseId(course.id);
  const IconComponent = course.icon;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Course Content */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl mb-8">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={course.data_ai_hint as string || course.title.toLowerCase().split(" ").slice(0,2).join(" ")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <Badge variant="secondary" className="mb-2 w-fit text-sm bg-opacity-80 backdrop-blur-sm">{course.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white shadow-strong">{course.title}</h1>
            </div>
          </div>

          <div className="mb-8 prose prose-lg max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-accent">
            <h2 className="text-2xl font-semibold text-primary mb-3">About this course</h2>
            <p className="text-muted-foreground">{course.description}</p>
            {/* Add more course details here if available, e.g. learning objectives, curriculum */}
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-6">Course Curriculum & Articles</h2>
            {courseBlogs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {courseBlogs.map(blog => (
                  <BlogListItem key={blog.id} blog={blog} courseSlug={course.slug}/>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No articles available for this course yet. Check back soon!</p>
            )}
          </div>
        </div>

        {/* Sidebar / Course Info Card */}
        <aside className="lg:col-span-1 space-y-6 sticky top-24 self-start">
           <div className="p-6 border rounded-lg shadow-lg bg-card">
            {IconComponent && (
              <div className="text-primary mb-4">
                <IconComponent className="h-12 w-12" />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-4 text-foreground">{course.title}</h3>
            <div className="space-y-3 text-sm text-muted-foreground mb-6">
              <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-accent" /> <span>Self-paced learning</span></div>
              <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-2 text-accent" /> <span>Beginner to Advanced</span></div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2 text-accent" /> <span>10,000+ Students Enrolled</span></div>
            </div>
            <Button size="lg" className="w-full group">
              Enroll Now <PlayCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">30-Day Money-Back Guarantee</p>
          </div>
          {/* You can add more sidebar content here, like instructor bio, related courses etc. */}
        </aside>
      </div>
    </div>
  );
}
