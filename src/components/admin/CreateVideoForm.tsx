// src/components/admin/CreateVideoForm.tsx
"use client";
import { useAuth } from "@/contexts/AuthContext";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { createVideoAction } from "@/app/actions/video";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Generate Video
    </Button>
  );
}

export function CreateVideoForm() {
  const [state, formAction] = useFormState(createVideoAction, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({ title: "Success", description: state.message });
      formRef.current?.reset();
    }
    if (state?.error) {
      toast({ title: "Error", description: state.error, variant: "destructive" });
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Create a New Video</CardTitle>
        <CardDescription>
          Enter a prompt, and the AI will generate video content, a placeholder video, and upload it.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Video Prompt</Label>
            <Textarea
              id="prompt"
              name="prompt"
              placeholder="e.g., 'A 25-second video explaining how quantum computing works...'"
              rows={4}
              required
            />
            {state?.fieldErrors?.prompt && <p className="text-xs text-destructive">{state.fieldErrors.prompt.join(", ")}</p>}
          </div>
           {state?.error && !state?.fieldErrors && <p className="text-sm font-medium text-destructive">{state.error}</p>}
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
