
// src/ai/flows/chatbot-flow.ts
'use server';
/**
 * @fileOverview A Genkit flow for handling chatbot conversations.
 *
 * - converseWithChatbot - A function that processes user input and conversation history to generate an AI response.
 * - ChatbotInput - The input type for the converseWithChatbot function.
 * - ChatbotOutput - The return type for the converseWithChatbot function.
 * - ChatMessage - The type for individual messages in the conversation history.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']).describe("The role of the message sender, either 'user' or 'model' (for AI)."),
  parts: z.array(z.object({ text: z.string() })).describe("The content parts of the message, typically a single text part."),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatbotInputSchema = z.object({
  newMessage: z.string().describe('The latest message from the user.'),
  history: z.array(ChatMessageSchema).describe('The conversation history leading up to this message.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  aiResponse: z.string().describe('The AI-generated response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function converseWithChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const messagesForLlm = [
      ...input.history,
      { role: 'user' as const, parts: [{ text: input.newMessage }] },
    ];

    // Optional: Add a system prompt if desired.
    // Example:
    // const systemMessage = { role: 'system', parts: [{ text: 'You are a friendly assistant for Knowledge Craft.' }] };
    // const messagesWithSystem = [systemMessage, ...messagesForLlm];
    // Note: For Gemini API, a system prompt can be the first user message with instructions, or some models support a dedicated 'system' role.
    // For simplicity, we are not using a system prompt here.

    const llmResponse = await ai.generate({
      messages: messagesForLlm,
      // config: { temperature: 0.7 }, // Optional: adjust temperature
    });

    const responseText = llmResponse.text; // Correct: Genkit 1.x uses property access

    if (responseText === undefined || responseText === null || responseText.trim() === "") {
      console.warn("Chatbot LLM returned an empty, null, undefined, or non-text response.");
      return { aiResponse: "I'm sorry, I couldn't generate a response at this moment." };
    }
    
    return { aiResponse: responseText };
  }
);
