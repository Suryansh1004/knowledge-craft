
// src/app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Welcome to <span className="text-primary">Knowledge Craft</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our articles and tutorials on the latest in tech.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
