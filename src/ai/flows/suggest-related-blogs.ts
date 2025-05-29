
// src/ai/flows/suggest-related-blogs.ts
'use server';
/**
 * @fileOverview An AI agent that suggests related blog posts based on the content of the current blog post.
 *
 * - suggestRelatedBlogs - A function that suggests related blog posts.
 * - SuggestRelatedBlogsInput - The input type for the suggestRelatedBlogs function.
 * - SuggestRelatedBlogsOutput - The return type for the suggestRelatedBlogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function suggestRelatedBlogs(input: SuggestRelatedBlogsInput): Promise<SuggestRelatedBlogsOutput> {
  return suggestRelatedBlogsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedBlogsPrompt',
  input: {schema: SuggestRelatedBlogsInputSchema},
  output: {schema: SuggestRelatedBlogsOutputSchema},
  prompt: `You are an expert blog recommender. Based on the content of the current blog post, suggest other blog posts that the user might find interesting.

Current Blog Post Content: {{{currentBlogContent}}}

Suggest 3 related blog post titles. Return the titles as a JSON array.`,
});

const suggestRelatedBlogsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedBlogsFlow',
    inputSchema: SuggestRelatedBlogsInputSchema,
    outputSchema: SuggestRelatedBlogsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Safely handle cases where output might be null or undefined, or not match the schema
    if (output && Array.isArray(output.relatedBlogTitles)) {
      return output;
    }
    // Return a default valid output if AI fails to produce one
    return { relatedBlogTitles: [] };
  }
);

