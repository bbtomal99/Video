import React from 'react';
import type { VideoItem } from '../../types/video';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: VideoItem[];
  savedVideos: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectVideo: (video: VideoItem) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  savedVideos,
  onToggleSave,
  onSelectVideo,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          rank={index + 1}
          isSaved={savedVideos.includes(video.id)}
          onToggleSave={onToggleSave}
          onSelect={onSelectVideo}
        />
      ))}
    </div>
  );
};
