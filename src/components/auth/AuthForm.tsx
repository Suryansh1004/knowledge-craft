// src/components/auth/AuthForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthFormProps {
  mode: "login" | "signup";
  action: (prevState: any, formData: FormData) => Promise<{ message?: string; error?: string; fieldErrors?: any; redirectTo?: string }>;
}

function SubmitButton({ mode }: { mode: "login" | "signup" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {mode === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.62-3.87 1.62-3.03 0-5.49-2.3-5.49-5.09s2.46-5.09 5.49-5.09c1.38 0 2.52.45 3.41 1.31l2.22-2.19C18.23 3.41 15.86 2.5 13.05 2.5c-4.46 0-8.15 3.53-8.15 7.91s3.69 7.91 8.15 7.91c2.31 0 3.95-.74 5.25-2.03 1.34-1.34 1.9-3.18 1.9-5.18 0-.58-.05-1.12-.14-1.62H12.48z"
      ></path>
    </svg>
  );
}

export function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction] = useFormState(action, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.message) {
      router.push(state.redirectTo || "/"); // Redirect to home or specified page
    }
    if (state?.error && !state?.fieldErrors) {
      console.error("Error:", state.error);
    }
  }, [state, router]);
  
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }
      console.log("Logged in with Google successfully!");
      router.push("/");
    } catch (error: any) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-none border-0">
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            {state?.fieldErrors?.email && <p className="text-xs text-destructive">{state.fieldErrors.email.join(", ")}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {state?.fieldErrors?.password && <p className="text-xs text-destructive">{state.fieldErrors.password.join(", ")}</p>}
          </div>
          {state?.error && !state?.fieldErrors && <p className="text-sm text-destructive">{state.error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton mode={mode} />
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn}>
            <GoogleIcon className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}