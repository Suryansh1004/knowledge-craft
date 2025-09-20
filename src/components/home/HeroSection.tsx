import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

const HeroSection = () => {
  const heroImage = placeholderImages.find(p => p.slug === "hero-background");

  return (
    <section className="relative bg-background h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt="Abstract background"
          fill
          priority
          className="object-cover z-0 opacity-20"
          data-ai-hint={heroImage.data_ai_hint}
        />
      )}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-foreground mb-4 drop-shadow-lg">
          Unlock Your Potential
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 drop-shadow-md">
          Welcome to Knowledge Craft, where learning knows no bounds. Discover
          courses designed to help you master new skills and achieve your goals.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
