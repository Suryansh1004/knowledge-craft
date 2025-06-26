
'use server';
/**
 * @fileOverview An AI agent that creates video content from a prompt.
 * This flow coordinates multiple steps: generating text content (title, description, tags),
 * simulating video file generation, saving metadata to Firestore, and simulating uploads.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/lib/firebase';

// Schema for the structured text content we want the AI to generate
const VideoContentSchema = z.object({
  title: z.string().describe("A catchy, SEO-friendly title for a short video (e.g., YouTube Short, TikTok). Max 70 characters."),
  description: z.string().describe("A detailed and engaging description for the video, including a call to action. Add relevant hashtags."),
  tags: z.array(z.string()).describe("An array of 5-10 relevant tags or keywords for the video."),
});

// Input schema for the main flow
const CreateVideoInputSchema = z.object({
  prompt: z.string(),
});
export type CreateVideoInput = z.infer<typeof CreateVideoInputSchema>;

// Output schema for the main flow
const CreateVideoOutputSchema = z.object({
  videoId: z.string(),
  status: z.string(),
  title: z.string(),
});
export type CreateVideoOutput = z.infer<typeof CreateVideoOutputSchema>;

// 1. Tool to generate text content using an LLM
const generateTextContentTool = ai.defineTool(
  {
    name: 'generateTextContent',
    description: 'Generates title, description, and tags for a video based on a prompt.',
    inputSchema: z.object({ prompt: z.string() }),
    outputSchema: VideoContentSchema,
  },
  async (input) => {
    const contentPrompt = ai.definePrompt({
      name: 'videoContentPrompt',
      input: { schema: z.object({ prompt: z.string() }) },
      output: { schema: VideoContentSchema },
      prompt: `You are a creative director for a tech education channel called KnowledgeCraft.
      Given the following prompt, generate a viral title, an engaging description, and relevant tags for a short-form video (25 seconds).
      The video is for platforms like YouTube Shorts, TikTok, and Instagram Reels.
      
      Prompt: "{{prompt}}"`,
      config: {
        model: 'googleai/gemini-pro',
        temperature: 0.8,
        responseFormat: 'json',
      }
    });

    const { output } = await contentPrompt.generate({ input });
    if (!output) {
        throw new Error("Failed to generate text content from AI.");
    }
    return output;
  }
);

// 2. Tool to simulate video generation (like calling Veo 3 API)
const generateVideoFileTool = ai.defineTool(
  {
    name: 'generateVideoFile',
    description: 'Simulates generating a video file from a prompt and returns a public URL.',
    inputSchema: z.object({ prompt: z.string() }),
    outputSchema: z.object({ videoUrl: z.string().url() }),
  },
  async (input) => {
    console.log(`Simulating video generation for: ${input.prompt}`);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API delay
    // In a real scenario, this would be a real URL from the video generation service.
    return { videoUrl: "https://storage.googleapis.com/web-dev-assets/video-canvas-optimized.mp4" };
  }
);

// 3. Tool to simulate uploading to social media
const postToSocialMediaTool = ai.defineTool(
    {
        name: 'postToSocialMedia',
        description: 'Simulates uploading a video to social media platforms.',
        inputSchema: z.object({ videoId: z.string(), title: z.string() }),
        outputSchema: z.object({
            youtube: z.string().url(),
            tiktok: z.string().url(),
        }),
    },
    async (input) => {
        console.log(`Simulating upload to social media for video ID: ${input.videoId}`);
        await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate upload delay
        return {
            youtube: `https://www.youtube.com/shorts/simulated_${input.videoId}`,
            tiktok: `https://www.tiktok.com/@knowledgecraft/video/simulated_${input.videoId}`,
        };
    }
);


// The main flow that orchestrates everything
export const createVideoFlow = ai.defineFlow(
  {
    name: 'createVideoFlow',
    inputSchema: CreateVideoInputSchema,
    outputSchema: CreateVideoOutputSchema,
  },
  async (input) => {
    console.log(`[Flow] Starting video creation for prompt: "${input.prompt}"`);

    // Step 1: Generate text content and video file in parallel
    const [textContent, videoFile] = await Promise.all([
      generateTextContentTool(input),
      generateVideoFileTool(input),
    ]);
    console.log(`[Flow] Generated content: ${textContent.title}`);
    console.log(`[Flow] Generated video file: ${videoFile.videoUrl}`);

    // Step 2: Save initial data to Firestore
    const videoData = {
      prompt: input.prompt,
      title: textContent.title,
      description: textContent.description,
      tags: textContent.tags,
      source_video_url: videoFile.videoUrl,
      firebase_storage_url: videoFile.videoUrl, // Using the same placeholder for simplicity
      platform_urls: {},
      status: 'uploading' as const,
      createdAt: serverTimestamp(),
      displayOnWebsite: false, // Don't show on site until fully published
    };

    const docRef = doc(db, "videos", new Date().getTime().toString()); // Simple unique ID
    await setDoc(docRef, videoData);
    const videoId = docRef.id;
    console.log(`[Flow] Saved initial metadata to Firestore. Video ID: ${videoId}`);

    // Step 3: "Upload" to social media
    const socialUrls = await postToSocialMediaTool({ videoId, title: textContent.title });
    console.log(`[Flow] Simulated social media upload complete.`);

    // Step 4: Update Firestore with final URLs and status
    await updateDoc(docRef, {
        platform_urls: socialUrls,
        status: 'published',
        displayOnWebsite: true,
        publishedAt: serverTimestamp(),
    });
    console.log(`[Flow] Finalized video in Firestore. ID: ${videoId}`);

    return {
      videoId,
      status: 'published',
      title: textContent.title,
    };
  }
);
