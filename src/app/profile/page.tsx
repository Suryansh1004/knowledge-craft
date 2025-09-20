
// src/app/profile/page.tsx
"use client"; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext";
import { ProfileForm } from '@/components/auth/ProfileForm';
import { updateUserProfile } from '@/app/actions/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="py-12">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="grid md:grid-cols-3 gap-8">
          <Skeleton className="md:col-span-1 h-64 rounded-lg" />
          <Skeleton className="md:col-span-2 h-96 rounded-lg" />
        </div>
      </div>
    );
  }
  
  // Bind userId to the server action
  const updateUserProfileAction = updateUserProfile.bind(null, user.uid);

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">My Profile</h1>
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader className="items-center text-center">
            <Avatar className="w-28 h-28 mb-4 border-4 border-primary">
              <AvatarFallback className="text-4xl">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserCircle size={48}/>}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.displayName || 'User Name'}</CardTitle>
            <CardDescription className="text-accent">{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-center text-muted-foreground italic">Welcome to your profile page.</p>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <ProfileForm user={user} action={updateUserProfileAction} />
        </div>
      </div>
    </div>
  );
}
