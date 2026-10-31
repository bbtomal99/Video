import React, { useState } from 'react';
import {
  BarChart3,
  X,
  Flame,
  Check,
  Copy,
  Download,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { VideoItem } from '../../types/video';
import { formatNumber, getOutlierBadgeStyle } from '../../utils/formatters';
import { VphChart } from '../analytics/VphChart';

interface VideoDetailModalProps {
  video: VideoItem;
  onClose: () => void;
}

export const VideoDetailModal: React.FC<VideoDetailModalProps> = ({ video, onClose }) => {
  const [copiedText, setCopiedText] = useState<string>('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0F1522] border-l border-slate-800 h-full overflow-y-auto p-5 sm:p-6 space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" /> vidIQ Deep Video Breakdown
            </span>
            <h2 className="text-lg font-bold text-white mt-1 leading-snug">
              {video.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail & Quick Actions */}
        <div className="space-y-3">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1">
                <Flame className="w-4 h-4 fill-slate-950" />
                {formatNumber(video.vph)} Views / Hour
              </span>
              <span
                className={`px-3 py-1 rounded-lg font-bold text-xs border backdrop-blur-md ${getOutlierBadgeStyle(
                  video.outlierScore
                )}`}
              >
                {video.outlierScore}x Outlier
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCopy(video.title, 'TITLE')}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              {copiedText === 'TITLE' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> টাইটেল কপি হয়েছে!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" /> টাইটেল কপি করুন
                </>
              )}
            </button>
            <a
              href={video.thumbnail}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Download className="w-4 h-4 text-purple-400" /> থাম্বনেইল HD
            </a>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                video.title
              )}`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" /> YouTube-এ দেখুন
            </a>
          </div>
        </div>

        {/* 4 Key Metric Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
            <span className="text-[11px] text-slate-400">মোট ভিউ</span>
            <p className="text-lg font-bold text-white mt-0.5">
              {formatNumber(video.views)}
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
            <span className="text-[11px] text-slate-400">চ্যানেলের গড় ভিউ</span>
            <p className="text-lg font-bold text-slate-300 mt-0.5">
              {formatNumber(video.channelAvgViews)}
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
            <span className="text-[11px] text-slate-400">Views / Sub Ratio</span>
            <p className="text-lg font-bold text-cyan-400 mt-0.5">
              {video.viewsPerSub}x
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
            <span className="text-[11px] text-slate-400">লাইক সংখ্যা</span>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">
              {formatNumber(video.likes)}
            </p>
          </div>
        </div>

        {/* VPH Velocity Trajectory Chart */}
        <VphChart vphHistory={video.vphHistory} currentVph={video.vph} />

        {/* Video SEO Tags & Keywords */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              ভিডিওর ব্যবহৃত র‍্যাংকিং ট্যাগস ({video.tags.length})
            </h4>
            <button
              onClick={() => handleCopy(video.tags.join(', '), 'TAGS')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              {copiedText === 'TAGS' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> সব ট্যাগ কপি হয়েছে!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> সব ট্যাগ কপি করুন
                </>
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag, i) => (
              <span
                key={i}
                onClick={() => handleCopy(tag, tag)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <span>#{tag}</span>
                {copiedText === tag ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* AI Content Idea Suggestion */}
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-4 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> ক্রিয়েটর অ্যাকশন টিপস (Why This Video Went Viral)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            এই ভিডিওটি চ্যানেলের সাধারণ গড় ভিউ ({formatNumber(video.channelAvgViews)}) এর চেয়ে{' '}
            <strong className="text-emerald-400">{video.outlierScore} গুণ বেশি</strong>{' '}
            ভিউ পেয়েছে! কারণ এর টাইটেলে স্পষ্ট সংখ্যা এবং কৌতূহল (Curiosity Gap) ব্যবহার করা হয়েছে।
            আপনি একই টপিকে আপনার নিজস্ব অভিজ্ঞতা যোগ করে পরবর্তী ভিডিও বানাতে পারেন।
          </p>
        </div>
      </div>
    </div>
  );
};
