
// src/app/courses/[courseSlug]/blog/[blogSlug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import { RelatedBlogs } from '@/components/blog/RelatedBlogs';
import { BlogPageClient } from '@/components/blog/BlogPageClient';
import { Skeleton } from '@/components/ui/skeleton';
import { courses as allCourses } from '@/data/courses';
import { blogs as allBlogs } from '@/data/blogs';
import type { Blog as BlogType, Course } from '@/types';

// Data fetching functions
async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return allCourses.find((course) => course.slug === slug);
}

async function getBlogBySlug(slug: string, courseId: string): Promise<BlogType | undefined> {
  return allBlogs.find((blog) => blog.slug === slug && blog.courseId === courseId);
}

// Explicit PageProps type interface
interface PageProps {
  params: {
    courseSlug: string;
    blogSlug: string;
  };
  searchParams?: { [key:string]: string | string[] | undefined };
}

export default async function BlogPage({ params }: PageProps): Promise<JSX.Element> {
  const { courseSlug, blogSlug } = params;

  const course = await getCourseBySlug(courseSlug);
  if (!course) {
    notFound();
  }

  const blog = await getBlogBySlug(blogSlug, course.id);
  if (!blog) {
    notFound();
  }

  // Ensure only serializable data is passed to Client Components
  const { icon, ...serializableCourseData } = course;
  const courseBlogsForSuggestions = allBlogs.filter((b) => b.courseId === course.id);

  return (
    <div className="py-8">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <BlogPageClient
            course={serializableCourseData}
            blog={blog}
            params={{ courseSlug, blogSlug }}
          />
        </div>
        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
          <Suspense fallback={<Skeleton className="h-40 w-full rounded-lg" />}>
            <RelatedBlogs
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
  props: PageProps, // Use the PageProps type here
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { params } = props; // Destructure params from props
  const { courseSlug, blogSlug } = params;

  const course = await getCourseBySlug(courseSlug);
  if (!course) {
    return { title: 'Blog Post Not Found' };
  }

  const blog = await getBlogBySlug(blogSlug, course.id);
  if (!blog) {
    return { title: 'Blog Post Not Found' };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = blog.image ? { url: blog.image, width: 1200, height: 630 } : previousImages[0];


  return {
    title: blog.title, // Title will be composed with template from layout
    description: blog.excerpt || blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      authors: [blog.author],
      images: ogImage ? [ogImage] : previousImages,
    },
  };
}
