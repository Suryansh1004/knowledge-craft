// src/app/signup/page.tsx
"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { signupWithEmail } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Logo className="text-3xl justify-center"/>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            Create an Account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your details below to get started.
          </p>
        </div>
        <AuthForm mode="signup" action={signupWithEmail} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
}