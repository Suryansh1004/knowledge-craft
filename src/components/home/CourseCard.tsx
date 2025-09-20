import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { Star, Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-transparent hover:border-primary/50">
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 leading-tight">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </CardContent>
      <CardFooter className="p-6 border-t flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1.5" />
                <span className="font-semibold">{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>{course.duration}</span>
            </div>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/courses/${course.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
