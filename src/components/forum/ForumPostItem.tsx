// src/components/forum/ForumPostItem.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

import type { ForumPost } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, CornerUpLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ForumPostItemProps {
  post: ForumPost;
}

export function ForumPostItem({ post }: ForumPostItemProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start space-x-4 p-4 pb-2">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={post.userAvatar} alt={post.userName} data-ai-hint="person avatar" />
          <AvatarFallback>{post.userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-foreground">{post.userName}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
          {/* User title/role can be added here if available */}
          {/* <p className="text-xs text-muted-foreground">Member</p> */}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm text-foreground/90">
        {/* In a real app, this would render Markdown or rich text */}
        <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t flex items-center justify-start space-x-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <ThumbsUp className="h-4 w-4 mr-1.5" /> Like (0)
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <CornerUpLeft className="h-4 w-4 mr-1.5" /> Reply
        </Button>
      </CardFooter>
    </Card>
  );
}
