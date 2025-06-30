
// src/app/terms/page.tsx
export const dynamic = "force-dynamic";
import type { Metadata } from 'next';
"use client";

import { useAuth } from "@/contexts/AuthContext";


const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: 'Terms of Service | Knowledge Craft',
  description: `Review the Terms of Service for using the Knowledge Craft website and its services. Last updated ${currentYear}.`,
};

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Welcome to Knowledge Craft! These terms and conditions outline the rules and regulations for the use of Knowledge Craft's Website, located at [Your Website URL].</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Knowledge Craft if you do not agree to take all of the terms and conditions stated on this page.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. Intellectual Property Rights</h2>
        <p>Other than the content you own, under these Terms, Knowledge Craft and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>publishing any Website material in any other media;</li>
          <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>publicly performing and/or showing any Website material;</li>
          <li>using this Website in any way that is or may be damaging to this Website;</li>
          <li>using this Website in any way that impacts user access to this Website;</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Your Content</h2>
        <p>In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Knowledge Craft a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
        <p>Your Content must be your own and must not be invading any third-party’s rights. Knowledge Craft reserves the right to remove any of Your Content from this Website at any time without notice.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Limitation of liability</h2>
        <p>In no event shall Knowledge Craft, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Knowledge Craft, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">6. Governing Law & Jurisdiction</h2>
        <p>These Terms will be governed by and interpreted in accordance with the laws of the State/Country of [Your State/Country], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your State/Country] for the resolution of any disputes.</p>

        <p className="mt-8">Last updated: May 29, {currentYear}</p>
      </div>
    </div>
  );
}
