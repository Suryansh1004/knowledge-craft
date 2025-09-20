// src/components/auth/ProfileForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile } from "@/types";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  user: UserProfile;
  action: (prevState: any, formData: FormData) => Promise<{ message?: string; error?: string; fieldErrors?: any }>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
}

export function ProfileForm({ user, action }: ProfileFormProps) {
  const [state, formAction] = useFormState(action, undefined);

  useEffect(() => {
    if (state?.message) {
      console.log("Success:", state.message);
      // Maybe show a success toast or message here
    }
    if (state?.error) {
      console.error("Error:", state.error);
      // Maybe show an error toast or message here
    }
  }, [state]);

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Update Your Profile</CardTitle>
        <CardDescription>Keep your information up to date.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" name="displayName" defaultValue={user.displayName || ""} />
            {state?.fieldErrors?.displayName && <p className="text-xs text-destructive">{state.fieldErrors.displayName.join(", ")}</p>}
          </div>
           {state?.error && !state?.fieldErrors && <p className="text-sm text-destructive mt-2">{state.error}</p>}
        </CardContent>
        <CardFooter className="border-t pt-6">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
