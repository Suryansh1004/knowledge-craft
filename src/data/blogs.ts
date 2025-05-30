
// src/data/blogs.ts
import type { Blog } from '@/types';

const newAuthorName = "Suryansh Tripathi";
const newAuthorImage = "https://placehold.co/50x50.png"; 

export const blogs: Blog[] = [
  // Web Development Blogs
  {
    id: 'web-intro-react',
    courseId: 'web-development',
    slug: 'intro-to-react-hooks',
    title: 'Understanding React Hooks: A Beginner\'s Guide',
    content: '## What are React Hooks?\n\nReact Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes. \n\n### useState\n\nThe `useState` hook is used to add state to functional components. \n\n```javascript\nimport React, { useState } from \'react\';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n### useEffect\n\nThe `useEffect` hook lets you perform side effects in function components. Data fetching, subscriptions, or manually changing the DOM in React components are all examples of side effects. \n\nThis is a deep dive into React Hooks. We cover useState, useEffect, useContext, and custom hooks. Essential for modern React development.',
    author: newAuthorName,
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2023-05-15T10:00:00Z'),
    excerpt: 'A deep dive into React Hooks. We cover useState, useEffect, useContext, and custom hooks. Essential for modern React development.',
    tags: ['React', 'JavaScript', 'Frontend'],
    image: 'https://placehold.co/800x400.png',
    data_ai_hint: 'coding react',
  },
  {
    id: 'web-nodejs-basics',
    courseId: 'web-development',
    slug: 'nodejs-backend-basics',
    title: 'Building Your First Node.js Backend Server',
    content: '### Setting up Node.js\n\nFirst, ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).\n\n### Creating a simple HTTP server\n\nNode.js has a built-in HTTP module that allows Node.js to transfer data over the HyperText Transfer Protocol (HTTP).\n\n```javascript\nconst http = require(\'http\');\n\nconst hostname = \'127.0.0.1\';\nconst port = 3000;\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader(\'Content-Type\', \'text/plain\');\n  res.end(\'Hello World\\n\');\n});\n\nserver.listen(port, hostname, () => {\n  console.log(`Server running at http://${hostname}:${port}/`);\n});\n```\n\nLearn the fundamentals of Node.js for backend development. This post covers setting up a server, handling requests, and working with Express.js.',
    author: newAuthorName,
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2023-06-02T14:30:00Z'),
    excerpt: 'Learn the fundamentals of Node.js for backend development, including Express.js.',
    tags: ['Node.js', 'Backend', 'JavaScript', 'Express'],
    image: 'https://placehold.co/800x400.png',
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
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2023-07-10T09:00:00Z'),
    excerpt: 'Explore the power of Pandas for data manipulation and analysis in Python.',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    image: 'https://placehold.co/800x400.png',
    data_ai_hint: 'data charts',
  },
  {
    id: 'ds-ml-intro',
    courseId: 'data-science',
    slug: 'introduction-to-machine-learning-concepts',
    title: 'Core Concepts of Machine Learning',
    content: 'A high-level overview of machine learning, including supervised vs. unsupervised learning, common algorithms, and model evaluation.',
    author: newAuthorName,
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2023-08-01T11:00:00Z'),
    excerpt: 'A high-level overview of machine learning concepts and algorithms.',
    tags: ['Machine Learning', 'AI', 'Data Science'],
    image: 'https://placehold.co/800x400.png',
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
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2023-09-05T16:00:00Z'),
    excerpt: 'Learn how to launch, configure, and manage your first EC2 instance on AWS.',
    tags: ['AWS', 'EC2', 'Cloud Computing'],
    image: 'https://placehold.co/800x400.png',
    data_ai_hint: 'cloud servers',
  },
  {
    id: 'cloud-blue-green-virtual-service',
    courseId: 'cloud-computing',
    slug: 'blue-green-deployment-aws-virtual-services',
    title: 'Seamless Releases: Blue-Green Deployment on AWS with Virtual Services',
    content: `## What is Blue-Green Deployment?\n\nBlue-Green deployment is a strategy for releasing software updates with minimal downtime and risk. It involves maintaining two identical production environments, traditionally named "Blue" (the current live version) and "Green" (the new version). Once the Green environment is ready and tested, live traffic is switched from Blue to Green. If any issues arise with the Green environment, traffic can be quickly reverted to the Blue environment.\n\n**Benefits include:**\n- Near-zero downtime deployments.\n- Rapid rollback capability.\n- Reduced risk associated with new releases.\n- Ability to test the new version with production-like traffic before full cutover.\n\n## Why Use Blue-Green on AWS?\n\nAWS provides a robust and flexible infrastructure that is well-suited for implementing Blue-Green deployments. Services like Elastic Load Balancing (ELB), Auto Scaling, Route 53, AWS App Mesh, and CodeDeploy offer various mechanisms to manage two separate environments and control traffic flow.\n\n## The Role of Virtual Services in Traffic Routing\n\nWhile "Virtual Service" isn't a single, specific AWS service, the concept is crucial. It represents an abstraction layer that directs traffic to your application instances. In the context of AWS, this can be implemented using:\n\n-   **AWS App Mesh:** A service mesh that provides application-level networking, making it easy to define virtual services, virtual routers, and routes to control traffic between your microservices. You can update a virtual service to point to the new "Green" version of your application.\n-   **Application Load Balancer (ALB) Target Groups:** You can have two target groups, one for Blue and one for Green. The ALB listener can be updated to switch traffic, or you can use weighted target groups for a gradual shift.\n-   **Amazon Route 53:** DNS-based traffic shifting can be used, especially with weighted routing policies, to direct a percentage of traffic to the Green environment.\n\nThe "virtual service" concept allows you to decouple the traffic routing logic from the underlying infrastructure, making the switch seamless.\n\n## Core Steps in a Blue-Green Deployment on AWS:\n\n1.  **Provision the "Green" Environment:**\n    Deploy the new version of your application to a new, separate environment (e.g., a new set of EC2 instances, ECS tasks, a new Elastic Beanstalk environment, or a new Kubernetes deployment in EKS). This Green environment should be identical in configuration to the Blue (live) environment.\n\n2.  **Test the Green Environment:**\n    Thoroughly test the Green environment. This can include health checks, integration tests, performance tests, and even directing a small amount of internal or canary traffic to it.\n\n3.  **Traffic Shifting using Virtual Services (Conceptual):**\n    -   **Using AWS App Mesh:** Update the virtual service configuration to change the target of the route from the Blue version to the Green version.\n    -   **Using ALB:** Modify the listener rules on your ALB to point to the Green target group, or adjust weights if using weighted target groups.\n    -   **Using Route 53:** Update DNS records (e.g., CNAME or Alias records) to point to the Green environment's endpoint, or adjust weights in a weighted routing policy.\n    All user traffic is now directed to the Green environment. The Blue environment is still running but receives no live traffic.\n\n4.  **Monitor the Green Environment:**\n    Closely monitor the Green environment for any errors, performance issues, or unexpected behavior after it goes live.\n\n5.  **Decommission or Keep the "Blue" Environment:**\n    -   If the Green environment is stable, you can decommission the Blue environment to save costs.\n    -   Alternatively, keep the Blue environment for a period as a quick rollback target if needed.\n\n## Example Scenario:\n\nImagine a web application running on AWS ECS.\n-   **Blue:** The current version of your application tasks running in an ECS service, served by an ALB.\n-   **Green:** Deploy a new version of your application tasks as a separate ECS service.\n-   **Traffic Shift:** Update your AWS App Mesh virtual service to route 100% of traffic to the Green ECS service, or change your ALB's target group to point to the Green service.\n\n## Key AWS Services:\n\n-   **Amazon EC2/ECS/EKS/Elastic Beanstalk:** For running your application environments.\n-   **Application Load Balancer (ALB):** For distributing traffic and switching between target groups.\n-   **Amazon Route 53:** For DNS-level traffic management.\n-   **AWS App Mesh:** For fine-grained traffic control in microservice architectures.\n-   **AWS CodeDeploy:** Offers built-in Blue/Green deployment strategies for EC2, ECS, and Lambda.\n\n## Conclusion\n\nBlue-Green deployments, facilitated by traffic routing abstractions like virtual services on AWS, significantly reduce the risk and downtime associated with application releases. By carefully planning your environments and traffic management strategy, you can achieve smoother, more reliable updates.\n`,
    author: newAuthorName,
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2024-03-10T11:00:00Z'),
    excerpt: 'Learn how to implement Blue-Green deployments on AWS using virtual services for seamless traffic routing, minimizing downtime and risk for your applications.',
    tags: ['AWS', 'Blue-Green Deployment', 'DevOps', 'CI/CD', 'Virtual Services', 'Cloud Computing', 'App Mesh', 'Route 53', 'ALB'],
    image: 'https://placehold.co/800x400.png',
    data_ai_hint: 'deployment strategy',
  },
  // New Blog 1
  {
    id: 'web-advanced-css',
    courseId: 'web-development',
    slug: 'advanced-css-techniques-for-modern-layouts',
    title: 'Mastering Advanced CSS: Flexbox, Grid, and Beyond',
    content: "## CSS Layouts: Flexbox vs. Grid\n\nUnderstanding when to use Flexbox and when to use CSS Grid is key for modern web layouts. Flexbox is ideal for one-dimensional layouts (rows or columns), while Grid excels at two-dimensional layouts.\n\n### Custom Properties (CSS Variables)\n\nCSS Custom Properties allow you to define reusable values throughout your stylesheets, making theming and maintenance much easier.\n\n```css\n:root {\n  --primary-color: #3498db;\n  --secondary-color: #2ecc71;\n}\n\n.button {\n  background-color: var(--primary-color);\n  color: white;\n}\n```\n\nThis post explores modern CSS features like Flexbox, Grid, Custom Properties, and responsive design techniques to create stunning and maintainable user interfaces.",
    author: newAuthorName,
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2024-01-15T11:00:00Z'),
    excerpt: "Explore modern CSS features like Flexbox, Grid, Custom Properties, and responsive design techniques for stunning UIs.",
    tags: ['CSS', 'Flexbox', 'Grid', 'Frontend', 'Responsive Design'],
    image: 'https://placehold.co/800x400.png',
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
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2024-02-01T09:30:00Z'),
    excerpt: "Dive into Genkit, Google's open-source framework for building AI-powered applications. Learn about flows, prompt management, and more.",
    tags: ['Genkit', 'AI', 'LLM', 'Generative AI', 'JavaScript', 'TypeScript'],
    image: 'https://placehold.co/800x400.png',
    data_ai_hint: 'ai development',
  },
  {
    id: 'devops-interview-q1',
    courseId: 'devops-interview-prep',
    slug: 'devops-interview-questions-real-world',
    title: 'Ace Your DevOps Interview: Common Questions from Real Interviews',
    content: `
## Preparing for a DevOps Interview?

This guide covers a range of questions encountered in real-world DevOps interviews, spanning Linux, Kubernetes, Docker, AWS, Terraform, Git, and Networking.

---

### Round 1: Online Assessment (At the Office)

The initial round was an online assessment of multiple choice and multiple selection questions. It covered:
*   Linux Commands and scripting
*   Network Security & Protocols
*   Git Development Strategies
*   Deployment & Rollout Strategies

---

### 💻 Round 2: Technical Interview - 1

Key Questions Asked:

*   Introduce yourself.
*   What is a Kubernetes Operator?
*   What is a Custom Resource Definition (CRD)?
*   What is a Custom Controller?
*   Explain Operator architecture and how it works.
*   What are API groups in Kubernetes?
*   What is etcd?
*   Explain the OSI model layers and their significance.
*   What’s the difference between HTTP and HTTPS?
    <p><strong>Answer:</strong> HTTP (Hypertext Transfer Protocol) is the foundation of data communication for the World Wide Web. It is an application protocol for distributed, collaborative, hypermedia information systems. HTTPS (HTTP Secure) is an extension of HTTP. It is used for secure communication over a computer network and is widely used on the Internet. HTTPS is encrypted using Transport Layer Security (TLS) or, formerly, Secure Sockets Layer (SSL), providing a secure channel over an insecure network. The main difference is that HTTPS encrypts the data being transferred, while HTTP sends it in plain text.</p>
*   What is DNS?
    <p><strong>Answer:</strong> DNS stands for Domain Name System. It's a hierarchical and decentralized naming system used to identify computers, services, and other resources reachable through the Internet or other Internet Protocol (IP) networks. Essentially, it translates human-readable domain names (like www.google.com) into machine-readable IP addresses (like 172.217.160.142). This allows users to access websites and online services using easy-to-remember names instead of numerical IP addresses.</p>
*   What happens when you hit www.hashedin.com in a browser?
*   What is recursive DNS?
*   Explain Git lifecycle from cloning a repo to pushing code.
*   What is Git architecture?
*   What is a kernel? Is Linux an OS or a kernel?
*   Write ten Linux commands and explain their usage.
*   Difference between virtualization and containerization.
*   Which Linux features help Docker work?
*   What is Docker daemon?
*   Explain Docker architecture & lifecycle.
*   Write five Docker commands and explain them.
*   Write a Jenkins pipeline that builds and pushes a Docker image.
*   What are namespaces in Kubernetes?
*   Write a Pod specification YAML file for an NGINX server.
*   What is VPC in AWS?
*   Difference between public and private subnets.
*   What are NAT Gateway and Internet Gateway?
*   Can a NAT Gateway be created inside a private subnet?
*   How do instances in private subnets access the internet?
*   Write and explain Terraform lifecycle commands.
*   What is a state file in Terraform?
*   How to manage state files in team collaboration?

---

### 💻 Round 3: Technical Interview – 2

Key Questions:

*   Write a simple Dockerfile to create a Docker image.
*   Explain Docker workflow.
*   Why is it essential to make etcd highly available in Kubernetes?
*   What happens when you hit a website URL?
*   What is an SSL certificate?
*   Explain the role of NAT in AWS.
*   Difference between S3 buckets and EBS volumes.
*   Amazon AMI vs Snapshot—what’s the difference?
*   Explain remote state locking in Terraform.
*   Difference between MySQL and MongoDB.
*   What is a relational database?
*   What’s a primary key in SQL?

---
    `,
    author: newAuthorName,
    authorImage: newAuthorImage, // Consistent placeholder
    createdAt: new Date('2024-05-29T14:00:00Z'),
    excerpt: 'A comprehensive list of DevOps interview questions covering Kubernetes, Docker, AWS, Terraform, Linux, Git, and Networking, based on real interview experiences.',
    tags: ['DevOps', 'Interview Questions', 'Kubernetes', 'Docker', 'AWS', 'Terraform', 'Linux', 'Git', 'Networking', 'CI/CD', 'Jenkins'],
    image: 'https://placehold.co/800x400.png',
    data_ai_hint: 'interview questions',
  },
];

    