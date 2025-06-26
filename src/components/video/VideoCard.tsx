// src/components/video/VideoCard.tsx
import type { Video } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
    const youtubeVideoId = video.platform_urls?.youtube?.split('/').pop();

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0 relative bg-black">
        {youtubeVideoId ? (
            <iframe
                className="aspect-video w-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&controls=0&autoplay=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        ) : (
             <div className="aspect-video w-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Video Preview Unavailable</p>
             </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug">
          {video.title}
        </CardTitle>
         <p className="text-xs text-muted-foreground mt-2">
            Published {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex flex-wrap gap-1">
        {video.tags?.slice(0, 4).map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
