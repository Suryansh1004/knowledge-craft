
// src/components/blog/BlogPageClient.tsx
"use client";

import React from 'react';
import type { Blog as BlogType } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarDays, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogPageClientProps {
  blog: BlogType;
  params: {
    blogSlug: string;
  };
}

export function BlogPageClient({ blog }: BlogPageClientProps) {

  const renderMarkdown = (markdown: string) => {
    // Basic markdown to HTML conversion - consider a more robust library for complex needs
    let html = markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold my-3 text-foreground">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold my-4 text-primary">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold my-5 text-primary">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```javascript\n([\s\S]*?)\n```/gim, '<pre class="bg-muted p-4 rounded-md overflow-x-auto text-sm my-4"><code class="language-javascript">$1</code></pre>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-muted p-4 rounded-md overflow-x-auto text-sm my-4"><code>$1</code></pre>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "") // Remove image tags
      .replace(/<img (.*?)>/gim, "") // Remove html image tags
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br />');
    return { __html: html };
  };

  return (
    <>
      <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-accent">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">{blog.title}</h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6 border-y py-3">
          <div className="flex items-center">
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5" />
            <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1.5" />
              {blog.tags.map((tag, index) => (
                <span key={tag}>
                  <Badge variant="outline" className="text-xs">{tag}</Badge>
                  {index < blog.tags!.length - 1 && <span className="mx-1">,</span>}
                </span>
              ))}
            </div>
          )}
        </div>

        <div dangerouslySetInnerHTML={renderMarkdown(blog.content)} />
      </article>

      <div className="mt-12 border-t pt-8">
        <Card>
          <CardHeader><CardTitle className="text-lg text-primary">About The Author</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">{blog.author.substring(0,1)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{blog.author}</h4>
              <p className="text-xs text-muted-foreground">Tech Enthusiast & Writer @ Knowledge Craft</p>
              <Button variant="link" size="sm" className="p-0 h-auto text-accent mt-1">View Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
