
// src/app/admin/create-video/page.tsx
import type { Metadata } from 'next';
import { CreateVideoForm } from '@/components/admin/CreateVideoForm';

export const metadata: Metadata = {
  title: 'Create AI Video | Admin Panel | Knowledge Craft',
  description: 'Manually trigger the AI-powered creation of a new short-form video for social media and the Knowledge Craft platform.',
};

export default function CreateVideoAdminPage() {
  return (
    <div className="py-12 px-4 md:px-6">
      <CreateVideoForm />
    </div>
  );
}
