
// src/app/courses/[courseSlug]/blog/[blogSlug]/page.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { courses as allCourses } from '@/data/courses';
import { blogs as allBlogs } from '@/data/blogs';
import type { Course, Blog as BlogType } from '@/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RelatedBlogs } from '@/components/blog/RelatedBlogs';
import { format } from 'date-fns';
import { CalendarDays, User, Tag, MessageSquare, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createBlogComment } from '@/app/actions/blog';

interface BlogPageParams {
  params: {
    courseSlug: string;
    blogSlug: string;
  };
}

// Mock function to get course by slug
async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  return allCourses.find(course => course.slug === slug);
}

// Mock function to get blog by slug and course ID
async function getBlogBySlug(slug: string, courseId: string): Promise<BlogType | undefined> {
  return allBlogs.find(blog => blog.slug === slug && blog.courseId === courseId);
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

export default function BlogPage({ params }: { params: BlogPageParams['params'] }) {
  const [course, setCourse] = useState<Course | null | undefined>(undefined);
  const [blog, setBlog] = useState<BlogType | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);
  const [commentState, commentFormAction] = useActionState(createBlogComment, null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetchedCourse = await getCourseBySlug(params.courseSlug);
      if (fetchedCourse) {
        const fetchedBlog = await getBlogBySlug(params.blogSlug, fetchedCourse.id);
        setBlog(fetchedBlog);
      }
      setCourse(fetchedCourse);
      setLoading(false);
    }
    fetchData();
  }, [params.courseSlug, params.blogSlug]);
  
  useEffect(() => {
    if (commentState?.message) {
      toast({ title: "Success", description: commentState.message });
      formRef.current?.reset();
    }
    if (commentState?.error && !commentState?.fieldErrors) {
      toast({ title: "Error", description: commentState.error, variant: "destructive" });
    }
  }, [commentState, toast]);


  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-muted rounded-xl"></div>
          <div className="h-10 w-3/4 bg-muted rounded"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-5/6 bg-muted rounded"></div>
            <div className="h-4 w-full bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!course || !blog) {
    notFound();
  }

  const courseBlogsForSuggestions = allBlogs.filter(b => b.courseId === course.id);

  const renderMarkdown = (markdown: string) => {
    let html = markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold my-3 text-foreground">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold my-4 text-primary">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold my-5 text-primary">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```javascript\n([\s\S]*?)\n```/gim, '<pre class="bg-muted p-4 rounded-md overflow-x-auto text-sm my-4"><code class="language-javascript">$1</code></pre>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-muted p-4 rounded-md overflow-x-auto text-sm my-4"><code>$1</code></pre>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br />');
    return { __html: html };
  };


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-accent prose-img:rounded-lg prose-img:shadow-md">
          {blog.image && (
            <div className="relative w-full h-64 md:h-[450px] rounded-xl overflow-hidden shadow-xl mb-8">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                data-ai-hint={(blog as any).data_ai_hint || "blog post image"}
              />
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6 border-y py-3">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={blog.authorImage} alt={blog.author} />
                <AvatarFallback>{blog.author.substring(0,1)}</AvatarFallback>
              </Avatar>
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

          <section className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center">
              <MessageSquare className="mr-2 h-6 w-6" /> Comments
            </h2>
            <Card className="bg-muted/30">
              <CardContent className="p-6">
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
                <p className="text-xs text-muted-foreground mt-2">Please be respectful and constructive.</p>
                {/* Comment display area would go here in a future update */}
              </CardContent>
            </Card>
          </section>
        </article>

        <aside className="lg:col-span-4 space-y-8 sticky top-24 self-start">
          <RelatedBlogs 
            currentBlogContent={blog.content} 
            currentBlogId={blog.id}
            courseSlug={params.courseSlug}
            allBlogsForCourse={courseBlogsForSuggestions}
          />
          <Card>
            <CardHeader><CardTitle className="text-lg text-primary">About The Author</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={blog.authorImage} alt={blog.author} />
                <AvatarFallback className="text-2xl">{blog.author.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-foreground">{blog.author}</h4>
                <p className="text-xs text-muted-foreground">Tech Enthusiast & Writer @ Knowledge Craft</p>
                <Button variant="link" size="sm" className="p-0 h-auto text-accent mt-1">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

// generateStaticParams function has been removed.

export async function generateMetadata({ params }: { params: BlogPageParams['params']}) {
  const course = await getCourseBySlug(params.courseSlug);
  if (!course) return { title: "Blog Post Not Found" };
  const blog = await getBlogBySlug(params.blogSlug, course.id);
  if (!blog) return { title: "Blog Post Not Found" };

  return {
    title: `${blog.title} | Knowledge Craft`,
    description: blog.excerpt || blog.content.substring(0, 160),
  };
}
