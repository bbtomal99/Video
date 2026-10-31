import React from 'react';
import { Zap, Bookmark, Flame, ChevronRight } from 'lucide-react';
import type { VideoItem } from '../../types/video';
import { formatNumber, getRelativeTime, getOutlierBadgeStyle } from '../../utils/formatters';

interface VideoCardProps {
  video: VideoItem;
  rank: number;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelect: (video: VideoItem) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  rank,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(video)}
      className="group bg-slate-900/75 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-cyan-500/5"
    >
      <div>
        {/* Thumbnail Area */}
        <div className="relative aspect-video bg-slate-950 overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

          {/* Rank Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-950/85 text-white border border-slate-700 backdrop-blur-md">
              #{rank}
            </span>
            {/* Outlier Multiplier Pill */}
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md flex items-center gap-1 ${getOutlierBadgeStyle(
                video.outlierScore
              )}`}
              title="Outlier Score: Video Views divided by Channel Average Views"
            >
              <Zap className="w-3 h-3 fill-current" />
              {video.outlierScore}x Outlier
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleSave(video.id, e)}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-950/80 hover:bg-slate-900 flex items-center justify-center text-slate-300 border border-slate-700/80 transition-colors"
            title="Save Video Idea"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? 'fill-amber-400 text-amber-400' : ''
              }`}
            />
          </button>

          {/* VPH Live Badge */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-amber-500/95 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-lg">
            <Flame className="w-3.5 h-3.5 fill-slate-950" />
            <span>{formatNumber(video.vph)} VPH</span>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/90 text-slate-200 font-mono text-xs border border-slate-800">
            {video.isShort ? '📱 SHORTS' : video.duration}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {video.title}
          </h3>

          {/* Channel Info */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[11px] font-bold text-slate-950 shrink-0">
                {video.channelName.charAt(0)}
              </div>
              <span className="text-slate-300 font-medium truncate">
                {video.channelName}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] shrink-0">
              {formatNumber(video.channelSubs)} subs
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-800/70 space-y-2.5">
        <div className="grid grid-cols-3 gap-2 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/60 text-center">
          <div>
            <p className="text-[10px] text-slate-400 uppercase">Total Views</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
              {formatNumber(video.views)}
            </p>
          </div>
          <div className="border-x border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase">Ch. Avg Views</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
              {formatNumber(video.channelAvgViews)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase">Engagement</p>
            <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
              {video.engagementRate}%
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>📅 {getRelativeTime(video.publishedAt)}</span>
          <span className="text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            ট্যাগ ও অ্যানালিটিক্স <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
