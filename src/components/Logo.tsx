
// src/components/Logo.tsx
import Link from 'next/link';
import { BookOpenCheck } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-2xl font-bold text-primary ${className}`}>
      <BookOpenCheck className="h-8 w-8" />
      <span>Knowledge Craft</span>
    </Link>
  );
}
