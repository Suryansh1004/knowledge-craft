
// src/components/blog/BlogListItem.tsx
"use client";

import Link from 'next/link';
import type { Blog } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarDays, User } from 'lucide-react';
import { format } from 'date-fns';

interface BlogListItemProps {
  blog: Blog;
}

export function BlogListItem({ blog }: BlogListItemProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            {format(new Date(blog.createdAt), 'MMM d, yyyy')}
          </div>
          <div className="flex items-center">
            <User className="h-3.5 w-3.5 mr-1" />
            {blog.author}
          </div>
        </div>
        <Link href={`/blog/${blog.slug}`}>
          <CardTitle className="text-xl font-semibold text-primary hover:underline line-clamp-2">
            {blog.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-muted-foreground line-clamp-4">
          {blog.excerpt || blog.content.substring(0, 200) + '...'}
        </CardDescription>
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${blog.slug}`} className="text-sm font-medium text-accent hover:text-accent/80 flex items-center group">
          Read More <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
}
