// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-10 row-gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering the next generation of tech talent with expert-led courses and a supportive community.
            </p>
            <div className="flex space-x-4">
                <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
           <div className="space-y-4">
            <h4 className="text-md font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
               <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Knowledge Craft. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Designed by an expert.
          </p>
        </div>
      </div>
    </footer>
  );
}