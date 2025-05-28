// src/app/actions/coding.ts
"use server";

import { z } from "zod";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { CodingSubmission } from "@/types";

const submitCodingProblemSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required."),
  problemTitle: z.string().min(1, "Problem title is required."),
  platform: z.string().min(1, "Platform is required."),
  language: z.string().min(1, "Language is required."),
  code: z.string().min(1, "Code cannot be empty."),
});

export async function submitCodingProblem(prevState: any, formData: FormData): Promise<{
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  status?: 'Submitted' | 'Error' | 'Accepted'
}> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { error: "You must be logged in to submit a solution.", status: "Error" };
  }

  const validatedFields = submitCodingProblemSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: "Invalid submission data. Please check your input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      status: "Error"
    };
  }

  const { problemId, problemTitle, platform, language, code } = validatedFields.data;

  try {
    const submissionData = {
      userId: currentUser.uid,
      problemId,
      problemTitle,
      platform,
      language,
      code,
      status: "Submitted" as CodingSubmission['status'], 
      submittedAt: serverTimestamp(),
    };

    const codingSubmissionsRef = collection(db, "codingSubmissions");
    await addDoc(codingSubmissionsRef, submissionData);

    return { 
        message: `Solution submitted successfully for "${problemTitle}"! It is being evaluated. (Mock Response)`, 
        status: "Submitted" 
    };

  } catch (error: any) {
    console.error("Error submitting coding problem:", error);
    return { error: error.message || "Failed to submit solution. Please try again.", status: "Error" };
  }
}
