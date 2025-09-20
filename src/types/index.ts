// src/types/index.ts
import type { User as FirebaseUser } from 'firebase/auth';

export interface UserProfile extends FirebaseUser {
  organization?: string;
  yearOfPassout?: number;
  // Any other custom fields
}

export type EditableUserProfile = {
  displayName?: string;
  organization?: string;
  yearOfPassout?: number;
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
