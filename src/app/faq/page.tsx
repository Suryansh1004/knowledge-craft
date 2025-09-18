
// src/app/faq/page.tsx
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Knowledge Craft',
  description: 'Find answers to common questions about Knowledge Craft courses, enrollment, payments, and platform features.',
};

export default function FaqPage() {
  return (
    <div className="py-12 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">Have questions? We have answers. If you can't find what you're looking for, feel free to <a href="/contact" className="text-accent hover:underline">contact us</a>.</p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">How do I enroll in a course?</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            Enrolling is simple! Just navigate to the course you're interested in and click the "Enroll Now" button. You'll be prompted to create an account or log in to complete the process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">Are the courses self-paced?</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            Yes, absolutely! All our courses are designed to be self-paced, allowing you to learn at your convenience. You can access course materials 24/7 from any device.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-semibold">What payment methods do you accept?</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            We accept all major credit cards (Visa, MasterCard, American Express) as well as payments through PayPal. All transactions are securely processed.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-semibold">Do you offer refunds?</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            Yes, we offer a 30-day money-back guarantee on all our courses. If you're not satisfied for any reason, just contact our support team within 30 days of purchase for a full refund.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-semibold">Do I get a certificate upon completion?</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            Yes, upon successful completion of any course, you will receive a verifiable certificate from Knowledge Craft that you can share on your LinkedIn profile and resume.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg font-semibold">Is there any support available if I get stuck?</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            Definitely. Each course has a dedicated community forum where you can ask questions and interact with instructors and fellow students. Our AI-powered chatbot is also available 24/7 for quick assistance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
