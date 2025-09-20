import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center py-20 md:py-32 lg:py-40">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground mb-4">
          Unlock Your Potential
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
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
