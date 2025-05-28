
// src/app/actions/chatbot.ts
'use server';

import { converseWithChatbot, type ChatMessage, type ChatbotInput } from '@/ai/flows/chatbot-flow';

export async function handleChatMessage(
  userInput: string,
  history: ChatMessage[]
): Promise<{ aiResponse?: string; error?: string }> {
  try {
    const input: ChatbotInput = {
      newMessage: userInput,
      history: history,
    };
    const result = await converseWithChatbot(input);
    return { aiResponse: result.aiResponse };
  } catch (e: any) {
    console.error('Error in handleChatMessage:', e);
    return { error: e.message || 'An error occurred while talking to the chatbot.' };
  }
}
