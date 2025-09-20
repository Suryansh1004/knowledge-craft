// src/components/layout/Header.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const pathname = usePathname();
  
  const NavLinkItem = ({ href, label }: { href: string, label: string }) => (
    <Link href={href} passHref>
       <Button
        variant="ghost"
        className={cn(
          "text-foreground/80 hover:text-primary hover:bg-primary/10 text-base font-medium",
          pathname === href && "text-primary font-semibold"
        )}
      >
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Auth buttons removed */}
        </div>
      </div>
    </header>
  );
}
