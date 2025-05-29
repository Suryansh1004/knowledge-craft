// src/app/actions/bloggerApplication.ts
"use server";

import { z } from "zod";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { BloggerApplication } from "@/types";

const BloggerApplicationSchema = z.object({
  linkedinProfile: z.string().url("Please enter a valid LinkedIn profile URL."),
  reason: z.string().min(50, "Please provide a reason with at least 50 characters.").max(1000, "Reason cannot exceed 1000 characters."),
});

export async function submitBloggerApplication(prevState: any, formData: FormData) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { error: "You must be logged in to apply." };
  }

  const validatedFields = BloggerApplicationSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid application data. Please check your input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { linkedinProfile, reason } = validatedFields.data;

  try {
    const applicationData: Omit<BloggerApplication, 'id' | 'submittedAt' | 'status'> & { submittedAt: any; status: 'pending' } = {
      userId: currentUser.uid,
      userName: currentUser.displayName || "N/A",
      userEmail: currentUser.email || "N/A",
      linkedinProfile,
      reason,
      status: 'pending',
      submittedAt: serverTimestamp(),
    };

    const applicationsCollectionRef = collection(db, "bloggerApplications");
    await addDoc(applicationsCollectionRef, applicationData);

    return { 
        message: "Your application has been submitted successfully! You will be notified once it's reviewed. (Admin: Please check the 'bloggerApplications' collection in Firestore for new applications. Email notification to tripathi1307shubh@gmail.com needs to be set up separately, e.g., via Firebase Cloud Functions & an email service.)" 
    };
  } catch (error: any) {
    console.error("Error submitting blogger application:", error);
    return { error: error.message || "Failed to submit application. Please try again." };
  }
}
