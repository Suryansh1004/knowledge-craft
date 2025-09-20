import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center text-center px-4">
      <div className="container relative z-10 mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-4">
          Unlock Your Potential
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
          Welcome to Knowledge Craft, where learning knows no bounds. Discover
          courses designed to help you master new skills and achieve your goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Optional decorative overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
