
// src/app/forum/page.tsx
import { ForumTopicItem } from "@/components/forum/ForumTopicItem";
import { forumTopics as allTopics } from "@/data/forum";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";

export default function ForumPage() {
  // In a real app, topics might be fetched and paginated
  const topics = allTopics;

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Community Forum</h1>
          <p className="text-lg text-muted-foreground mt-1">
            Connect, learn, and share with fellow tech enthusiasts.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {/* This button would likely go to a page or open a modal to create a new topic */}
          <Button asChild className="shadow-sm">
            <Link href="/forum/new-topic"> {/* Placeholder link */}
              <PlusCircle className="mr-2 h-5 w-5" /> New Topic
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search topics..." 
            className="pl-10 w-full md:w-1/2 lg:w-1/3 rounded-full shadow-sm"
          />
        </div>
      </div>

      {topics.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map(topic => (
            <ForumTopicItem key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">
          No forum topics available yet. Be the first to create one!
        </p>
      )}
    </div>
  );
}
