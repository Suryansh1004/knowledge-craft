// src/components/blog/RelatedBlogs.tsx
import { suggestRelatedBlogs } from '@/ai/flows/suggest-related-blogs'; // Assuming the path is correct
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface RelatedBlogsProps {
  currentBlogContent: string;
  currentBlogId: string; // To filter out the current blog from suggestions if needed
  courseSlug: string; // To construct links
  allBlogsForCourse: Array<{ id: string; slug: string; title: string }>; // For linking
}

export async function RelatedBlogs({ currentBlogContent, currentBlogId, courseSlug, allBlogsForCourse }: RelatedBlogsProps) {
  let relatedTitles: string[] = [];

  try {
    const result = await suggestRelatedBlogs({ currentBlogContent });
    relatedTitles = result.relatedBlogTitles;
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    // Optionally, display a message or fallback content
  }

  if (!relatedTitles || relatedTitles.length === 0) {
    return null; // Or some fallback UI
  }
  
  // Map titles to actual blog objects for linking
  const relatedBlogLinks = relatedTitles.map(title => {
    const foundBlog = allBlogsForCourse.find(b => b.title.toLowerCase() === title.toLowerCase() && b.id !== currentBlogId);
    return foundBlog ? { title, slug: foundBlog.slug } : { title, slug: null };
  }).filter(b => b.slug); // Filter out blogs not found or current blog


  if (relatedBlogLinks.length === 0) {
     return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-primary">
            <Lightbulb className="mr-2 h-5 w-5" />
            Explore More
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No direct matches found for AI suggestions. Explore other blogs in this course!</p>
           <ul className="mt-3 space-y-2">
            {allBlogsForCourse.slice(0,3).filter(b => b.id !== currentBlogId).map(blog => (
               <li key={blog.id}>
                <Link href={`/courses/${courseSlug}/blog/${blog.slug}`} className="text-sm text-accent hover:underline flex items-center">
                  {blog.title}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </li>
            ))}
           </ul>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-primary">
          <Lightbulb className="mr-2 h-5 w-5" />
          Related Reads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {relatedBlogLinks.map((blog, index) => (
            <li key={index}>
              <Link href={`/courses/${courseSlug}/blog/${blog.slug!}`} className="text-sm text-accent hover:underline flex items-center">
                {blog.title}
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}