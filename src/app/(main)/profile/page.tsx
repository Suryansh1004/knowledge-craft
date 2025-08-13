
// src/app/(main)/profile/page.tsx
"use client"; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext";
import { ProfileForm } from '@/components/auth/ProfileForm';
import { updateUserProfile } from '@/app/actions/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Building, CalendarDays, UserCircle, Edit3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function ProfilePage() {
  const { user, loading, initialProfileCheckDone, setInitialProfileCheckDone } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && !user.organization && !user.yearOfPassout && !initialProfileCheckDone) {
      // This is a simplified check for "first time" profile setup.
      // You might want a more robust flag in your user data.
      // For now, we set it so the modal/prompt doesn't reappear after filling or skipping.
      // The actual ask for details is implicitly handled by ProfileForm being always visible here.
      // If a modal was required, logic would go here.
      // For now, just mark that we've "checked" (i.e. shown the profile page)
      // setInitialProfileCheckDone(true); // This would be set after they submit the form.
    }
  }, [user, initialProfileCheckDone, setInitialProfileCheckDone]);

  if (loading || !user) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6">
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
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-primary mb-8">My Profile</h1>
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader className="items-center text-center">
            <Avatar className="w-28 h-28 mb-4 border-4 border-primary">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback className="text-4xl">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserCircle size={48}/>}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.displayName || 'User Name'}</CardTitle>
            <CardDescription className="text-accent">{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {user.organization && (
              <div className="flex items-center text-muted-foreground">
                <Building className="h-4 w-4 mr-2 text-primary" />
                <span>Works at {user.organization}</span>
              </div>
            )}
            {user.yearOfPassout && (
              <div className="flex items-center text-muted-foreground">
                <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                <span>Graduated in {user.yearOfPassout}</span>
              </div>
            )}
             {!user.organization && !user.yearOfPassout && (
              <p className="text-center text-muted-foreground italic">Complete your profile to get the most out of Knowledge Craft!</p>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <ProfileForm user={user} action={updateUserProfileAction} />
        </div>
      </div>
    </div>
  );
}
