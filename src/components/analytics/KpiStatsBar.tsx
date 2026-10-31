import React from 'react';
import { Eye, Flame, TrendingUp, ThumbsUp, Video, Zap, Award } from 'lucide-react';
import type { KpiStats } from '../../types/video';
import { formatNumber } from '../../utils/formatters';

interface KpiStatsBarProps {
  stats: KpiStats;
  totalVideosCount: number;
}

export const KpiStatsBar: React.FC<KpiStatsBarProps> = ({ stats, totalVideosCount }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            মোট ফিল্টারকৃত ভিউ (Total Views)
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white mt-1">
            {formatNumber(stats.totalViews)}
          </p>
          <span className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1">
            <Video className="w-3 h-3" /> {totalVideosCount} টি ভিডিও পাওয়া গেছে
          </span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
          <Eye className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            গড় ভিউ প্রতি ঘণ্টায় (Avg VPH)
          </p>
          <p className="text-xl sm:text-2xl font-bold text-amber-400 mt-1">
            {formatNumber(stats.avgVph)}{' '}
            <span className="text-xs font-normal text-slate-400">/hr</span>
          </p>
          <span className="text-[11px] text-amber-300/80 flex items-center gap-1 mt-1">
            <Flame className="w-3 h-3 fill-amber-400" /> রিয়েল-টাইম ভেলোসিটি
          </span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <Flame className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            সর্বোচ্চ আউটলায়ার স্কোর (Max Outlier)
          </p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
            {stats.maxOutlier}x{' '}
            <span className="text-xs font-normal text-slate-400">Avg</span>
          </p>
          <span className="text-[11px] text-emerald-300/80 flex items-center gap-1 mt-1">
            <Zap className="w-3 h-3" /> চ্যানেলের গড় ভিউয়ের তুলনায়
          </span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            টপ এনগেজমেন্ট রেট (Engagement)
          </p>
          <p className="text-xl sm:text-2xl font-bold text-purple-400 mt-1">
            {stats.topEngagement}%
          </p>
          <span className="text-[11px] text-purple-300/80 flex items-center gap-1 mt-1">
            <ThumbsUp className="w-3 h-3" /> লাইক ও কমেন্ট রেশিও
          </span>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Award className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
