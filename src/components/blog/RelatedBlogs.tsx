// src/components/blog/RelatedBlogs.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface RelatedBlogsProps {
  currentBlogId: string;
  courseSlug: string;
  allBlogsForCourse: Array<{ id: string; slug: string; title: string }>;
}

export function RelatedBlogs({ currentBlogId, courseSlug, allBlogsForCourse }: RelatedBlogsProps) {
  // Filter out the current blog and take the first 3 as suggestions.
  const relatedBlogLinks = allBlogsForCourse
    .filter(blog => blog.id !== currentBlogId)
    .slice(0, 3);

  if (relatedBlogLinks.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-primary">
            <Lightbulb className="mr-2 h-5 w-5" />
            Explore More
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No other articles in this course yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-primary">
          <Lightbulb className="mr-2 h-5 w-5" />
          Related Reads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {relatedBlogLinks.map((blog) => (
            <li key={blog.id}>
              <Link href={`/courses/${courseSlug}/blog/${blog.slug}`} className="text-sm text-accent hover:underline flex items-center">
                {blog.title}
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
