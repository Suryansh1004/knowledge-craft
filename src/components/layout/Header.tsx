
// src/components/layout/Header.tsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, UserCircle, Menu, Edit, Video } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { useState } from 'react';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/blog', label: 'Blog' },
  { href: '/forum', label: 'Forum' },
];

export function Header() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const NavLinkItem = ({ href, label, className }: { href: string, label: string, className?: string }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "text-foreground/80 hover:text-primary hover:bg-primary/10 text-base font-medium",
          pathname === href && "text-primary font-semibold border-b-2 border-primary rounded-none",
          className
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        {label}
      </Button>
    </Link>
  );

  const isBlogger = user?.roles?.includes('blogger');
  const isAdmin = user?.roles?.includes('admin'); 

  const userMenu = !loading && user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary">
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
      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Center Section: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <NavLinkItem href="/" label="Home" />
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Right Section: User Menu / Auth Buttons */}
        <div className="hidden md:flex items-center justify-end">
          {userMenu}
        </div>
        
        {/* Mobile Menu Trigger & Content */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="p-4 border-b">
                <Logo />
              </div>
              <nav className="flex flex-col space-y-2 p-4">
                <NavLinkItem href="/" label="Home" className="justify-start w-full" />
                {navLinks.map((link) => (
                  <NavLinkItem key={link.href} href={link.href} label={link.label} className="justify-start w-full" />
                ))}
                
                <div className="pt-4 border-t">
                  {isBlogger && (
                    <Button variant="outline" asChild className="w-full justify-start mt-2" onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/blog/new"><Edit className="mr-2 h-4 w-4" />Create New Post</Link>
                    </Button>
                  )}
                  {isAdmin && (
                    <Button variant="outline" asChild className="w-full justify-start mt-2" onClick={() => setMobileMenuOpen(false)}>
                       <Link href="/admin/create-video"><Video className="mr-2 h-4 w-4" />Create Video</Link>
                    </Button>
                  )}
                </div>
              </nav>

              <div className="absolute bottom-0 left-0 w-full p-4 border-t">
                {!loading && user ? (
                  <div className="flex items-center gap-3">
                     <Avatar className="h-10 w-10 border-2 border-primary">
                        <AvatarFallback>
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserCircle />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-auto">
                        <LogOut className="h-5 w-5 text-red-500" />
                      </Button>
                  </div>
                ) : !loading && (
                  <div className="flex gap-2">
                    <Button variant="outline" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
