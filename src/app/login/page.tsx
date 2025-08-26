// src/app/login/page.tsx
"use client";
import { AuthForm } from "@/components/auth/AuthForm";
import { loginWithEmail } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4">
      <div className="mb-8">
        <Logo className="text-3xl"/>
      </div>
      <AuthForm mode="login" action={loginWithEmail} />
    </div>
  );
}
