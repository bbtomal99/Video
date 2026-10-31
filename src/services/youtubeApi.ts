import type { VideoItem } from '../types/video';
import { calculateMetrics } from '../utils/metrics';
import { parseISO8601Duration } from '../utils/formatters';

interface YouTubeSearchItem {
  id: {
    videoId?: string;
  };
}

interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    channelId: string;
    publishedAt: string;
    thumbnails?: {
      high?: { url: string };
      medium?: { url: string };
    };
    tags?: string[];
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
  contentDetails?: {
    duration?: string;
  };
}

interface YouTubeChannelItem {
  id: string;
  statistics: {
    subscriberCount?: string;
    viewCount?: string;
    videoCount?: string;
  };
}

export const fetchYouTubeVideos = async (
  apiKey: string,
  searchTopic: string,
  regionCode: string = 'BD'
): Promise<VideoItem[]> => {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    throw new Error('অনুগ্রহ করে আপনার বৈধ YouTube Data API v3 Key প্রদান করুন।');
  }

  const queryToUse = searchTopic.trim() || 'Bangla Tutorial';
  const publishedAfterDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // 1. Search Top Viewed Videos
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    queryToUse
  )}&type=video&order=viewCount&maxResults=12&publishedAfter=${publishedAfterDate}${
    regionCode !== 'ALL' ? `&regionCode=${regionCode}` : ''
  }&key=${cleanKey}`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  if (searchData.error) {
    throw new Error(searchData.error.message || 'YouTube API Error');
  }

  const items: YouTubeSearchItem[] = searchData.items || [];
  const videoIds = items
    .map((item) => item.id.videoId)
    .filter((id): id is string => Boolean(id))
    .join(',');

  if (!videoIds) {
    throw new Error('এই কীওয়ার্ডে কোনো ভিডিও পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।');
  }

  // 2. Fetch Video Statistics & Content Details
  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${cleanKey}`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();
  const videoDetails: YouTubeVideoItem[] = detailsData.items || [];

  // 3. Fetch Channel Statistics for Subscriber & Avg View estimation
  const channelIds = [
    ...new Set(videoDetails.map((v) => v.snippet.channelId)),
  ].join(',');

  const channelMap: Record<string, { subs: number; avgViews: number }> = {};
  if (channelIds) {
    const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}&key=${cleanKey}`;
    const channelsRes = await fetch(channelsUrl);
    const channelsData = await channelsRes.json();
    const channels: YouTubeChannelItem[] = channelsData.items || [];

    channels.forEach((ch) => {
      const subs = parseInt(ch.statistics.subscriberCount || '5000', 10);
      const totalViews = parseInt(ch.statistics.viewCount || '100000', 10);
      const videoCount = Math.max(1, parseInt(ch.statistics.videoCount || '20', 10));
      channelMap[ch.id] = {
        subs,
        avgViews: Math.max(500, Math.round(totalViews / videoCount)),
      };
    });
  }

  // 4. Transform into vidIQ Most Viewed format
  const transformed: VideoItem[] = videoDetails.map((item) => {
    const views = parseInt(item.statistics.viewCount || '0', 10);
    const likes = parseInt(item.statistics.likeCount || '0', 10);
    const comments = parseInt(item.statistics.commentCount || '0', 10);
    const publishedAt = item.snippet.publishedAt;
    const hoursSincePublished = Math.max(
      1,
      (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60)
    );
    const vph = Math.max(1, Math.round(views / hoursSincePublished));
    const chInfo = channelMap[item.snippet.channelId] || {
      subs: 10000,
      avgViews: Math.round(views / 3.5),
    };
    const { formatted, isShort } = parseISO8601Duration(
      item.contentDetails?.duration
    );

    return calculateMetrics({
      id: item.id,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      channelSubs: chInfo.subs,
      channelAvgViews: chInfo.avgViews,
      views,
      vph,
      likes,
      comments,
      publishedAt,
      duration: formatted,
      isShort,
      category: queryToUse,
      region: regionCode,
      thumbnail:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
      tags: item.snippet.tags?.slice(0, 8) || [
        queryToUse,
        'YouTube Viral',
        'Trending Video',
        'Most Viewed',
      ],
      vphHistory: [
        { hour: '0h', vph: Math.round(vph * 0.4) },
        { hour: '6h', vph: Math.round(vph * 0.75) },
        { hour: '12h', vph: Math.round(vph * 1.15) },
        { hour: '24h', vph: Math.round(vph * 1.08) },
        { hour: 'Now', vph },
      ],
    });
  });

  return transformed;
};
