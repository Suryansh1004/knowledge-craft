// src/components/forum/ForumTopicItem.tsx
import Link from 'next/link';
import type { ForumTopic } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ForumTopicItemProps {
  topic: ForumTopic;
}

export function ForumTopicItem({ topic }: ForumTopicItemProps) {
  const IconComponent = topic.icon;
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        {IconComponent && <IconComponent className="h-8 w-8 text-primary mt-1" />}
        <div className="flex-1">
          <Link href={`/forum/${topic.slug}`}>
            <CardTitle className="text-xl text-foreground hover:text-primary transition-colors">{topic.title}</CardTitle>
          </Link>
          <CardDescription className="text-sm mt-1 line-clamp-2">{topic.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between text-xs text-muted-foreground pt-2">
        <div className="flex items-center">
          <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
          {topic.postCount || 0} posts
        </div>
        {topic.lastActivity && (
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            Last activity {formatDistanceToNow(new Date(topic.lastActivity), { addSuffix: true })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
