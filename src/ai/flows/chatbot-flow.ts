'use server';
/**
 * @fileOverview A Genkit flow for handling chatbot conversations using Genkit v1.x.
 *
 * - converseWithChatbot - A function that processes user input and conversation history to generate an AI response.
 * - ChatbotInput - The input type for the converseWithChatbot function.
 * - ChatbotOutput - The return type for the converseWithChatbot function.
 * - ChatMessage - The type for individual messages in the conversation history.
 */

import { ai } from '@/ai/genkit'; // Import the shared 'ai' instance
import { z } from 'zod';
import { runPrompt } from 'genkit';

// ChatMessage schema remains the same
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']).describe("The role of the message sender, either 'user' or 'model' (for AI)."),
  content: z.string().describe("The text content of the message."),
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

// Define the prompt using ai.definePrompt
const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  system: 'You are a helpful AI assistant for Knowledge Craft. Respond to user queries concisely and informatively.',
  input: { schema: z.object({ currentMessage: z.string(), history: z.array(ChatMessageSchema) }) },
  output: { schema: ChatbotOutputSchema },
  prompt: '{{{currentMessage}}}', // Use Handlebars template string
  config: {
    model: 'googleai/gemini-pro',
    temperature: 0.7,
  }
});


// Define the flow using ai.defineFlow
const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input: ChatbotInput) => {
    const sanitizedHistory: ChatMessage[] = input.history
      .filter(msg => (msg.role === 'user' || msg.role === 'model') && msg.content && msg.content.trim() !== '')
      .map(msg => ({
        role: msg.role,
        content: msg.content.trim(),
      }));

    const newUserPromptText = input.newMessage.trim();
    
    // Invoke the prompt as a function
    const { output } = await chatbotPrompt(
      { currentMessage: newUserPromptText, history: sanitizedHistory },
      { history: sanitizedHistory } // Pass history to the model
    );

    const responseText = output?.aiResponse;

    if (typeof responseText !== 'string' || responseText.trim() === '') {
      console.warn("Chatbot LLM (Genkit 1.x) returned an empty or invalid response. Full response object:", JSON.stringify({output}, null, 2));
      return { aiResponse: "I'm sorry, I couldn't generate a response at this moment." };
    }

    return { aiResponse: responseText };
  }
);

// Exported wrapper function remains the same
export async function converseWithChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}
