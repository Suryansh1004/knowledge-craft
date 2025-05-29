
// src/app/courses/[courseSlug]/blog/[blogSlug]/page.tsx
import React, { Suspense } from 'react';
import { courses as allCourses } from '@/data/courses';
import { blogs as allBlogs } from '@/data/blogs';
import type { Course, Blog as BlogType } from '@/types';
import { notFound } from 'next/navigation';
import { RelatedBlogs } from '@/components/blog/RelatedBlogs';
import { BlogPageClient } from '@/components/blog/BlogPageClient';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Ensure CardHeader and CardTitle are imported
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Define the props type directly for the page component and metadata function
type PageParams = {
  courseSlug: string;
  blogSlug: string;
};

// Mock function to get course by slug (remains the same)
async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return allCourses.find(course => course.slug === slug);
}

// Mock function to get blog by slug and course ID (remains the same)
async function getBlogBySlug(slug: string, courseId: string): Promise<BlogType | undefined> {
  return allBlogs.find(blog => blog.slug === slug && blog.courseId === courseId);
}

// Server Component for the page
export default async function BlogPage({ params }: { params: PageParams }) {
  const course = await getCourseBySlug(params.courseSlug);

  if (!course) {
    notFound();
  }

  const blog = await getBlogBySlug(params.blogSlug, course.id);

  if (!blog) {
    notFound();
  }

  const courseBlogsForSuggestions = allBlogs.filter(b => b.courseId === course.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <BlogPageClient course={course} blog={blog} params={params} />
        </div>
        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
          <Suspense fallback={<Skeleton className="h-40 w-full rounded-lg" />}>
            <RelatedBlogs
              currentBlogContent={blog.content}
              currentBlogId={blog.id}
              courseSlug={params.courseSlug}
              allBlogsForCourse={courseBlogsForSuggestions}
            />
          </Suspense>
           {/* Author card was moved to BlogPageClient, can be here too if static */}
        </aside>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) return { title: "Blog Post Not Found" };
  const blog = await getBlogBySlug(params.blogSlug, course.id);
  if (!blog) return { title: "Blog Post Not Found" };

  return {
    title: `${blog.title} | Knowledge Craft`,
    description: blog.excerpt || blog.content.substring(0, 160),
  };
}
