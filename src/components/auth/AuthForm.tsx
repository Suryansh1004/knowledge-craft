// src/components/auth/AuthForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChromeIcon } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Link from "next/link";

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

export function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction] = useActionState(action, null); // Updated to useActionState from React
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ title: "Success", description: state.message });
      router.push(state.redirectTo || "/"); // Redirect to home or specified page
    }
    if (state?.error && !state?.fieldErrors) {
      toast({ title: "Error", description: state.error, variant: "destructive" });
    }
  }, [state, router, toast]);
  
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in Firestore, if not, create them
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL,
          roles: ['user'], // Default role for Google sign-in
          createdAt: new Date().toISOString(), // Add a creation timestamp
        });
      }
      toast({ title: "Success", description: "Logged in with Google successfully!" });
      router.push("/");
    } catch (error: any) {
      console.error("Google Sign-In Error: ", error);
      toast({ title: "Error", description: error.message || "Google Sign-In failed.", variant: "destructive" });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{mode === "login" ? "Welcome Back!" : "Create an Account"}</CardTitle>
        <CardDescription>
          {mode === "login" ? "Enter your credentials to access your account." : "Fill in the details below to get started."}
        </CardDescription>
      </CardHeader>
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
            <ChromeIcon className="mr-2 h-4 w-4" /> {/* Using ChromeIcon as a stand-in for Google icon */}
            Google
          </Button>
           <div className="mt-2 text-center text-sm">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline text-primary hover:text-primary/80">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" className="underline text-primary hover:text-primary/80">
                  Log in
                </Link>
              </>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
