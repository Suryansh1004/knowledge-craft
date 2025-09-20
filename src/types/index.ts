// src/types/index.ts
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
