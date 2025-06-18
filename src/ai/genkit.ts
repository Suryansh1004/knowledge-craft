
'use server';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// IMPORTANT: Ensure you have GEMINI_API_KEY or GOOGLE_API_KEY set in your .env file for local development,
// or as an environment variable in your deployment environment (e.g., Firebase App Hosting secrets).
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!geminiApiKey && process.env.NODE_ENV !== 'production') {
  console.warn(
    "Gemini API key not found. Please set GEMINI_API_KEY or GOOGLE_API_KEY in your .env file or environment variables."
  );
}

// Genkit 1.x initialization
export const ai = genkit({
  plugins: [
    googleAI(geminiApiKey ? { apiKey: geminiApiKey } : undefined),
  ],
  // logLevel: 'debug', // Not a top-level option in genkit() v1.x
  // enableTracingAndMetrics: true, // Not a top-level option in genkit() v1.x
  // Consider using @genkit-ai/ βασικά-instrumentation for tracing/metrics if needed,
  // or check Genkit documentation for v1.x observability.
});
