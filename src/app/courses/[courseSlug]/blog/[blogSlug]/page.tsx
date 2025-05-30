
// src/app/courses/[courseSlug]/blog/[blogSlug]/page.tsx
import React, { Suspense } from 'react';
import { courses as allCourses } from '@/data/courses';
import { blogs as allBlogs } from '@/data/blogs';
import type { Course, Blog as BlogType } from '@/types';
import { notFound } from 'next/navigation';
import { RelatedBlogs } from '@/components/blog/RelatedBlogs';
import { BlogPageClient } from '@/components/blog/BlogPageClient';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata, ResolvingMetadata } from 'next';

// Define the props structure expected by Next.js dynamic route pages
type Props = {
  params: {
    courseSlug: string;
    blogSlug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Mock function to get course by slug
async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return allCourses.find(course => course.slug === slug);
}

// Mock function to get blog by slug and course ID
async function getBlogBySlug(slug: string, courseId: string): Promise<BlogType | undefined> {
  return allBlogs.find(blog => blog.slug === slug && blog.courseId === courseId);
}

// Server Component for the page
export default async function BlogPage({ params, searchParams }: Props) {
  // Destructure params for clarity, though Next.js should resolve them directly
  const { courseSlug, blogSlug } = params;

  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

  // Destructure the icon from the course object to make it serializable for the client component
  const { icon, ...serializableCourseData } = course;

  const blog = await getBlogBySlug(blogSlug, course.id);

  if (!blog) {
    notFound();
  }

  const courseBlogsForSuggestions = allBlogs.filter(b => b.courseId === course.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <BlogPageClient
            course={serializableCourseData}
            blog={blog}
            params={params} // Pass the original params object
          />
        </div>
        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
          <Suspense fallback={<Skeleton className="h-40 w-full rounded-lg" />}>
            <RelatedBlogs
              currentBlogContent={blog.content}
              currentBlogId={blog.id}
              courseSlug={courseSlug} // Use destructured slug
              allBlogsForCourse={courseBlogsForSuggestions}
            />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { courseSlug, blogSlug } = params; // Destructure params

  const course = await getCourseBySlug(courseSlug);
  if (!course) return { title: "Blog Post Not Found" };

  const blog = await getBlogBySlug(blogSlug, course.id);
  if (!blog) return { title: "Blog Post Not Found" };

  return {
    title: `${blog.title} | Knowledge Craft`,
    description: blog.excerpt || blog.content.substring(0, 160),
  };
}
