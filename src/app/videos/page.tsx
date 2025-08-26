
// src/app/videos/page.tsx
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Video } from '@/types';
import { VideoCard } from '@/components/video/VideoCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Knowledge Craft Shorts | AI-Generated Tech Videos',
  description: 'Watch short, informative, AI-generated videos on the latest in tech, science, and programming. Complex topics simplified in under 60 seconds.',
};

// We make this dynamic to ensure it refetches data on revalidation
export const dynamic = 'force-dynamic';

async function getVideos(): Promise<Video[]> {
  try {
    const videosRef = collection(db, 'videos');
    const q = query(
      videosRef,
      where('displayOnWebsite', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(20)
    );

    const querySnapshot = await getDocs(q);
    const videos = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore Timestamps to serializable format (ISO string)
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
        publishedAt: (data.publishedAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
      } as Video;
    });

    return videos;
  } catch (error) {
    console.error("Error fetching videos from Firestore:", error);
    return [];
  }
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">KnowledgeCraft Shorts</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Complex topics, simplified. Watch our latest AI-generated videos on tech, science, and more.
        </p>
      </div>

      {videos.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold text-foreground">No Videos Yet</h2>
          <p className="mt-2 text-muted-foreground">
            Our video team is hard at work. Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  );
}
