
// src/app/privacy/page.tsx

import type { Metadata } from 'next';

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: 'Privacy Policy | Knowledge Craft',
  description: `Learn how Knowledge Craft collects, uses, and protects your personal information. Our commitment to your privacy. Last updated ${currentYear}.`,
};

export default function PrivacyPage() {
  // This page is primarily static content, no client-side hooks needed directly
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>Your privacy is important to us. It is Knowledge Craft's policy to respect your privacy regarding any information we may collect from you across our website, [Your Website URL], and other sites we own and operate.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p>Log data: When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.</p>
        <p>Device data: We may also collect data about the device you’re using to access our website. This data may include the device type, operating system, unique device identifiers, device settings, and geo-location data.</p>
        <p>Personal information: We may ask for personal information, such as your name, email, social media profiles, date of birth, phone/mobile number, home/mailing address, payment information.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. Legal Bases for Processing</h2>
        <p>We will process your personal information lawfully, fairly and in a transparent manner. We collect and process information about you only where we have legal bases for doing so.</p>
        <p>These legal bases depend on the services you use and how you use them, meaning we collect and use your information only where:</p>
        <ul>
          <li>it’s necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract (for example, when we provide a service you request from us);</li>
          <li>it satisfies a legitimate interest (which is not overridden by your data protection interests), such as for research and development, to market and promote our services, and to protect our legal rights and interests;</li>
          <li>you give us consent to do so for a specific purpose (for example, you might consent to us sending you our newsletter); or</li>
          <li>we need to process your data to comply with a legal obligation.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Use of Information</h2>
        <p>We may use information we collect for a variety of purposes, including to:</p>
        <ul>
            <li>Provide, operate, and maintain our website;</li>
            <li>Improve, personalize, and expand our website;</li>
            <li>Understand and analyze how you use our website;</li>
            <li>Develop new products, services, features, and functionality;</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes;</li>
            <li>Send you emails;</li>
            <li>Find and prevent fraud.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Security of Your Personal Information</h2>
        <p>We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
        <p>Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Your Rights</h2>
        <p>You have the right to be informed about how your data is collected and used. You are entitled to know what data we collect about you, and how it is processed. You are entitled to correct and update any personal information about you, and to request this information be deleted.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Changes to This Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <p className="mt-8">Last updated: May 29, {currentYear}</p>
      </div>
    </div>
  );
}
