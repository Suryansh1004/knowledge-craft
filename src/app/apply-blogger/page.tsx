// src/app/apply-blogger/page.tsx
import type { Metadata } from 'next';
import { ApplyBloggerClientPage } from '@/components/blogger/ApplyBloggerClientPage';

// This remains a Server Component to handle metadata
export const metadata: Metadata = {
  title: 'Apply to be a Blogger | Knowledge Craft',
  description: 'Share your tech expertise with a wide audience. Apply to become a content creator and blogger on the Knowledge Craft platform.',
};

export default function ApplyBloggerPage() {
  return <ApplyBloggerClientPage />;
}
