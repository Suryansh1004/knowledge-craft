// src/app/sitemap.xml/route.ts
import { courses } from '@/data/courses';
import { blogs } from '@/data/blogs';

// IMPORTANT: Replace this with your actual website domain
const URL = 'https://knowledgecraft.com';

function generateSiteMap() {
  const allBlogsWithCourse = blogs.map(blog => {
    const course = courses.find(c => c.id === blog.courseId);
    return { ...blog, courseSlug: course?.slug };
  }).filter(b => b.courseSlug); // Filter out blogs with no matching course

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static Pages -->
     <url><loc>${URL}</loc></url>
     <url><loc>${URL}/courses</loc></url>
     <url><loc>${URL}/blog</loc></url>
     <url><loc>${URL}/videos</loc></url>
     <url><loc>${URL}/coding-problems</loc></url>
     <url><loc>${URL}/forum</loc></url>
     <url><loc>${URL}/contact</loc></url>
     <url><loc>${URL}/faq</loc></url>
     
     <!-- Dynamic Course Pages -->
     ${courses
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${URL}/courses/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}

     <!-- Dynamic Blog Post Pages -->
     ${allBlogsWithCourse
       .map(({ slug, courseSlug }) => {
         return `
       <url>
           <loc>${`${URL}/courses/${courseSlug}/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

export async function GET() {
  const sitemap = generateSiteMap();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
