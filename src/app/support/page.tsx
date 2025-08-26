// src/app/support/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const metadata: Metadata = {
  title: 'Support | Knowledge Craft',
  description: 'Get support for Knowledge Craft.',
};

export default function SupportPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Support Center</h1>
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p>If you need help, please fill out the form below, and our support team will get back to you as soon as possible. You can also check our <a href="/faq" className="text-accent hover:underline">FAQ page</a> for common questions.</p>
      </div>
      <form className="max-w-lg space-y-6">
        <div>
          <Label htmlFor="name" className="text-foreground">Your Name</Label>
          <Input type="text" id="name" name="name" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email" className="text-foreground">Your Email</Label>
          <Input type="email" id="email" name="email" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="subject" className="text-foreground">Subject</Label>
          <Input type="text" id="subject" name="subject" required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="message" className="text-foreground">Your Message</Label>
          <Textarea id="message" name="message" rows={5} required className="mt-1" />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
