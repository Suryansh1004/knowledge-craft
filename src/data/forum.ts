// src/data/forum.ts
import type { ForumTopic, ForumPost } from '@/types';
import { MessageCircle, HelpCircle, Lightbulb, Code2 } from 'lucide-react';

export const forumTopics: ForumTopic[] = [
  {
    id: 'general-discussion',
    title: 'General Discussion',
    description: 'Talk about anything tech-related, share news, or ask general questions.',
    slug: 'general-discussion',
    postCount: 152,
    lastActivity: new Date('2023-10-26T10:00:00Z'),
    icon: MessageCircle,
  },
  {
    id: 'web-development-help',
    title: 'Web Development Help',
    description: 'Get help with HTML, CSS, JavaScript, React, Node.js, and other web technologies.',
    slug: 'web-development-help',
    postCount: 340,
    lastActivity: new Date('2023-10-27T14:30:00Z'),
    icon: Code2,
  },
  {
    id: 'data-science-queries',
    title: 'Data Science & ML Queries',
    description: 'Discuss data analysis, machine learning algorithms, Python, R, and more.',
    slug: 'data-science-queries',
    postCount: 210,
    lastActivity: new Date('2023-10-25T09:15:00Z'),
    icon: Lightbulb,
  },
  {
    id: 'career-advice',
    title: 'Career Advice',
    description: 'Ask for career advice, share interview experiences, and discuss job market trends.',
    slug: 'career-advice',
    postCount: 98,
    lastActivity: new Date('2023-10-24T11:00:00Z'),
    icon: HelpCircle,
  },
];

export const forumPosts: { [topicId: string]: ForumPost[] } = {
  'general-discussion': [
    {
      id: 'post-gd-1',
      topicId: 'general-discussion',
      userId: 'user123',
      userName: 'TechGuru',
      userAvatar: 'https://placehold.co/50x50/FFAB91/BF360C?text=TG',
      content: 'What are your thoughts on the latest advancements in AI?',
      createdAt: new Date('2023-10-26T10:05:00Z'),
    },
    {
      id: 'post-gd-2',
      topicId: 'general-discussion',
      userId: 'user456',
      userName: 'CodeWizard',
      userAvatar: 'https://placehold.co/50x50/80CBC4/00796B?text=CW',
      content: 'I think quantum computing will revolutionize many fields. It\'s exciting to see the progress!',
      createdAt: new Date('2023-10-26T10:15:00Z'),
    },
  ],
  'web-development-help': [
    {
      id: 'post-wdh-1',
      topicId: 'web-development-help',
      userId: 'user789',
      userName: 'ReactFan',
      userAvatar: 'https://placehold.co/50x50/CE93D8/8E24AA?text=RF',
      content: 'I\'m having trouble with React state management. Any advice on when to use Context API vs Redux?',
      createdAt: new Date('2023-10-27T14:35:00Z'),
    },
     {
      id: 'post-wdh-2',
      topicId: 'web-development-help',
      userId: 'user101',
      userName: 'CSSMaster',
      userAvatar: 'https://placehold.co/50x50/90CAF9/1976D2?text=CM',
      content: 'For smaller apps, Context API is great. For larger, more complex state, Redux or Zustand might be better. It depends on your project scale and team familiarity.',
      createdAt: new Date('2023-10-27T14:50:00Z'),
    },
  ],
  // Add more posts for other topics if needed
};
