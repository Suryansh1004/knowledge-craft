// src/components/forum/CreatePostForm.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { createForumPost } from "@/app/actions/forum";

interface CreatePostFormProps {
  topicId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Post Reply
    </Button>
  );
}

export function CreatePostForm({ topicId }: CreatePostFormProps) {
  const [state, formAction] = useActionState(createForumPost, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (state?.message) {
      toast({ title: "Success", description: state.message });
      formRef.current?.reset(); // Reset form on success
    }
    if (state?.error) {
      toast({ title: "Error", description: state.error, variant: "destructive" });
    }
  }, [state, toast]);

  return (
    <Card className="mt-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Write a Reply</CardTitle>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent>
          <input type="hidden" name="topicId" value={topicId} />
          <div className="space-y-2">
            <Label htmlFor="content" className="sr-only">Your Reply</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Share your thoughts..."
              rows={5}
              className="bg-background"
              required
            />
            {state?.fieldErrors?.content && (
              <p className="text-xs text-destructive">{state.fieldErrors.content.join(", ")}</p>
            )}
          </div>
          {state?.error && !state?.fieldErrors && <p className="text-sm text-destructive mt-2">{state.error}</p>}
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
