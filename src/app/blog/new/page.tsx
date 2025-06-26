
// src/app/blog/new/page.tsx
import { CreateBlogForm } from '@/components/blog/CreateBlogForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Blog Post | Knowledge Craft',
  description: 'For authorized bloggers. Share your knowledge by creating a new technical article or tutorial for the Knowledge Craft blog.',
};

export default function NewBlogPostPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* 
        In a real app, you would add authentication checks here 
        to ensure only authorized users can access this page.
        For example, using a higher-order component or a server-side check.
      */}
      <CreateBlogForm />
    </div>
  );
}
