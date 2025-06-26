// src/app/admin/create-video/page.tsx
import type { Metadata } from 'next';
import { CreateVideoForm } from '@/components/admin/CreateVideoForm';

export const metadata: Metadata = {
  title: 'Create Video | Admin Panel',
  description: 'Manually trigger the creation of a new video.',
};

export default function CreateVideoAdminPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <CreateVideoForm />
    </div>
  );
}
