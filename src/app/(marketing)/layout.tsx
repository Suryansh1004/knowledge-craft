// src/app/(marketing)/layout.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // AuthProvider is still needed here for components like Header that use useAuth
    // but the pages themselves (like /login, /) don't need to be client components
    <AuthProvider>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
    </AuthProvider>
  );
}
