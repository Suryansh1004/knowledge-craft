// src/components/blogger/ApplyBloggerForm.tsx
"use client";
import { useAuth } from "@/hooks/useAuth";

import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, FileText } from "lucide-react";
import { submitBloggerApplication } from "@/app/actions/bloggerApplication";
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Submit Application
    </Button>
  );
}

export function ApplyBloggerForm() {
  const { user } = useAuth(); // Get current user
  const [state, formAction] = useFormState(submitBloggerApplication, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({ title: "Success", description: state.message, duration: 10000 }); // Longer duration for the info message
      formRef.current?.reset();
    }
    if (state?.error && !state?.fieldErrors) {
      toast({ title: "Error", description: state.error, variant: "destructive" });
    }
  }, [state, toast]);

  if (!user) {
      return (
          <Card className="w-full max-w-lg mx-auto shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                    <FileText className="mr-3 h-7 w-7" /> Apply to be a Blogger
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">Please <Link href="/login" className="underline text-primary">log in</Link> to apply to become a blogger.</p>
              </CardContent>
          </Card>
      )
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center">
          <FileText className="mr-3 h-7 w-7" /> Apply to be a Blogger
        </CardTitle>
        <CardDescription>
          Want to share your knowledge? Fill out the form below to apply.
          Your application will be reviewed by our admin.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={user?.displayName || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={user?.email || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinProfile">LinkedIn Profile URL</Label>
            <Input id="linkedinProfile" name="linkedinProfile" type="url" placeholder="https://www.linkedin.com/in/yourprofile/" required />
            {state?.fieldErrors?.linkedinProfile && <p className="text-xs text-destructive">{state.fieldErrors.linkedinProfile.join(", ")}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Why do you want to be a blogger on Knowledge Craft? (Briefly describe your expertise and topics you'd like to write about)</Label>
            <Textarea id="reason" name="reason" placeholder="Share your passion and expertise..." rows={5} required />
            {state?.fieldErrors?.reason && <p className="text-xs text-destructive">{state.fieldErrors.reason.join(", ")}</p>}
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
