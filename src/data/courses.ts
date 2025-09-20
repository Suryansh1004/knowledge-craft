import { Course } from "@/types";
import { blogs } from "./blogs";
import placeholderImages from "@/lib/placeholder-images.json";

const getImageForSlug = (slug: string) => {
  const image = placeholderImages.find(p => p.slug === slug);
  return image ? { imageUrl: image.imageUrl, data_ai_hint: image.data_ai_hint } : { imageUrl: 'https://picsum.photos/seed/placeholder/600/400', data_ai_hint: 'placeholder image' };
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Web Development Basics",
    slug: "web-development-basics",
    description: "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
    duration: "4 weeks",
    rating: 4.5,
    ...getImageForSlug("web-development-basics"),
    lessons: [
      { id: 1, title: "Introduction to HTML", slug: "intro-to-html", content: "Learn the basic structure of HTML." },
      { id: 2, title: "Styling with CSS", slug: "styling-with-css", content: "Discover how to style your web pages with CSS." },
    ],
    blogs: blogs.filter(b => b.id < 3),
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    slug: "advanced-javascript",
    description: "Deep dive into advanced JavaScript concepts like closures, promises, and async/await.",
    duration: "6 weeks",
    rating: 4.8,
    ...getImageForSlug("advanced-javascript"),
    lessons: [
      { id: 1, title: "Understanding Closures", slug: "understanding-closures", content: "Explore the concept of closures in JavaScript." },
      { id: 2, title: "Asynchronous JavaScript", slug: "asynchronous-javascript", content: "Master promises and async/await." },
    ],
    blogs: [],
  },
  {
    id: 3,
    title: "React for Beginners",
    slug: "react-for-beginners",
    description: "Get started with React, the popular JavaScript library for building user interfaces.",
    duration: "5 weeks",
    rating: 4.7,
    ...getImageForSlug("react-for-beginners"),
    lessons: [
        { id: 1, title: "Components and Props", slug: "components-and-props", content: "Learn about React components and how to pass data with props." },
        { id: 2, title: "State and Lifecycle", slug: "state-and-lifecycle", content: "Understand component state and lifecycle methods." },
    ],
    blogs: [],
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    slug: "data-structures-and-algorithms",
    description: "Strengthen your problem-solving skills by learning key data structures and algorithms.",
    duration: "8 weeks",
    rating: 4.9,
    ...getImageForSlug("data-structures-and-algorithms"),
    lessons: [
        {id: 1, title: "Arrays and Strings", slug: "arrays-and-strings", content: "Master manipulation of arrays and strings."},
    ],
    blogs: [],
  },
  {
    id: 5,
    title: "UX Design Fundamentals",
    slug: "ux-design-fundamentals",
    description: "Discover the principles of creating intuitive and user-friendly digital products.",
    duration: "4 weeks",
    rating: 4.6,
    ...getImageForSlug("ux-design-fundamentals"),
    lessons: [],
    blogs: [],
  },
  {
    id: 6,
    title: "Introduction to Machine Learning",
    slug: "machine-learning-introduction",
    description: "A beginner-friendly introduction to the world of machine learning and AI.",
    duration: "10 weeks",
    rating: 4.8,
    ...getImageForSlug("machine-learning-introduction"),
    lessons: [],
    blogs: [],
  },
];
