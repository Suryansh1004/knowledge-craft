// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
          <div>
            <h4 className="text-md font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">All Courses</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/forum" className="text-muted-foreground hover:text-primary transition-colors">Community Forum</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-md font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Knowledge Craft. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed by an expert.
          </p>
        </div>
      </div>
    </footer>
  );
}
