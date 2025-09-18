import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FloatingChatbot } from "@/components/chatbot/FloatingChatbot";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://knowledgecraft.com"),
  title: {
    default:
      "Knowledge Craft | Online Tech Courses for Web Development, AI & Cloud",
    template: "%s | Knowledge Craft",
  },
  description:
    "Master in-demand tech skills with Knowledge Craft. Explore expert-led online courses in Web Development, Data Science, AI, Cloud Computing, and more. Start your learning journey today!",
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
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 w-full container mx-auto">
                {children}
              </main>
              <Footer />
              <Toaster />
              <FloatingChatbot />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
