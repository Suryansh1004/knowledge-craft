// components/home/HeroSection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

const HeroSection = () => {
  const heroImage = placeholderImages.find(p => p.slug === 'hero-background');
  
  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center px-4">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt="Abstract background image representing knowledge and learning"
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.data_ai_hint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg mb-4">
          Unlock Your Potential
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md max-w-3xl mx-auto">
          Welcome to Knowledge Craft, where learning knows no bounds. Discover courses designed to help you master new skills and achieve your goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
