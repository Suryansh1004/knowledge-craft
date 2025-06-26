// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenCheck, LogIn, LogOut, UserCircle, Menu, Search, FileText, Edit, Video } from 'lucide-react'; // Added Video
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ThemeToggleButton } from './ThemeToggleButton';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/blog', label: 'Blog' },
  { href: '/videos', label: 'Videos' }, // Added Videos link
  { href: '/coding-problems', label: 'Practice' },
  { href: '/forum', label: 'Forum' },
];

export function Header() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // User state will be updated by onAuthStateChanged in AuthContext
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const NavLinkItem = ({ href, label }: { href: string, label: string }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "text-foreground/80 hover:text-primary hover:bg-primary/10",
          pathname === href && "text-primary font-semibold border-b-2 border-primary rounded-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {label}
      </Button>
    </Link>
  );

  const isBlogger = user?.roles?.includes('blogger');
  // Simple check for admin role, in real app this would be more robust
  const isAdmin = user?.roles?.includes('admin'); 

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8 sm:w-[150px] md:w-[200px] lg:w-[250px] rounded-full" />
          </div>
          <ThemeToggleButton />
          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User'} />
                    <AvatarFallback>
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserCircle />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-medium">{user.displayName || 'User Profile'}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {isAdmin && (
                   <DropdownMenuItem asChild>
                    <Link href="/admin/create-video"><Video className="mr-2 h-4 w-4" />Create Video</Link>
                  </DropdownMenuItem>
                )}
                {isBlogger && (
                  <DropdownMenuItem asChild>
                    <Link href="/blog/new"><Edit className="mr-2 h-4 w-4" />Create New Post</Link>
                  </DropdownMenuItem>
                )}
                {!isBlogger && (
                  <DropdownMenuItem asChild>
                    <Link href="/apply-blogger"><FileText className="mr-2 h-4 w-4" />Apply for Blogger</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:!text-red-500 hover:!bg-red-500/10 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !loading ? (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            // Skeleton or loader for user avatar while loading
             <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          )}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <NavLinkItem key={link.href} href={link.href} label={link.label} />
                ))}
                 {isBlogger && (
                    <Button variant="outline" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/blog/new"><Edit className="mr-2 h-4 w-4" />Create New Post</Link>
                    </Button>
                  )}
                  {!isBlogger && user && ( // Show apply only if logged in and not a blogger
                     <Button variant="outline" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                       <Link href="/apply-blogger"><FileText className="mr-2 h-4 w-4" />Apply for Blogger</Link>
                     </Button>
                  )}
                <div className="relative mt-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="pl-8 w-full rounded-full" />
                </div>
                {!loading && !user && (
                  <>
                    <DropdownMenuSeparator />
                    <Button variant="outline" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
