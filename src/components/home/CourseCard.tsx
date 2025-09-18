// src/components/home/CourseCard.tsx
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const IconComponent = course.icon;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{course.category}</Badge>
          {IconComponent && (
            <div className="text-primary/80">
              <IconComponent className="h-7 w-7" />
            </div>
          )}
        </div>
        <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary-dark transition-colors">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-4">{course.description}</p>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30 mt-auto">
        <Button asChild variant="default" className="w-full group">
          <Link href={`/courses/${course.slug}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
