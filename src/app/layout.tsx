import type { Metadata } from 'next';
// Removed Geist font imports
import './globals.css';

import { AuthProvider } from "@/contexts/AuthContext";

import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from "next-themes";
import { FloatingChatbot } from '@/components/chatbot/FloatingChatbot';

// Removed Geist font instantiations

export const metadata: Metadata = {
  metadataBase: new URL('https://knowledgecraft.com'), // Replace with your production domain
  title: {
    default: 'Knowledge Craft | Online Tech Courses for Web Development, AI & Cloud',
    template: '%s | Knowledge Craft',
  },
  description: 'Master in-demand tech skills with Knowledge Craft. Explore expert-led online courses in Web Development, Data Science, AI, Cloud Computing, and more. Start your learning journey today!',
  openGraph: {
    title: 'Knowledge Craft | Online Tech Courses for Web Development, AI & Cloud',
    description: 'Expert-led online courses to help you master in-demand tech skills.',
    images: ['/og-image.png'], // Create a general /public/og-image.png (1200x630)
    siteName: 'Knowledge Craft',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Removed font variables from className */}
      <body className={`antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
            <FloatingChatbot />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
