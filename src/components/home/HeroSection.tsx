
// src/components/home/HeroSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Unlock Your <span className="text-primary">Tech Potential</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Propel your career forward with cutting-edge articles and tutorials on Web Development, AI, Data Science, and Cloud Computing. Learn at your own pace with expert-led content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/20 transition-shadow">
              <Link href="/blog">
                Explore The Blog <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
