import type { RawVideoItem, VideoItem } from '../types/video';

export const calculateMetrics = (video: RawVideoItem): VideoItem => {
  const outlierRaw = video.views / Math.max(1, video.channelAvgViews || 5000);
  const outlierScore = Number(outlierRaw.toFixed(1));
  const engagementRate = Number(
    (((video.likes + video.comments) / Math.max(1, video.views)) * 100).toFixed(1)
  );
  const viewsPerSub = Number(
    (video.views / Math.max(1, video.channelSubs)).toFixed(1)
  );

  return {
    ...video,
    outlierScore,
    engagementRate,
    viewsPerSub,
  };
};
