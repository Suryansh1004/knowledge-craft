// src/app/actions/blog.ts
'use server';

import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import type { Blog, UserProfile } from '@/types';

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

  // Check user role
  const userDocRef = doc(db, "users", currentUser.uid);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    return { error: "User profile not found." };
  }
  const userProfile = userDoc.data() as UserProfile;
  if (!userProfile.roles?.includes('blogger')) {
    return { error: "You are not authorized to publish blog posts. Please apply to become a blogger." };
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

  // Check for duplicate slug
  const blogsCollectionRef = collection(db, "blogs");
  const slugQuery = query(blogsCollectionRef, where("slug", "==", slug));
  const slugQuerySnapshot = await getDocs(slugQuery);
  if (!slugQuerySnapshot.empty) {
    return { 
      error: "This slug is already in use. Please choose a unique slug.",
      fieldErrors: { slug: ["This slug is already in use. Please choose a unique slug."] }
    };
  }

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
      data_ai_hint: "",
    };

    await addDoc(blogsCollectionRef, blogData);

    return { message: "Blog post created successfully!" };
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return { error: error.message || "Failed to create blog post. Please try again." };
  }
}

// Zod schema for validating blog comment input
const CreateBlogCommentSchema = z.object({
  blogId: z.string().min(1, "Blog ID is required."),
  content: z.string().min(1, "Comment cannot be empty.").max(1000, "Comment is too long."),
});

export async function createBlogComment(prevState: any, formData: FormData) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { error: "You must be logged in to comment." };
  }

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = CreateBlogCommentSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: "Invalid comment data.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { blogId, content } = validatedFields.data;

  try {
    const commentData = {
      blogId,
      userId: currentUser.uid,
      userName: currentUser.displayName || currentUser.email || "Anonymous User",
      userAvatar: currentUser.photoURL || undefined,
      content,
      createdAt: serverTimestamp(),
    };

    const commentsCollectionRef = collection(db, "blogs", blogId, "comments");
    await addDoc(commentsCollectionRef, commentData);

    return { message: "Comment posted successfully!" };
  } catch (error: any) {
    console.error("Error creating blog comment:", error);
    return { error: error.message || "Failed to post comment. Please try again." };
  }
}
