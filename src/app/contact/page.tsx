// src/app/contact/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Knowledge Craft',
  description: 'Get in touch with the Knowledge Craft team.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <Label htmlFor="contact-name" className="text-foreground">Your Name</Label>
              <Input type="text" id="contact-name" name="name" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contact-email" className="text-foreground">Your Email</Label>
              <Input type="email" id="contact-email" name="email" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contact-subject" className="text-foreground">Subject</Label>
              <Input type="text" id="contact-subject" name="subject" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contact-message" className="text-foreground">Your Message</Label>
              <Textarea id="contact-message" name="message" rows={5} required className="mt-1" />
            </div>
            <Button type="submit">Submit Message</Button>
          </form>
        </div>
        <div className="bg-muted p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Our Contact Information</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-primary" />
              <span>123 Knowledge Drive, Tech City, TX 75001</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-primary" />
              <span>contact@knowledgecraft.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          <div className="mt-6 prose dark:prose-invert">
            <p>We aim to respond to all inquiries within 24-48 business hours.</p>
            <p>For support requests, please visit our <a href="/support" className="text-accent hover:underline">Support Page</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
