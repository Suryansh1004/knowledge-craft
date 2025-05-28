// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Github, Linkedin, Twitter, BookOpenCheck } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering learners with cutting-edge tech skills. Learn at your own pace, anytime, anywhere.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-2 md:grid-cols-3">
            <div>
              <h4 className="text-md font-semibold mb-3 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">All Courses</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/forum" className="text-muted-foreground hover:text-primary transition-colors">Community Forum</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-3 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-3 text-foreground">Connect</h4>
              <div className="flex space-x-3">
                <Link href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} LearnHub. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed by an expert.
          </p>
        </div>
      </div>
    </footer>
  );
}