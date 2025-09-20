// src/components/blog/BlogPageClient.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import type { Course, Blog as BlogType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarDays, User, Tag, MessageSquare, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { createBlogComment } from '@/app/actions/blog';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

// The Course type passed to this client component should not include the icon function
type SerializableCourse = Omit<Course, 'icon'>;

interface BlogPageClientProps {
  course: SerializableCourse;
  blog: BlogType;
  params: {
    courseSlug: string;
    blogSlug: string;
  };
}

function CommentSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Post Comment
    </Button>
  );
}

export function BlogPageClient({ course, blog, params }: BlogPageClientProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [commentState, commentFormAction] = useFormState(createBlogComment, null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (commentState?.message) {
      console.log("Success:", commentState.message);
      formRef.current?.reset();
    }
    if (commentState?.error && !commentState?.fieldErrors) {
      console.error("Error:", commentState.error);
    }
  }, [commentState]);

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
            <User className="h-4 w-4 mr-1.5" />
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

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" /> Comments
        </h2>
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            {user ? (
              <form action={commentFormAction} ref={formRef}>
                <input type="hidden" name="blogId" value={blog.id} />
                <Textarea 
                  name="content" 
                  placeholder="Write your comment here..." 
                  className="mb-3 bg-background" 
                  rows={4} 
                  required 
                />
                {commentState?.fieldErrors?.content && <p className="text-xs text-destructive mb-2">{commentState.fieldErrors.content.join(", ")}</p>}
                {commentState?.error && !commentState?.fieldErrors && <p className="text-sm text-destructive mb-2">{commentState.error}</p>}
                <CommentSubmitButton />
              </form>
            ) : (
              <CardDescription>
                <Link href="/login" className="text-primary underline">Log in</Link> to post a comment.
              </CardDescription>
            )}
            {/* Comment display area would go here in a future update */}
          </CardContent>
        </Card>
      </section>

      <div className="mt-8">
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
