// src/contexts/AuthContext.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { UserProfile } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';


interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  initialProfileCheckDone: boolean;
  setInitialProfileCheckDone: (done: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialProfileCheckDone, setInitialProfileCheckDone] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Fetch additional user profile data from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUser({ ...firebaseUser, ...userDoc.data() } as UserProfile);
        } else {
          // Base profile if no extra data yet
          setUser(firebaseUser as UserProfile); 
        }
      } else {
        setUser(null);
        setInitialProfileCheckDone(false); // Reset when user logs out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Added a simple loading UI to avoid flash of unauthenticated content
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="space-y-4 p-8 w-full max-w-md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, initialProfileCheckDone, setInitialProfileCheckDone }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};