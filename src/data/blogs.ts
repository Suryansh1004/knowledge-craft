
// src/data/blogs.ts
import type { Blog } from '@/types';

const newAuthorName = "Suryansh Tripathi";
const newAuthorImage = "https://placehold.co/50x50/64B5F6/FFFFFF?text=ST"; // Primary color bg, white text for "ST"

export const blogs: Blog[] = [
  // Web Development Blogs
  {
    id: 'web-intro-react',
    courseId: 'web-development',
    slug: 'intro-to-react-hooks',
    title: 'Understanding React Hooks: A Beginner\'s Guide',
    content: '## What are React Hooks?\n\nReact Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes. \n\n### useState\n\nThe `useState` hook is used to add state to functional components. \n\n```javascript\nimport React, { useState } from \'react\';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n### useEffect\n\nThe `useEffect` hook lets you perform side effects in function components. Data fetching, subscriptions, or manually changing the DOM in React components are all examples of side effects. \n\nThis is a deep dive into React Hooks. We cover useState, useEffect, useContext, and custom hooks. Essential for modern React development.',
    author: newAuthorName,
    authorImage: newAuthorImage,
    createdAt: new Date('2023-05-15T10:00:00Z'),
    excerpt: 'A deep dive into React Hooks. We cover useState, useEffect, useContext, and custom hooks. Essential for modern React development.',
    tags: ['React', 'JavaScript', 'Frontend'],
    image: 'https://placehold.co/800x400/64B5F6/FFFFFF?text=React+Hooks',
    data_ai_hint: 'coding react',
  },
  {
    id: 'web-nodejs-basics',
    courseId: 'web-development',
    slug: 'nodejs-backend-basics',
    title: 'Building Your First Node.js Backend Server',
    content: '### Setting up Node.js\n\nFirst, ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).\n\n### Creating a simple HTTP server\n\nNode.js has a built-in HTTP module that allows Node.js to transfer data over the HyperText Transfer Protocol (HTTP).\n\n```javascript\nconst http = require(\'http\');\n\nconst hostname = \'127.0.0.1\';\nconst port = 3000;\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader(\'Content-Type\', \'text/plain\');\n  res.end(\'Hello World\\n\');\n});\n\nserver.listen(port, hostname, () => {\n  console.log(`Server running at http://${hostname}:${port}/`);\n});\n```\n\nLearn the fundamentals of Node.js for backend development. This post covers setting up a server, handling requests, and working with Express.js.',
    author: newAuthorName,
    authorImage: newAuthorImage,
    createdAt: new Date('2023-06-02T14:30:00Z'),
    excerpt: 'Learn the fundamentals of Node.js for backend development, including Express.js.',
    tags: ['Node.js', 'Backend', 'JavaScript', 'Express'],
    image: 'https://placehold.co/800x400/AED581/33691E?text=Node.js+Server',
    data_ai_hint: 'server code',
  },
  // Data Science Blogs
  {
    id: 'ds-python-pandas',
    courseId: 'data-science',
    slug: 'python-pandas-for-data-analysis',
    title: 'Data Analysis with Python and Pandas',
    content: 'Explore the power of Pandas for data manipulation and analysis in Python. Covers DataFrames, Series, and common operations.',
    author: newAuthorName,
    authorImage: newAuthorImage,
    createdAt: new Date('2023-07-10T09:00:00Z'),
    excerpt: 'Explore the power of Pandas for data manipulation and analysis in Python.',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    image: 'https://placehold.co/800x400/4DD0E1/FFFFFF?text=Python+Pandas',
    data_ai_hint: 'data charts',
  },
  {
    id: 'ds-ml-intro',
    courseId: 'data-science',
    slug: 'introduction-to-machine-learning-concepts',
    title: 'Core Concepts of Machine Learning',
    content: 'A high-level overview of machine learning, including supervised vs. unsupervised learning, common algorithms, and model evaluation.',
    author: newAuthorName,
    authorImage: newAuthorImage,
    createdAt: new Date('2023-08-01T11:00:00Z'),
    excerpt: 'A high-level overview of machine learning concepts and algorithms.',
    tags: ['Machine Learning', 'AI', 'Data Science'],
    image: 'https://placehold.co/800x400/FF8A65/D84315?text=Machine+Learning',
    data_ai_hint: 'artificial intelligence',
  },
  // Cloud Computing Blogs
  {
    id: 'cloud-aws-ec2',
    courseId: 'cloud-computing',
    slug: 'getting-started-with-aws-ec2',
    title: 'Getting Started with AWS EC2 Instances',
    content: 'Learn how to launch, configure, and manage your first EC2 instance on Amazon Web Services.',
    author: newAuthorName,
    authorImage: newAuthorImage,
    createdAt: new Date('2023-09-05T16:00:00Z'),
    excerpt: 'Learn how to launch, configure, and manage your first EC2 instance on AWS.',
    tags: ['AWS', 'EC2', 'Cloud Computing'],
    image: 'https://placehold.co/800x400/FFCA28/333333?text=AWS+EC2',
    data_ai_hint: 'cloud servers',
  },
  // New Blog 1
  {
    id: 'web-advanced-css',
    courseId: 'web-development',
    slug: 'advanced-css-techniques-for-modern-layouts',
    title: 'Mastering Advanced CSS: Flexbox, Grid, and Beyond',
    content: "## CSS Layouts: Flexbox vs. Grid\n\nUnderstanding when to use Flexbox and when to use CSS Grid is key for modern web layouts. Flexbox is ideal for one-dimensional layouts (rows or columns), while Grid excels at two-dimensional layouts.\n\n### Custom Properties (CSS Variables)\n\nCSS Custom Properties allow you to define reusable values throughout your stylesheets, making theming and maintenance much easier.\n\n```css\n:root {\n  --primary-color: #3498db;\n  --secondary-color: #2ecc71;\n}\n\n.button {\n  background-color: var(--primary-color);\n  color: white;\n}\n```\n\nThis post explores modern CSS features like Flexbox, Grid, Custom Properties, and responsive design techniques to create stunning and maintainable user interfaces.",
    author: newAuthorName,
    authorImage: newAuthorImage,
    createdAt: new Date('2024-01-15T11:00:00Z'),
    excerpt: "Explore modern CSS features like Flexbox, Grid, Custom Properties, and responsive design techniques for stunning UIs.",
    tags: ['CSS', 'Flexbox', 'Grid', 'Frontend', 'Responsive Design'],
    image: 'https://placehold.co/800x400/7986CB/FFFFFF?text=Advanced+CSS',
    data_ai_hint: 'css code',
  },
  // New Blog 2
  {
    id: 'ai-intro-genkit',
    courseId: 'data-science', // Or a new 'AI Development' course if it existed
    slug: 'getting-started-with-genkit-for-ai-applications',
    title: 'Building AI-Powered Apps with Genkit: A Primer',
    content: "## What is Genkit?\n\nGenkit is a powerful open-source framework from Google, designed to simplify the development of AI-powered applications. It provides tools and abstractions for working with large language models (LLMs), managing prompts, defining flows, and integrating external tools.\n\n### Key Features:\n\n*   **Model Agnostic:** Easily switch between different LLMs (like Gemini).\n*   **Flows:** Define complex AI workflows with multiple steps.\n*   **Prompt Management:** Organize and version your prompts effectively.\n*   **Tool Use (Function Calling):** Allow your AI models to interact with external systems.\n\n```typescript\n// Example of a simple Genkit flow (conceptual)\nimport { ai } from '@/ai/genkit';\nimport { z } from 'genkit';\n\nconst greetFlow = ai.defineFlow(\n  {\n    name: 'greetFlow',\n    inputSchema: z.object({ name: z.string() }),\n    outputSchema: z.object({ greeting: z.string() }),\n  },\n  async (input) => {\n    const prompt = `Greet ${input.name}.`;\n    const llmResponse = await ai.generate({ prompt });\n    return { greeting: llmResponse.text };\n  }\n);\n```\n\nDive into Genkit and learn how to build sophisticated AI applications by leveraging its core concepts. We cover setting up Genkit, creating basic flows, and understanding its potential.",
    author: newAuthorName,
    authorImage: newAuthorImage,
    createdAt: new Date('2024-02-01T09:30:00Z'),
    excerpt: "Dive into Genkit, Google's open-source framework for building AI-powered applications. Learn about flows, prompt management, and more.",
    tags: ['Genkit', 'AI', 'LLM', 'Generative AI', 'JavaScript', 'TypeScript'],
    image: 'https://placehold.co/800x400/4DB6AC/FFFFFF?text=Genkit+AI',
    data_ai_hint: 'ai development',
  },
];
