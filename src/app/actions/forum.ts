// src/app/actions/forum.ts
"use server";

import { z } from "zod";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { ForumPost, ForumTopic } from "@/types";

const createPostSchema = z.object({
  topicId: z.string().min(1),
  content: z.string().min(5, "Post content must be at least 5 characters"),
});

const createTopicSchema = z.object({
    title: z.string().min(5, "Topic title must be at least 5 characters").max(100),
    description: z.string().min(10, "Description must be at least 10 characters").max(250),
    firstPostContent: z.string().min(5, "Initial post content must be at least 5 characters"),
});


export async function createForumPost(prevState: any, formData: FormData) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { error: "You must be logged in to post." };
  }

  const validatedFields = createPostSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid post data.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { topicId, content } = validatedFields.data;

  try {
    const newPost: Omit<ForumPost, 'id' | 'createdAt' | 'userAvatar'> & { submittedAt: any } = {
      topicId,
      userId: currentUser.uid,
      userName: currentUser.displayName || currentUser.email || "Anonymous",
      // userAvatar: currentUser.photoURL || undefined, // Add this if you store avatar on user profile
      content,
      submittedAt: serverTimestamp(), // Firestore will convert this to a timestamp
    };

    // TODO: Implement Firestore interaction here
    const postsRef = collection(db, "forumTopics", topicId, "posts");
    await addDoc(postsRef, newPost);
    // Also update topic's postCount and lastActivity

    return { message: "Post created successfully!" };
  } catch (error: any) {
    return { error: error.message || "Failed to create post." };
  }
}


export async function createForumTopic(prevState: any, formData: FormData) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { error: "You must be logged in to create a topic." };
  }

  const validatedFields = createTopicSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid topic data.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { title, description, firstPostContent } = validatedFields.data;

  try {
    // TODO: Implement Firestore interaction here
    // 1. Create the topic document in 'forumTopics' collection
    const newTopicData = {
        title,
        description,
        slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''), // simple slugify
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        postCount: 1,
        lastActivity: serverTimestamp(),
    };
    const topicsRef = collection(db, "forumTopics");
    const topicDocRef = await addDoc(topicsRef, newTopicData);

    // 2. Create the initial post in the subcollection 'posts' under the new topic
    const firstPostData = {
        topicId: topicDocRef.id,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email || "Anonymous",
        content: firstPostContent,
        createdAt: serverTimestamp(),
    };
    const postsRef = collection(db, "forumTopics", topicDocRef.id, "posts");
    await addDoc(postsRef, firstPostData);

    return { message: "Topic created successfully!", topicSlug: newTopicData.slug };
  } catch (error: any) {
    return { error: error.message || "Failed to create topic." };
  }
}

