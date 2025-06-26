// src/app/api/cron/daily-video-generation/route.ts
import { NextResponse } from 'next/server';
import { triggerDailyVideoGeneration } from '@/app/actions/video';

export async function POST(request: Request) {
  // IMPORTANT: Secure this endpoint in production!
  // This is a simple bearer token authentication.
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const result = await triggerDailyVideoGeneration();
    return NextResponse.json({
        message: "Daily video generation job completed.",
        ...result
    });
  } catch (error: any) {
    console.error('Cron job failed:', error);
    return new NextResponse(error.message || 'Internal Server Error', { status: 500 });
  }
}
