// src/app/login/page.tsx
"use client";
import { AuthForm } from "@/components/auth/AuthForm";
import { loginWithEmail } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";
import Link from "next/link";


export default function LoginPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Logo className="text-3xl justify-center"/>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to access your courses and profile.
          </p>
        </div>
        <AuthForm mode="login" action={loginWithEmail} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}