'use server';
/**
 * @fileOverview A Genkit flow for handling chatbot conversations.
 *
 * - converseWithChatbot - A function that processes user input and conversation history to generate an AI response.
 * - ChatbotInput - The input type for the converseWithChatbot function.
 * - ChatbotOutput - The return type for the converseWithChatbot function.
 * - ChatMessage - The type for individual messages in the conversation history.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']).describe("The role of the message sender, either 'user' or 'model' (for AI)."),
  content: z.array(z.object({ text: z.string() })).describe("The content parts of the message, typically a single text part."),
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
    // Step 1: Sanitize history
    let sanitizedHistory = input.history
      .filter(msg => (msg.role === 'user' || msg.role === 'model'))
      .map(msg => ({
        role: msg.role,
        content: msg.content.filter(c => c.text && c.text.trim() !== '')
      }))
      .filter(msg => msg.content.length > 0); // drop messages with empty content

    // Step 2: Add new user message
    const newUserMessage = {
      role: 'user' as const,
      content: [{ text: input.newMessage }],
    };

    // Step 3: Ensure first message is from user
    if (sanitizedHistory.length === 0 || sanitizedHistory[0].role !== 'user') {
      sanitizedHistory = [newUserMessage];
    } else {
      sanitizedHistory.push(newUserMessage);
    }

    // Debug: Log sanitized messages
    console.log('Chatbot Flow: Sanitized messages for LLM:', JSON.stringify(sanitizedHistory, null, 2));

    // Step 4: Call the LLM
    const llmResponse = await ai.generate({
      messages: sanitizedHistory,
      // model: 'googleai/gemini-2.0-flash', // Uncomment if needed
      // config: { temperature: 0.7 }, // Optional tweak
    });

    const responseText = llmResponse.text;

    if (!responseText || responseText.trim() === '') {
      console.warn("Chatbot LLM returned an empty or invalid response. Full response:", JSON.stringify(llmResponse, null, 2));
      return { aiResponse: "I'm sorry, I couldn't generate a response at this moment." };
    }

    return { aiResponse: responseText };
  }
);
