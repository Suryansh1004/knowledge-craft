
// src/components/blog/NewBlogPostClientPage.tsx
"use client";

import { CreateBlogForm } from '@/components/blog/CreateBlogForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export function NewBlogPostClientPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isBlogger = user?.roles?.includes('blogger');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user && !isBlogger) {
      // Redirect if the user is logged in but is not a blogger
      router.push('/apply-blogger');
    }
  }, [user, loading, isBlogger, router]);

  if (loading || !isBlogger) {
    return (
       <div className="py-12">
        <Card className="w-full max-w-lg mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                  <FileText className="mr-3 h-7 w-7" /> Create New Post
              </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p className="text-muted-foreground">Checking authorization...</p>
                ) : (
                    <p className="text-muted-foreground">You are not authorized to create posts. Please <Link href="/apply-blogger" className="underline text-primary">apply to be a blogger</Link>.</p>
                )}
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <CreateBlogForm />
  );
}
