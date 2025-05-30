// src/app/faq/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Knowledge Craft',
  description: 'Frequently Asked Questions about Knowledge Craft.',
};

export default function FaqPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>This is the FAQ page. Content will be added here soon.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-3">How do I enroll in a course?</h2>
        <p>You can enroll in courses directly from the course page by clicking the "Enroll Now" button.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Are the courses self-paced?</h2>
        <p>Yes, all our courses are designed to be self-paced, allowing you to learn at your convenience.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Do you offer refunds?</h2>
        <p>We offer a 30-day money-back guarantee on all our courses.</p>
      </div>
    </div>
  );
}
