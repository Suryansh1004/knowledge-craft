
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// IMPORTANT: Ensure you have GEMINI_API_KEY or GOOGLE_API_KEY set in your .env file for local development,
// or as an environment variable in your deployment environment (e.g., Firebase App Hosting secrets).
// Example .env entry:
// GEMINI_API_KEY=your_actual_api_key_here

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!geminiApiKey && process.env.NODE_ENV !== 'production') {
  console.warn(
    "Gemini API key not found. Please set GEMINI_API_KEY or GOOGLE_API_KEY in your .env file or environment variables."
  );
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: "AIzaSyArAE3k-S2mLFZyw8owuVI5iyGZ9NWAVIw", // Pass the API key explicitly
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
