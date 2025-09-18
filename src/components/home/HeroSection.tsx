// src/components/home/HeroSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/app/lib/placeholder-images.json';

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Unlock Your <span className="text-primary">Tech Potential</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
              Propel your career forward with cutting-edge online courses in Web Development, AI, Data Science, and Cloud Computing. Learn at your own pace with expert-led content and a vibrant, supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/30 transition-shadow">
                <Link href="/courses">
                  Explore Courses <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-shadow">
                <Link href="/signup">
                  Get Started Free
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src={placeholderImages['hero-section']}
              alt="Knowledge Craft Illustration"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="learning technology"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
