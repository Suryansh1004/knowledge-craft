// src/types/index.ts
import type { User as FirebaseUser } from 'firebase/auth';

export interface UserProfile extends FirebaseUser {
  organization?: string;
  yearOfPassout?: number;
  // Any other custom fields
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string; // URL to image
  icon?: any; // Lucide icon component or name
  slug: string;
}

export interface Blog {
  id: string;
  courseId: string;
  slug: string;
  title: string;
  content: string; // Markdown or HTML
  author: string; // User ID or name
  authorImage?: string;
  createdAt: Date;
  excerpt?: string;
  tags?: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string; // URL to avatar image
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  slug: string;
  postCount?: number;
  lastActivity?: Date;
  icon?: any;
}

export interface ForumPost {
  id: string;
  topicId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
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
  submittedAt: Date;
  language: string;
}
