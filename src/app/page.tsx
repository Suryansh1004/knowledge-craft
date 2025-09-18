import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
              Unlock Your Tech Potential
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Propel your career forward with cutting-edge online courses. Learn at your own pace with expert-led content.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
