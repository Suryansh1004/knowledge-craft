// components/home/CourseCard.tsx
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types";
import { Star, Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => (
  <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 border border-transparent">
    <CardContent className="flex-grow p-6">
      <h3 className="text-xl font-bold mb-2">
        <Link href={`/courses/${course.slug}`}>{course.title}</Link>
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between items-center p-6 border-t">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold">{course.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{course.duration}</span>
        </div>
      </div>
      <Button asChild variant="ghost" size="sm">
        <Link href={`/courses/${course.slug}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default CourseCard;
