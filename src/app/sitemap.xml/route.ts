
// src/app/sitemap.xml/route.ts
import { blogs } from '@/data/blogs';

// IMPORTANT: Replace this with your actual website domain
const URL = 'https://knowledgecraft.com';

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static Pages -->
     <url><loc>${URL}</loc></url>
     <url><loc>${URL}/blog</loc></url>
     
     <!-- Dynamic Blog Post Pages -->
     ${blogs
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${URL}/blog/${slug}`}</loc>
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
