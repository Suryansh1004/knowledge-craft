// src/app/forum/[topicSlug]/page.tsx
import { forumTopics as allTopics, forumPosts as allPostsData } from "@/data/forum";
import type { ForumTopic, ForumPost } from "@/types";
import { notFound } from 'next/navigation';
import { ForumPostItem } from "@/components/forum/ForumPostItem";
import { CreatePostForm } from "@/components/forum/CreatePostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Metadata } from 'next';

interface ForumTopicPageProps {
  params: {
    topicSlug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Mock function to get topic by slug
async function getTopicBySlug(slug: string): Promise<ForumTopic | undefined> {
  return allTopics.find(topic => topic.slug === slug);
}

// Mock function to get posts by topic ID
async function getPostsByTopicId(topicId: string): Promise<ForumPost[]> {
  return allPostsData[topicId] || [];
}

export async function generateStaticParams() {
  return allTopics.map(topic => ({
    topicSlug: topic.slug,
  }));
}

export async function generateMetadata({ params }: ForumTopicPageProps): Promise<Metadata> {
  const topic = await getTopicBySlug(params.topicSlug);
  if (!topic) return { title: "Topic Not Found" };

  return {
    title: `${topic.title} | Knowledge Craft Forum`,
    description: topic.description,
  };
}

export default async function ForumTopicPage({ params }: ForumTopicPageProps) {
  const topic = await getTopicBySlug(params.topicSlug);

  if (!topic) {
    notFound();
  }

  const posts = await getPostsByTopicId(topic.id);
  const IconComponent = topic.icon;

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-6 shadow-sm">
          <Link href="/forum">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Topics
          </Link>
        </Button>
        <div className="flex items-start gap-3">
          {IconComponent && <IconComponent className="h-10 w-10 text-primary mt-1 flex-shrink-0" />}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">{topic.title}</h1>
            <p className="text-md text-muted-foreground mt-1">{topic.description}</p>
          </div>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map(post => (
            <ForumPostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <Alert className="shadow-md">
          <MessageSquare className="h-5 w-5 text-primary" />
          <AlertTitle className="font-semibold text-foreground">No Posts Yet!</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Be the first to contribute to this discussion.
          </AlertDescription>
        </Alert>
      )}
      
      {/* TODO: Add check if user is authenticated before showing CreatePostForm */}
      <CreatePostForm topicId={topic.id} />
    </div>
  );
}
