import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { Star, Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-2 leading-tight">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{course.description}</p>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="font-semibold">{course.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
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
