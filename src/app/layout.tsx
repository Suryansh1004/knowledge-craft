import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://knowledgecraft.com"),
  title: {
    default:
      "Knowledge Craft | Online Tech Courses for Web Development, AI & Cloud",
    template: "%s | Knowledge Craft",
  },
  description:
    "Master in-demand tech skills with Knowledge Craft. Explore expert-led online courses in Web Development, Data Science, AI, Cloud Computing, and more.",
  openGraph: {
    title:
      "Knowledge Craft | Online Tech Courses for Web Development, AI & Cloud",
    description:
      "Expert-led online courses to help you master in-demand tech skills.",
    images: ["/og-image.png"],
    siteName: "Knowledge Craft",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <AuthProvider>
            <Header />
            <main className="flex-1 w-full container mx-auto px-4 md:px-6">
                {children}
            </main>
            <Footer />
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
