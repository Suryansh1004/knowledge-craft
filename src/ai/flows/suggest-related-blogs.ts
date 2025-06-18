
'use server';
/**
 * @fileOverview An AI agent that suggests related blog posts based on the content of the current blog post, using Genkit v1.x.
 *
 * - suggestRelatedBlogs - A function that suggests related blog posts.
 * - SuggestRelatedBlogsInput - The input type for the suggestRelatedBlogs function.
 * - SuggestRelatedBlogsOutput - The return type for the suggestRelatedBlogs function.
 */

import { ai } from '@/ai/genkit'; // Import the shared 'ai' instance
import { z } from 'zod';

const SuggestRelatedBlogsInputSchema = z.object({
  currentBlogContent: z
    .string()
    .describe('The content of the current blog post the user is reading.'),
});
export type SuggestRelatedBlogsInput = z.infer<typeof SuggestRelatedBlogsInputSchema>;

const SuggestRelatedBlogsOutputSchema = z.object({
  relatedBlogTitles: z
    .array(z.string())
    .describe('An array of titles of related blog posts.'),
});
export type SuggestRelatedBlogsOutput = z.infer<typeof SuggestRelatedBlogsOutputSchema>;

// Define the prompt using ai.definePrompt
const suggestRelatedBlogsPrompt = ai.definePrompt({
  name: 'suggestRelatedBlogsPrompt',
  input: { schema: SuggestRelatedBlogsInputSchema }, // Input is the current blog content
  output: { schema: SuggestRelatedBlogsOutputSchema }, // Output is an array of titles
  prompt: `You are an expert blog recommender. You will be given the content of a current blog post.
Your task is to suggest 3 titles of other blog posts that the user might find interesting and relevant.
Return your response as a JSON object with a single key "relatedBlogTitles" which is an array of strings.
Example JSON:
{
  "relatedBlogTitles": ["Example Title 1", "Another Interesting Post", "A Third Suggestion"]
}

Current Blog Post Content:
{{{currentBlogContent}}}`,
  config: {
    model: 'googleai/gemini-pro', // Specify model here for Genkit 1.x
    temperature: 0.5,
    responseFormat: 'json', // Request JSON output explicitly if model supports it
  },
});

// Define the flow using ai.defineFlow
const suggestRelatedBlogsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedBlogsFlow',
    inputSchema: SuggestRelatedBlogsInputSchema,
    outputSchema: SuggestRelatedBlogsOutputSchema,
  },
  async (input: SuggestRelatedBlogsInput) => {
    const llmResponse = await suggestRelatedBlogsPrompt.generate({
        input: input, // Pass the flow input to the prompt
    });

    const output = llmResponse.output; // Access output directly

    if (output && Array.isArray(output.relatedBlogTitles)) {
      return output;
    }
    
    console.warn('SuggestRelatedBlogsFlow (Genkit 1.x): AI output was not in the expected format or was null. Output:', output);
    return { relatedBlogTitles: [] }; // Fallback
  }
);

// Exported wrapper function remains the same
export async function suggestRelatedBlogs(input: SuggestRelatedBlogsInput): Promise<SuggestRelatedBlogsOutput> {
  return suggestRelatedBlogsFlow(input);
}
