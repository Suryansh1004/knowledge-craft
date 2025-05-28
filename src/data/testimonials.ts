// src/data/testimonials.ts
import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Software Engineer @ TechCorp',
    quote: 'LearnHub provided me with the exact skills I needed to advance my career. The courses are well-structured and up-to-date.',
    avatar: 'https://placehold.co/100x100/FFCDD2/F44336?text=AJ', // Placeholder with initials
    data_ai_hint: 'person portrait',
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Data Analyst @ DataSolutions',
    quote: 'The Data Science track was phenomenal. I loved the hands-on projects and the supportive community.',
    avatar: 'https://placehold.co/100x100/C5CAE9/3F51B5?text=BS',
    data_ai_hint: 'professional headshot',
  },
  {
    id: '3',
    name: 'Carol Davis',
    role: 'UX Designer @ CreativeMinds',
    quote: 'I switched careers thanks to LearnHub. The UI/UX course was comprehensive and practical. Highly recommended!',
    avatar: 'https://placehold.co/100x100/B2DFDB/009688?text=CD',
    data_ai_hint: 'smiling person',
  },
];
