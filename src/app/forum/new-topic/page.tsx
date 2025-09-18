
// src/app/forum/new-topic/page.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, PlusCircle } from "lucide-react";
import { createForumTopic } from "@/app/actions/forum";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Create Topic
    </Button>
  );
}

export default function NewTopicPage() {
  const { user, loading } = useAuth();
  const [state, formAction] = useFormState(createForumTopic, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.message) {
      toast({ title: "Success", description: state.message });
      formRef.current?.reset();
      if (state.topicSlug) {
        router.push(`/forum/${state.topicSlug}`);
      } else {
        router.push('/forum');
      }
    }
    if (state?.error) {
      toast({ title: "Error", description: state.error, variant: "destructive" });
    }
  }, [state, toast, router]);

  if (loading) {
    return (
       <div className="py-12">
        <Card className="w-full max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-end">
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    )
  }


  if (!user) {
    return (
      <div className="py-12">
        <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <PlusCircle className="mr-3 h-7 w-7" /> Create a New Topic
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Please <Link href="/login" className="underline text-primary">log in</Link> to create a new topic.</p>
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-12">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            <PlusCircle className="mr-3 h-7 w-7" /> Create a New Topic
          </CardTitle>
          <CardDescription>Start a new discussion by providing a title, description, and your initial post.</CardDescription>
        </CardHeader>
        <form action={formAction} ref={formRef}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Topic Title</Label>
              <Input id="title" name="title" placeholder="What is your topic about?" required />
              {state?.fieldErrors?.title && <p className="text-xs text-destructive">{state.fieldErrors.title.join(", ")}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Input id="description" name="description" placeholder="A brief summary of the topic." required />
              {state?.fieldErrors?.description && <p className="text-xs text-destructive">{state.fieldErrors.description.join(", ")}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="firstPostContent">Your First Post</Label>
              <Textarea id="firstPostContent" name="firstPostContent" placeholder="Start the conversation here..." rows={8} required />
              {state?.fieldErrors?.firstPostContent && <p className="text-xs text-destructive">{state.fieldErrors.firstPostContent.join(", ")}</p>}
            </div>

            {state?.error && !state?.fieldErrors && <p className="text-sm font-medium text-destructive">{state.error}</p>}
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-end">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
