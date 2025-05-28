
// src/components/blog/CreateBlogForm.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, BookPlus } from "lucide-react";
import { createBlogPost } from "@/app/actions/blog";
import { courses as allCourses } from "@/data/courses"; // For course selection
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Create Post
    </Button>
  );
}

export function CreateBlogForm() {
  const [state, formAction] = useActionState(createBlogPost, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.message) {
      toast({ title: "Success", description: state.message });
      formRef.current?.reset();
      // Optionally redirect after successful creation
      // router.push('/blog'); 
    }
    if (state?.error && !state?.fieldErrors) { // General error
      toast({ title: "Error", description: state.error, variant: "destructive" });
    }
  }, [state, toast, router]);

  // Function to generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-'); // Replace multiple - with single -
  };
  
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    const slugInput = formRef.current?.elements.namedItem('slug') as HTMLInputElement | null;
    if (slugInput) {
      slugInput.value = generateSlug(title);
    }
  };


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center">
          <BookPlus className="mr-3 h-7 w-7" /> Create New Blog Post
        </CardTitle>
        <CardDescription>Fill in the details below to publish a new article.</CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Your Awesome Blog Post Title" required onChange={handleTitleChange} />
            {state?.fieldErrors?.title && <p className="text-xs text-destructive">{state.fieldErrors.title.join(", ")}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL-friendly identifier)</Label>
            <Input id="slug" name="slug" placeholder="your-awesome-blog-post-title" required />
            {state?.fieldErrors?.slug && <p className="text-xs text-destructive">{state.fieldErrors.slug.join(", ")}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">Course Category</Label>
            <Select name="courseId" required>
              <SelectTrigger id="courseId">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {allCourses.map(course => (
                  <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state?.fieldErrors?.courseId && <p className="text-xs text-destructive">{state.fieldErrors.courseId.join(", ")}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown supported)</Label>
            <Textarea id="content" name="content" placeholder="Write your blog post here. Use Markdown for formatting..." rows={15} required className="bg-muted/20" />
            {state?.fieldErrors?.content && <p className="text-xs text-destructive">{state.fieldErrors.content.join(", ")}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt (Short summary)</Label>
            <Textarea id="excerpt" name="excerpt" placeholder="A brief summary of your post (optional, max 300 chars)" rows={3} />
            {state?.fieldErrors?.excerpt && <p className="text-xs text-destructive">{state.fieldErrors.excerpt.join(", ")}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" name="tags" placeholder="e.g., React, JavaScript, Web Development" />
            {state?.fieldErrors?.tags && <p className="text-xs text-destructive">{state.fieldErrors.tags.join(", ")}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="image">Main Image URL (Optional)</Label>
              <Input id="image" name="image" type="url" placeholder="https://example.com/image.jpg" />
              {state?.fieldErrors?.image && <p className="text-xs text-destructive">{state.fieldErrors.image.join(", ")}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorImage">Author Image URL (Optional)</Label>
              <Input id="authorImage" name="authorImage" type="url" placeholder="https://example.com/author.jpg" />
              {state?.fieldErrors?.authorImage && <p className="text-xs text-destructive">{state.fieldErrors.authorImage.join(", ")}</p>}
            </div>
          </div>
          
          {state?.error && !state?.fieldErrors && <p className="text-sm font-medium text-destructive">{state.error}</p>}
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
