// src/components/auth/ProfileForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ title: "Success", description: state.message });
    }
    if (state?.error) {
      toast({ title: "Error", description: state.error, variant: "destructive" });
    }
  }, [state, toast]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization (Optional)</Label>
              <Input id="organization" name="organization" defaultValue={user.organization || ""} />
              {state?.fieldErrors?.organization && <p className="text-xs text-destructive">{state.fieldErrors.organization.join(", ")}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearOfPassout">Year of Passout (Optional)</Label>
              <Input id="yearOfPassout" name="yearOfPassout" type="number" defaultValue={user.yearOfPassout || ""} />
              {state?.fieldErrors?.yearOfPassout && <p className="text-xs text-destructive">{state.fieldErrors.yearOfPassout.join(", ")}</p>}
            </div>
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
