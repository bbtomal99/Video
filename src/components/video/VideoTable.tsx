import React from 'react';
import { Flame } from 'lucide-react';
import type { VideoItem } from '../../types/video';
import { formatNumber, getRelativeTime, getOutlierBadgeStyle } from '../../utils/formatters';

interface VideoTableProps {
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
}

export const VideoTable: React.FC<VideoTableProps> = ({ videos, onSelectVideo }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/60">
              <th className="py-3.5 px-4">Video & Channel</th>
              <th className="py-3.5 px-4">Total Views</th>
              <th className="py-3.5 px-4">VPH (Velocity)</th>
              <th className="py-3.5 px-4">Outlier Score</th>
              <th className="py-3.5 px-4">Subs</th>
              <th className="py-3.5 px-4">Engagement</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-sm">
            {videos.map((video, idx) => (
              <tr
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className="hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 max-w-md">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 w-5">
                      #{idx + 1}
                    </span>
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="w-24 h-14 object-cover rounded-lg shrink-0 border border-slate-800"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-100 line-clamp-1 hover:text-cyan-400">
                        {video.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {video.channelName} • {getRelativeTime(video.publishedAt)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-bold text-white">
                  {formatNumber(video.views)}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold text-xs">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    {formatNumber(video.vph)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${getOutlierBadgeStyle(
                      video.outlierScore
                    )}`}
                  >
                    {video.outlierScore}x
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300 text-xs">
                  {formatNumber(video.channelSubs)}
                </td>
                <td className="py-3 px-4 text-emerald-400 font-semibold text-xs">
                  {video.engagementRate}%
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-xs font-medium transition-colors">
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
