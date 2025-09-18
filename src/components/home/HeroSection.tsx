
// src/components/home/HeroSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Unlock Your <span className="text-primary">Tech Potential</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
          Propel your career forward with cutting-edge online courses in Web Development, AI, Data Science, and Cloud Computing. Learn at your own pace with expert-led content and a vibrant, supportive community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    </section>
  );
}
