// src/types/index.ts
import type { User as FirebaseUser } from 'firebase/auth';

export interface UserProfile extends FirebaseUser {
  organization?: string;
  yearOfPassout?: number;
  roles?: string[]; // Added for blogger role
  // Any other custom fields
}

export type EditableUserProfile = {
  displayName?: string;
  organization?: string;
  yearOfPassout?: number;
  roles?: string[];
};

export interface Course {
  data_ai_hint: string;
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: any; // Lucide icon component or name
  slug: string;
}

export interface Blog {
  data_ai_hint: string,
  id: string;
  courseId: string;
  slug: string;
  title: string;
  content: string; // Markdown or HTML
  author: string; // User ID or name
  authorImage?: string;
  createdAt: Date; // Should be Firestore Timestamp or Date
  excerpt?: string;
  tags?: string[];
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  slug: string;
  postCount?: number;
  lastActivity?: Date; // Should be Firestore Timestamp or Date
  icon?: any;
}

export interface ForumPost {
  id: string;
  topicId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date; // Should be Firestore Timestamp or Date
  // replies?: ForumPost[]; // For threaded discussions
}

export interface CodingProblem {
  id:string;
  title: string;
  platform: 'LeetCode' | 'HackerRank' | 'Other';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags?: string[];
  slug: string;
}

export interface CodingSubmission {
  id: string;
  userId: string;
  problemId: string;
  problemTitle: string;
  platform: string;
  code: string;
  status: 'Submitted' | 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  submittedAt: Date; // Should be Firestore Timestamp or Date
  language: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  tags: string[];
  prompt: string;
  source_video_url: string; // Placeholder URL from a video generation service
  firebase_storage_url?: string; // URL in Firebase Storage
  platform_urls: {
    youtube?: string;
    tiktok?: string;
    facebook?: string;
  };
  status: 'queued' | 'generating' | 'uploading' | 'published' | 'error';
  createdAt: any; // Firestore ServerTimestamp
  publishedAt?: any; // Firestore ServerTimestamp
  displayOnWebsite: boolean;
}
