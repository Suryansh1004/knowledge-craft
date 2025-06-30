'use client';

import { useAuth } from "@/contexts/AuthContext";

import dynamic from 'next/dynamic';

export const AuthProvider = dynamic(
  () => import('@/contexts/AuthContext').then(mod => mod.AuthProvider),
  { ssr: false }
);