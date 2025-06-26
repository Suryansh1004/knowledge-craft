// src/app/actions/video.ts
"use server";

import { z } from "zod";
import { createVideoFlow } from "@/ai/flows/create-video-flow";
import { revalidatePath } from "next/cache";

const createVideoSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters long."),
});

// Server action for the manual creation form
export async function createVideoAction(prevState: any, formData: FormData) {
  const validatedFields = createVideoSchema.safeParse({
    prompt: formData.get("prompt"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid prompt.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { prompt } = validatedFields.data;

  try {
    console.log(`Calling createVideoFlow for prompt: "${prompt}"`);
    const result = await createVideoFlow( { prompt } );
    console.log("Flow finished with result:", result);
    
    // Revalidate the videos page to show the new video
    revalidatePath("/videos");

    return { message: `Successfully created video: "${result.title}" (ID: ${result.videoId})` };
  } catch (error: any) {
    console.error("Error in createVideoAction:", error);
    return { error: error.message || "Failed to create video." };
  }
}


// Action for the daily cron job
export async function triggerDailyVideoGeneration() {
    const dailyPrompts = [
        "the science of artificial intelligence",
        "the principles of quantum computing",
        "how blockchain technology works",
        "the biology of CRISPR gene editing",
        "the physics of superconductors",
    ];

    console.log(`[CRON] Starting daily video generation for ${dailyPrompts.length} prompts.`);
    let successCount = 0;
    let errorCount = 0;

    for (const prompt of dailyPrompts) {
        try {
            await createVideoFlow({ prompt });
            successCount++;
        } catch (error) {
            console.error(`[CRON] Failed to generate video for prompt: "${prompt}"`, error);
            errorCount++;
        }
    }
    
    console.log(`[CRON] Daily generation complete. Success: ${successCount}, Failed: ${errorCount}`);
    
    if (successCount > 0) {
      // Revalidate the videos page to show the new videos
      revalidatePath("/videos");
    }

    return { successCount, errorCount };
}
