// src/components/home/CourseCard.tsx
import Link from 'next/link';
import Image from 'next/image';
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
      <CardHeader className="p-0 relative">
        <Image
          src={course.image}
          alt={course.title}
          width={600}
          height={300}
          className="object-cover w-full h-48"
          data-ai-hint={course.data_ai_hint as string}
        />
        {IconComponent && (
          <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground p-2 rounded-full shadow-md">
            <IconComponent className="h-6 w-6" />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <Badge variant="secondary" className="mb-2">{course.category}</Badge>
        <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary-dark transition-colors">
          {course.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        <Button asChild variant="default" className="w-full group">
          <Link href={`/courses/${course.slug}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}