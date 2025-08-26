// src/app/blog/new/page.tsx
import type { Metadata } from 'next';
import { NewBlogPostClientPage } from '@/components/blog/NewBlogPostClientPage';

// This remains a Server Component to handle metadata
export const metadata: Metadata = {
  title: 'Create New Blog Post | Knowledge Craft',
  description: 'For authorized bloggers. Share your knowledge by creating a new technical article or tutorial for the Knowledge Craft blog.',
};

export default function NewBlogPostPage() {
  return <NewBlogPostClientPage />;
}
