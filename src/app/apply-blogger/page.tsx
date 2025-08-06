// src/app/apply-blogger/page.tsx
"use client";

import { ApplyBloggerForm } from '@/components/blogger/ApplyBloggerForm';
import type { Metadata } from 'next';

// Note: Metadata is still used for static generation, even in a client component.
export const metadata: Metadata = {
  title: 'Apply to be a Blogger | Knowledge Craft',
  description: 'Share your tech expertise with a wide audience. Apply to become a content creator and blogger on the Knowledge Craft platform.',
};

export default function ApplyBloggerPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <ApplyBloggerForm />
    </div>
  );
}
