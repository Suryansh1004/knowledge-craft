export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string;
  rating: number;
  imageUrl: string;
  data_ai_hint: string;
  lessons: Lesson[];
  blogs: Blog[];
}

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  content: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  data_ai_hint: string;
}
