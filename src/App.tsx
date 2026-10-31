import React, { useState, useMemo, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

import type {
  VideoItem,
  KpiStats,
  TimeframeFilter,
  MaxSubsFilter,
  VideoTypeFilter,
  SortByFilter,
  ViewMode,
} from './types/video';
import { INITIAL_VIDEOS, QUICK_TOPICS } from './data/mockVideos';
import { calculateMetrics } from './utils/metrics';
import { fetchYouTubeVideos } from './services/youtubeApi';
import { useAuth } from './context/AuthContext';

import { Navbar } from './components/layout/Navbar';
import { KpiStatsBar } from './components/analytics/KpiStatsBar';
import { FilterBar } from './components/layout/FilterBar';
import { VideoGrid } from './components/video/VideoGrid';
import { VideoTable } from './components/video/VideoTable';
import { VideoDetailModal } from './components/modals/VideoDetailModal';
import { ApiKeyModal } from './components/modals/ApiKeyModal';
import { CodeModal } from './components/modals/CodeModal';
import { AuthModal } from './components/modals/AuthModal';

export default function App(): React.JSX.Element {
  const { user } = useAuth();

  // Data State
  const [videos, setVideos] = useState<VideoItem[]>(() =>
    INITIAL_VIDEOS.map(calculateMetrics)
  );
  const [savedVideos, setSavedVideos] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('ALL');
  const [minVph, setMinVph] = useState<number>(0);
  const [minOutlier, setMinOutlier] = useState<number>(1);
  const [maxSubs, setMaxSubs] = useState<MaxSubsFilter>('ALL');
  const [videoType, setVideoType] = useState<VideoTypeFilter>('ALL');
  const [sortBy, setSortBy] = useState<SortByFilter>('VIEWS');
  const [viewMode, setViewMode] = useState<ViewMode>('GRID');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  // Modals & Live API State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [liveSearchTopic, setLiveSearchTopic] = useState<string>('Bangla Tech Tutorial');
  const [liveRegionCode, setLiveRegionCode] = useState<string>('BD');
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);

  // Sync saved videos from browser storage per authenticated user or guest
  useEffect(() => {
    const storageKey = user ? `vidiq_saved_${user.uid}` : 'vidiq_saved_guest';
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setSavedVideos(JSON.parse(raw));
      } else {
        setSavedVideos([]);
      }
    } catch {
      setSavedVideos([]);
    }
  }, [user]);

  // Toggle Save Video
  const toggleSaveVideo = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedVideos((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      const storageKey = user ? `vidiq_saved_${user.uid}` : 'vidiq_saved_guest';
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Ignore storage write error
      }
      return updated;
    });
  };

  // Live YouTube API Fetcher
  const handleFetchYouTubeAPI = async (customQuery?: string) => {
    const queryToUse = customQuery || liveSearchTopic || searchQuery || 'Bangla Tutorial';
    setIsLoadingLive(true);
    setApiError('');

    try {
      const liveVideos = await fetchYouTubeVideos(apiKey, queryToUse, liveRegionCode);
      setVideos(liveVideos);
      setIsLiveMode(true);
      setSelectedTopic('ALL');
      setIsApiModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError('API থেকে ডেটা আনতে সমস্যা হয়েছে।');
      }
    } finally {
      setIsLoadingLive(false);
    }
  };

  // Reset to Demo Data
  const handleResetToDemo = () => {
    setVideos(INITIAL_VIDEOS.map(calculateMetrics));
    setIsLiveMode(false);
    setIsApiModalOpen(false);
    setApiError('');
  };

  // Filtered and Sorted Videos
  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        // Saved filter
        if (showSavedOnly && !savedVideos.includes(video.id)) return false;

        // Topic Filter
        if (selectedTopic !== 'ALL' && video.category !== selectedTopic) {
          return false;
        }

        // Search Query Filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = video.title.toLowerCase().includes(q);
          const matchChannel = video.channelName.toLowerCase().includes(q);
          const matchTags = video.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchChannel && !matchTags) return false;
        }

        // Timeframe Filter
        const hoursOld =
          (Date.now() - new Date(video.publishedAt).getTime()) / (1000 * 60 * 60);
        if (timeframe === '24H' && hoursOld > 24) return false;
        if (timeframe === '7D' && hoursOld > 24 * 7) return false;
        if (timeframe === '30D' && hoursOld > 24 * 30) return false;

        // Minimum VPH Filter
        if (video.vph < minVph) return false;

        // Minimum Outlier Multiplier Filter
        if (video.outlierScore < minOutlier) return false;

        // Subscriber Size Filter (Find small channels with big views)
        if (maxSubs === 'UNDER_10K' && video.channelSubs >= 10000) return false;
        if (maxSubs === 'UNDER_50K' && video.channelSubs >= 50000) return false;
        if (maxSubs === 'UNDER_100K' && video.channelSubs >= 100000) return false;

        // Video Type (Long vs Shorts)
        if (videoType === 'LONG' && video.isShort) return false;
        if (videoType === 'SHORTS' && !video.isShort) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'VIEWS') return b.views - a.views;
        if (sortBy === 'VPH') return b.vph - a.vph;
        if (sortBy === 'OUTLIER') return b.outlierScore - a.outlierScore;
        if (sortBy === 'ENGAGEMENT') return b.engagementRate - a.engagementRate;
        if (sortBy === 'RECENT') {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        return 0;
      });
  }, [
    videos,
    showSavedOnly,
    savedVideos,
    selectedTopic,
    searchQuery,
    timeframe,
    minVph,
    minOutlier,
    maxSubs,
    videoType,
    sortBy,
  ]);

  // Summary Stats for Top KPI Bar
  const kpiStats: KpiStats = useMemo(() => {
    if (filteredVideos.length === 0) {
      return { avgVph: 0, maxOutlier: 0, totalViews: 0, topEngagement: 0 };
    }
    const totalViews = filteredVideos.reduce((acc, v) => acc + v.views, 0);
    const avgVph = Math.round(
      filteredVideos.reduce((acc, v) => acc + v.vph, 0) / filteredVideos.length
    );
    const maxOutlier = Math.max(...filteredVideos.map((v) => v.outlierScore));
    const topEngagement = Math.max(...filteredVideos.map((v) => v.engagementRate));
    return { avgVph, maxOutlier, totalViews, topEngagement };
  }, [filteredVideos]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('ALL');
    setTimeframe('ALL');
    setMinVph(0);
    setMinOutlier(1);
    setMaxSubs('ALL');
    setVideoType('ALL');
    setSortBy('VIEWS');
    setShowSavedOnly(false);
  };

  const hasActiveFilters = Boolean(
    minVph > 0 ||
    minOutlier > 1 ||
    maxSubs !== 'ALL' ||
    timeframe !== 'ALL' ||
    selectedTopic !== 'ALL' ||
    searchQuery
  );

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        savedCount={savedVideos.length}
        showSavedOnly={showSavedOnly}
        isLiveMode={isLiveMode}
        onToggleSaved={() => setShowSavedOnly(!showSavedOnly)}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* KPI Overview Cards */}
        <KpiStatsBar stats={kpiStats} totalVideosCount={filteredVideos.length} />

        {/* Search & Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isLiveMode={isLiveMode}
          isLoadingLive={isLoadingLive}
          onLiveSearch={() => handleFetchYouTubeAPI(searchQuery || 'Bangla')}
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
          quickTopics={QUICK_TOPICS}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          minVph={minVph}
          onMinVphChange={setMinVph}
          minOutlier={minOutlier}
          onMinOutlierChange={setMinOutlier}
          maxSubs={maxSubs}
          onMaxSubsChange={setMaxSubs}
          videoType={videoType}
          onVideoTypeChange={setVideoType}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          filteredCount={filteredVideos.length}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Results: Grid, Table, or Empty State */}
        {filteredVideos.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-semibold text-white">
              কোনো ভিডিও পাওয়া যায়নি!
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              আপনার বর্তমান ফিল্টার বা VPH/Outlier রেঞ্জের সাথে মিলছে না। নিচের
              বাটনে ক্লিক করে ফিল্টার রিসেট করুন।
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-all cursor-pointer"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : viewMode === 'GRID' ? (
          <VideoGrid
            videos={filteredVideos}
            savedVideos={savedVideos}
            onToggleSave={toggleSaveVideo}
            onSelectVideo={setSelectedVideo}
          />
        ) : (
          <VideoTable
            videos={filteredVideos}
            onSelectVideo={setSelectedVideo}
          />
        )}
      </main>

      {/* Video Deep-Dive Drawer */}
      {selectedVideo && (
        <VideoDetailModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* YouTube API Connection Modal */}
      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        liveSearchTopic={liveSearchTopic}
        onLiveSearchTopicChange={setLiveSearchTopic}
        liveRegionCode={liveRegionCode}
        onLiveRegionCodeChange={setLiveRegionCode}
        isLoadingLive={isLoadingLive}
        apiError={apiError}
        isLiveMode={isLiveMode}
        onFetch={() => handleFetchYouTubeAPI()}
        onResetToDemo={handleResetToDemo}
      />

      {/* Algorithm & Backend Code Guide Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* Firebase Authentication & Google Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
