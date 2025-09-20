
// src/types/index.ts
export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string; // Markdown or HTML
  author: string; // User ID or name
  createdAt: Date; // Should be Firestore Timestamp or Date
  excerpt?: string;
  tags?: string[];
}
