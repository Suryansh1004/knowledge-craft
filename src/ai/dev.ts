
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-related-blogs.ts';
import '@/ai/flows/chatbot-flow.ts'; // Added import for chatbot flow
import '@/ai/flows/create-video-flow.ts'; // Added import for video creation flow
