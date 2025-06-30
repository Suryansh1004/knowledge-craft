// src/app/login/page.tsx
import { AuthForm } from "@/components/auth/AuthForm";
"use client";
import { loginWithEmail } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";
"use client";
import { useAuth } from "@/contexts/AuthContext";


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
