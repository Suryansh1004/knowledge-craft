
// src/app/actions/blog.ts
'use server';

import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Blog } from '@/types'; // Assuming Blog type is appropriate

// Zod schema for validating blog post input
const CreateBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150, "Title must be 150 characters or less"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  courseId: z.string().min(1, "Please select a course"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(300, "Excerpt must be 300 characters or less").optional(),
  tags: z.string().optional(), // Comma-separated tags
  image: z.string().url("Please enter a valid URL for the main image").optional().or(z.literal('')),
  authorImage: z.string().url("Please enter a valid URL for the author image").optional().or(z.literal('')),
});

export async function createBlogPost(prevState: any, formData: FormData) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { error: "You must be logged in to create a blog post." };
  }

  const validatedFields = CreateBlogSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid blog post data. Please check your input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, slug, content, courseId, excerpt, tags, image, authorImage } = validatedFields.data;

  try {
    const blogData: Omit<Blog, 'id' | 'createdAt'> & { authorId: string; createdAt: any } = { // `any` for serverTimestamp
      title,
      slug,
      content,
      courseId,
      excerpt: excerpt || content.substring(0, 160) + '...', // Auto-generate excerpt if not provided
      tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      image: image || undefined,
      author: currentUser.displayName || currentUser.email || "Anonymous User",
      authorId: currentUser.uid,
      authorImage: authorImage || currentUser.photoURL || undefined,
      createdAt: serverTimestamp(),
    };

    const blogsCollectionRef = collection(db, "blogs");
    await addDoc(blogsCollectionRef, blogData);

    return { message: "Blog post created successfully!" };
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return { error: error.message || "Failed to create blog post. Please try again." };
  }
}
