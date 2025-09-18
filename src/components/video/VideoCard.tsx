// src/components/video/VideoCard.tsx
import type { Video } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
    const youtubeLink = video.platform_urls?.youtube;

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug">
          {youtubeLink ? (
             <Link href={youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <PlayCircle className="w-5 h-5 mr-2 text-primary" />
                {video.title}
             </Link>
          ) : (
             video.title
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {video.description}
        </p>
         <p className="text-xs text-muted-foreground mt-3">
            Published {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-wrap gap-1">
        {video.tags?.slice(0, 4).map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
