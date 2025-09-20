
// src/app/blog/[blogSlug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import { RelatedBlogs } from '@/components/blog/RelatedBlogs';
import { BlogPageClient } from '@/components/blog/BlogPageClient';
import { Skeleton } from '@/components/ui/skeleton';
import { blogs as allBlogs } from '@/data/blogs';
import type { Blog as BlogType } from '@/types';

// Data fetching functions
async function getBlogBySlug(slug: string): Promise<BlogType | undefined> {
  return allBlogs.find((blog) => blog.slug === slug);
}

// Explicit PageProps type interface
interface PageProps {
  params: {
    blogSlug: string;
  };
  searchParams?: { [key:string]: string | string[] | undefined };
}

export default async function BlogPage({ params }: PageProps): Promise<JSX.Element> {
  const { blogSlug } = params;

  const blog = await getBlogBySlug(blogSlug);
  if (!blog) {
    notFound();
  }

  const relatedBlogs = allBlogs.filter(b => b.id !== blog.id);

  return (
    <div className="py-8">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <BlogPageClient
            blog={blog}
            params={{ blogSlug }}
          />
        </div>
        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
          <Suspense fallback={<Skeleton className="h-40 w-full rounded-lg" />}>
            <RelatedBlogs
              currentBlogId={blog.id}
              allBlogs={relatedBlogs}
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
  const { blogSlug } = params;

  const blog = await getBlogBySlug(blogSlug);
  if (!blog) {
    return { title: 'Blog Post Not Found' };
  }

  const previousImages = (await parent).openGraph?.images || [];


  return {
    title: blog.title, // Title will be composed with template from layout
    description: blog.excerpt || blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      type: 'article',
      publishedTime: new Date(blog.createdAt).toISOString(),
      authors: [blog.author],
      images: previousImages,
    },
  };
}

