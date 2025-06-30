// src/app/signup/page.tsx

import { AuthForm } from "@/components/auth/AuthForm";
import { signupWithEmail } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
       <div className="mb-8">
        <Logo className="text-3xl"/>
      </div>
      <AuthForm mode="signup" action={signupWithEmail} />
    </div>
  );
}
