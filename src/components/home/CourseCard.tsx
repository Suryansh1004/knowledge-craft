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
    <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg bg-card group border">
      <CardHeader className="p-6">
        <div className="flex items-start justify-between mb-4">
          {IconComponent && (
            <div className="p-3 rounded-lg bg-primary/10 text-primary border">
              <IconComponent className="h-7 w-7" />
            </div>
          )}
          <Badge variant="outline">{course.category}</Badge>
        </div>
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          <Link href={`/courses/${course.slug}`}>
            {course.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-4 bg-secondary/30 mt-auto">
        <Button asChild variant="link" className="p-0 text-primary group-hover:text-primary/80 font-semibold">
          <Link href={`/courses/${course.slug}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}