
// src/app/(main)/blog/page.tsx
import { blogs as allBlogs } from '@/data/blogs';
import { courses as allCourses } from '@/data/courses';
import { BlogListItem } from '@/components/blog/BlogListItem';
import type { Course } from '@/types';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tech Blog | Articles & Tutorials | Knowledge Craft',
  description: 'Explore expert articles, tutorials, and insights on web development, AI, data science, and cloud technology on the Knowledge Craft blog.',
};

export default function AllBlogsPage() {
  // Create a map for quick course lookup by ID
  const coursesMap = new Map<string, Course>();
  allCourses.forEach(course => coursesMap.set(course.id, course));

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-primary mb-2">Knowledge Craft Tech Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Dive into the Knowledge Craft blog for expert articles, tutorials, and the latest news on web development, AI, data science, and cloud technology. Stay ahead of the curve.
          </p>
        </div>
        <Button asChild className="shadow-sm">
          <Link href="/blog/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
          </Link>
        </Button>
      </div>

      {allBlogs.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map((blog) => {
            const course = coursesMap.get(blog.courseId);
            const courseSlug = course ? course.slug : 'unknown'; // Fallback if course not found
            if (!course && process.env.NODE_ENV === 'development') {
                console.warn(`Course with ID ${blog.courseId} not found for blog titled "${blog.title}" (ID: ${blog.id})`);
            }
            return (
              <BlogListItem key={blog.id} blog={blog} courseSlug={courseSlug} />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">
          No blog posts available yet. Check back soon!
        </p>
      )}
    </div>
  );
}
