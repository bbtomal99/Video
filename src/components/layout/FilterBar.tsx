import React from 'react';
import {
  Search,
  X,
  RefreshCw,
  Sparkles,
  Clock,
  Flame,
  TrendingUp,
  Users,
  Smartphone,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from 'lucide-react';
import type {
  TimeframeFilter,
  MaxSubsFilter,
  VideoTypeFilter,
  SortByFilter,
  ViewMode,
  QuickTopic,
} from '../../types/video';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isLiveMode: boolean;
  isLoadingLive: boolean;
  onLiveSearch: () => void;
  selectedTopic: string;
  onSelectTopic: (val: string) => void;
  quickTopics: QuickTopic[];
  timeframe: TimeframeFilter;
  onTimeframeChange: (val: TimeframeFilter) => void;
  minVph: number;
  onMinVphChange: (val: number) => void;
  minOutlier: number;
  onMinOutlierChange: (val: number) => void;
  maxSubs: MaxSubsFilter;
  onMaxSubsChange: (val: MaxSubsFilter) => void;
  videoType: VideoTypeFilter;
  onVideoTypeChange: (val: VideoTypeFilter) => void;
  sortBy: SortByFilter;
  onSortByChange: (val: SortByFilter) => void;
  filteredCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  viewMode: ViewMode;
  onViewModeChange: (val: ViewMode) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  isLiveMode,
  isLoadingLive,
  onLiveSearch,
  selectedTopic,
  onSelectTopic,
  quickTopics,
  timeframe,
  onTimeframeChange,
  minVph,
  onMinVphChange,
  minOutlier,
  onMinOutlierChange,
  maxSubs,
  onMaxSubsChange,
  videoType,
  onVideoTypeChange,
  sortBy,
  onSortByChange,
  filteredCount,
  hasActiveFilters,
  onResetFilters,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
      {/* Search Input + Quick Topic Pills */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="যেকোনো টপিক, কীওয়ার্ড বা চ্যানেলের নাম লিখে সার্চ করুন (যেমন: AI, Biryani, Smartphone, Vlog)..."
            className="w-full pl-11 pr-10 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {isLiveMode && (
          <button
            onClick={onLiveSearch}
            disabled={isLoadingLive}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoadingLive ? 'animate-spin' : ''}`}
            />
            <span>YouTube লাইভ সার্চ</span>
          </button>
        )}
      </div>

      {/* Trending Topic Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-medium text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> ট্রেন্ডিং নিশ:
        </span>
        {quickTopics.map((topic) => (
          <button
            key={topic.value}
            onClick={() => onSelectTopic(topic.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all cursor-pointer ${
              selectedTopic === topic.value
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Filter Selects Grid */}
      <div className="border-t border-slate-800/80 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
        {/* 1. Timeframe Filter */}
        <div>
          <label className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> সময়কাল (Timeframe)
          </label>
          <select
            value={timeframe}
            onChange={(e) => onTimeframeChange(e.target.value as TimeframeFilter)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">সব সময় (All Time)</option>
            <option value="24H">গত ২৪ ঘণ্টা (Last 24 Hours)</option>
            <option value="7D">গত ৭ দিন (Last 7 Days)</option>
            <option value="30D">গত ৩০ দিন (Last 30 Days)</option>
          </select>
        </div>

        {/* 2. Views Per Hour (VPH) Slider */}
        <div>
          <div className="flex justify-between text-[11px] font-medium mb-1.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Min VPH
            </span>
            <span className="text-amber-400 font-bold">{minVph}+ /hr</span>
          </div>
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            value={minVph}
            onChange={(e) => onMinVphChange(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer mt-1.5"
          />
        </div>

        {/* 3. Outlier Score Filter */}
        <div>
          <div className="flex justify-between text-[11px] font-medium mb-1.5">
            <span className="text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Outlier Multiplier
            </span>
            <span className="text-emerald-400 font-bold">{minOutlier}x+</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={minOutlier}
            onChange={(e) => onMinOutlierChange(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer mt-1.5"
          />
        </div>

        {/* 4. Channel Subscriber Size Filter */}
        <div>
          <label className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-400" /> চ্যানেল সাইজ (Subscribers)
          </label>
          <select
            value={maxSubs}
            onChange={(e) => onMaxSubsChange(e.target.value as MaxSubsFilter)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">সব চ্যানেল (All Channels)</option>
            <option value="UNDER_10K">১০ হাজারের নিচে (&lt; 10K Subs)</option>
            <option value="UNDER_50K">৫০ হাজারের নিচে (&lt; 50K Subs)</option>
            <option value="UNDER_100K">১ লক্ষের নিচে (&lt; 100K Subs)</option>
          </select>
        </div>

        {/* 5. Video Format (Long vs Shorts) */}
        <div>
          <label className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-purple-400" /> ভিডিও টাইপ (Format)
          </label>
          <select
            value={videoType}
            onChange={(e) => onVideoTypeChange(e.target.value as VideoTypeFilter)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">সব ভিডিও (All Formats)</option>
            <option value="LONG">লং ভিডিও (Long-form)</option>
            <option value="SHORTS">শর্টস (YouTube Shorts)</option>
          </select>
        </div>

        {/* 6. Sort By */}
        <div>
          <label className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-pink-400" /> সাজান (Sort By)
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortByFilter)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-cyan-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="VIEWS">সবচেয়ে বেশি ভিউ (Most Viewed)</option>
            <option value="VPH">সর্বোচ্চ VPH (Trending Now)</option>
            <option value="OUTLIER">সর্বোচ্চ Outlier Score (Viral)</option>
            <option value="ENGAGEMENT">সর্বোচ্চ Engagement Rate</option>
            <option value="RECENT">নতুন আপলোড (Newest First)</option>
          </select>
        </div>
      </div>

      {/* Filter Footer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            দেখানো হচ্ছে: <strong className="text-white">{filteredCount}</strong> টি ভাইরাল ভিডিও
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-rose-400 hover:text-rose-300 underline ml-2 cursor-pointer"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          )}
        </div>

        {/* View Toggle (Grid vs Table) */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onViewModeChange('GRID')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'GRID'
                ? 'bg-slate-800 text-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Grid
          </button>
          <button
            onClick={() => onViewModeChange('TABLE')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'TABLE'
                ? 'bg-slate-800 text-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" /> Table
          </button>
        </div>
      </div>
    </div>
  );
};
