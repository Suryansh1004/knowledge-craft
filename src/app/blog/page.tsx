
// src/app/blog/page.tsx
import { blogs as allBlogs } from '@/data/blogs';
import { BlogListItem } from '@/components/blog/BlogListItem';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Blog | Articles & Tutorials | Knowledge Craft',
  description: 'Explore expert articles, tutorials, and insights on web development, AI, data science, and cloud technology on the Knowledge Craft blog.',
};

export default function AllBlogsPage() {

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-primary mb-2">Knowledge Craft Tech Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Dive into the Knowledge Craft blog for expert articles, tutorials, and the latest news on web development, AI, data science, and cloud technology. Stay ahead of the curve.
          </p>
        </div>
      </div>

      {allBlogs.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map((blog) => {
            return (
              <BlogListItem key={blog.id} blog={blog} />
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
