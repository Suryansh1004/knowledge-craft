// src/app/courses/[courseSlug]/blog/[blogSlug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RelatedBlogs } from '@/components/blog/RelatedBlogs';
import { BlogPageClient } from '@/components/blog/BlogPageClient';
import { Skeleton } from '@/components/ui/skeleton';
import { courses as allCourses } from '@/data/courses';
import { blogs as allBlogs } from '@/data/blogs';
import type { Blog as BlogType, Course } from '@/types';

// ✅ Inline type for compatibility with Next.js dynamic route props
type RouteParams = {
  params: { courseSlug: string; blogSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return allCourses.find((course) => course.slug === slug);
}

async function getBlogBySlug(slug: string, courseId: string): Promise<BlogType | undefined> {
  return allBlogs.find((blog) => blog.slug === slug && blog.courseId === courseId);
}

export default async function BlogPage({ params }: RouteParams) {
  const { courseSlug, blogSlug } = params;

  const course = await getCourseBySlug(courseSlug);
  if (!course) notFound();

  const blog = await getBlogBySlug(blogSlug, course.id);
  if (!blog) notFound();

  const { icon, ...serializableCourseData } = course;
  const courseBlogsForSuggestions = allBlogs.filter((b) => b.courseId === course.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <BlogPageClient course={serializableCourseData} blog={blog} params={params} />
        </div>
        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
          <Suspense fallback={<Skeleton className="h-40 w-full rounded-lg" />}>
            <RelatedBlogs
              currentBlogContent={blog.content}
              currentBlogId={blog.id}
              courseSlug={courseSlug}
              allBlogsForCourse={courseBlogsForSuggestions}
            />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params }: RouteParams
): Promise<Metadata> {
  const { courseSlug, blogSlug } = params;

  const course = await getCourseBySlug(courseSlug);
  if (!course) return { title: 'Blog Post Not Found' };

  const blog = await getBlogBySlug(blogSlug, course.id);
  if (!blog) return { title: 'Blog Post Not Found' };

  return {
    title: `${blog.title} | Knowledge Craft`,
    description: blog.excerpt || blog.content.substring(0, 160),
  };
}
