
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

    // Log the messages being sent to the LLM for debugging
    console.log('Chatbot Flow: Sending messages to LLM:', JSON.stringify(messagesForLlm, null, 2));

    const llmResponse = await ai.generate({
      messages: messagesForLlm,
      // model: 'googleai/gemini-2.0-flash', // Explicitly defining, though default should work
      // config: { temperature: 0.7 }, // Optional: adjust temperature
    });

    const responseText = llmResponse.text; // Correct: Genkit 1.x uses property access

    if (responseText === undefined || responseText === null || responseText.trim() === "") {
      console.warn("Chatbot LLM returned an empty, null, undefined, or non-text response. LLM Response object:", JSON.stringify(llmResponse, null, 2));
      return { aiResponse: "I'm sorry, I couldn't generate a response at this moment." };
    }
    
    return { aiResponse: responseText };
  }
);

