
// src/data/courses.ts
import type { Course } from '@/types';
import { Laptop, Code, Database, Cloud, Palette, BarChart3, TerminalSquare, Server } from 'lucide-react';

export const courses: Course[] = [
  {
    id: 'web-development',
    title: 'Full-Stack Web Development',
    description: 'Master front-end and back-end technologies to build complete web applications.',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/web/600/400',
    data_ai_hint: 'web development',
    icon: Laptop,
    slug: 'web-development-bootcamp',
  },
  {
    id: 'data-science',
    title: 'Data Science & Machine Learning',
    description: 'Learn to analyze data, build predictive models, and derive insights using Python and R.',
    category: 'Data Science',
    image: 'https://picsum.photos/seed/data/600/400',
    data_ai_hint: 'data science',
    icon: BarChart3,
    slug: 'data-science-machine-learning',
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing with AWS',
    description: 'Understand cloud architecture and services on AWS, including EC2, S3, and Lambda.',
    category: 'Cloud',
    image: 'https://picsum.photos/seed/cloud/600/400',
    data_ai_hint: 'cloud computing',
    icon: Cloud,
    slug: 'cloud-computing-aws',
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development (React Native)',
    description: 'Build cross-platform mobile apps for iOS and Android using React Native.',
    category: 'Mobile Development',
    image: 'https://picsum.photos/seed/mobile/600/400',
    data_ai_hint: 'mobile development',
    icon: Code, // Could be Smartphone icon if available
    slug: 'mobile-app-development-react-native',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design.',
    category: 'Design',
    image: 'https://picsum.photos/seed/design/600/400',
    data_ai_hint: 'ui design',
    icon: Palette,
    slug: 'ui-ux-design-fundamentals',
  },
  {
    id: 'database-management',
    title: 'Database Management & SQL',
    description: 'Master SQL and learn to design, manage, and query relational databases.',
    category: 'Databases',
    image: 'https://picsum.photos/seed/db/600/400',
    data_ai_hint: 'database management',
    icon: Database,
    slug: 'database-management-sql',
  },
  {
    id: 'devops-interview-prep',
    title: 'DevOps Interview Prep',
    description: 'Prepare for your next DevOps interview with common questions covering Kubernetes, Docker, AWS, Terraform, and more.',
    category: 'DevOps',
    image: 'https://picsum.photos/seed/devops-prep/600/400',
    data_ai_hint: 'devops interview',
    icon: Server, // Using Server icon for DevOps
    slug: 'devops-interview-prep',
  },
];
