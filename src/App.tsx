import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Flame,
  TrendingUp,
  Filter,
  SlidersHorizontal,
  Eye,
  ThumbsUp,
  MessageSquare,
  Users,
  Clock,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  BarChart3,
  LayoutGrid,
  List,
  Key,
  Code2,
  X,
  ChevronRight,
  Play,
  AlertCircle,
  RefreshCw,
  Bookmark,
  Download,
  Zap,
  Award,
  Globe,
  Info,
  HelpCircle,
  ArrowUpRight,
  Video,
  Smartphone,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// ==========================================
// MOCK DATA (Rich Realistic Bangla & Global YouTube Videos)
// ==========================================
const INITIAL_VIDEOS = [
  {
    id: 'vid-1',
    title:
      'মাত্র ১০ মিনিটে AI দিয়ে প্রফেশনাল ইউটিউব ভিডিও তৈরি করুন! | Full Bangla Tutorial 2025',
    channelName: 'Tech Studio Bangla',
    channelSubs: 14200,
    channelAvgViews: 8500,
    views: 312000,
    vph: 1420,
    likes: 24500,
    comments: 1840,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    duration: '12:45',
    isShort: false,
    category: 'AI Tutorial',
    region: 'BD',
    thumbnail:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    tags: [
      'AI Video Generator',
      'Bangla AI Tutorial',
      'Make Money with AI',
      'YouTube Automation Bangla',
      'ChatGPT Tutorial',
      'Faceless YouTube Channel',
    ],
    vphHistory: [
      { hour: '0h', vph: 320 },
      { hour: '6h', vph: 680 },
      { hour: '12h', vph: 1150 },
      { hour: '24h', vph: 1690 },
      { hour: '48h', vph: 1530 },
      { hour: 'Now', vph: 1420 },
    ],
  },
  {
    id: 'vid-2',
    title:
      'কম বাজেটে সেরা ৫টি স্মার্টফোন ২০২৫! | Best Budget Smartphones Under 20000 BDT',
    channelName: 'Gadget Insider BD',
    channelSubs: 85000,
    channelAvgViews: 22000,
    views: 495000,
    vph: 2180,
    likes: 31200,
    comments: 2950,
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    duration: '15:18',
    isShort: false,
    category: 'Tech Review',
    region: 'BD',
    thumbnail:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    tags: [
      'Best Phone Under 20000',
      'Smartphone Review Bangla',
      'Budget Phone 2025',
      'Gaming Phone BD',
      'Tech Review Bangla',
    ],
    vphHistory: [
      { hour: '0h', vph: 950 },
      { hour: '4h', vph: 1420 },
      { hour: '8h', vph: 1890 },
      { hour: '12h', vph: 2400 },
      { hour: '16h', vph: 2250 },
      { hour: 'Now', vph: 2180 },
    ],
  },
  {
    id: 'vid-3',
    title:
      'পুরান ঢাকার ঐতিহ্যবাহী কাচ্চি বিরিয়ানি রেসিপি | Secret Kacchi Biryani Recipe at Home',
    channelName: 'Ranna Banna Studio',
    channelSubs: 6800,
    channelAvgViews: 3200,
    views: 198000,
    vph: 890,
    likes: 15800,
    comments: 920,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    duration: '09:32',
    isShort: false,
    category: 'Cooking',
    region: 'BD',
    thumbnail:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    tags: [
      'Kacchi Biryani Recipe',
      'Puran Dhaka Biryani',
      'Bangladeshi Food',
      'Cooking Vlog Bangla',
      'Easy Biryani',
    ],
    vphHistory: [
      { hour: '0h', vph: 210 },
      { hour: '12h', vph: 540 },
      { hour: '24h', vph: 980 },
      { hour: '72h', vph: 1120 },
      { hour: '96h', vph: 950 },
      { hour: 'Now', vph: 890 },
    ],
  },
  {
    id: 'vid-4',
    title:
      'সিলেট থেকে সাজেক ভ্যালি - মাত্র ৩০০০ টাকায় স্বপ্নের ট্যুর! | Budget Travel Vlog BD',
    channelName: 'Nomad Rifat',
    channelSubs: 4200,
    channelAvgViews: 1900,
    views: 142500,
    vph: 1120,
    likes: 11400,
    comments: 870,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    duration: '18:04',
    isShort: false,
    category: 'Bangla Vlog',
    region: 'BD',
    thumbnail:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: [
      'Sajek Valley Tour',
      'Budget Travel Bangladesh',
      'Bangla Travel Vlog',
      'Sylhet Tour Guide',
      'Solo Travel BD',
    ],
    vphHistory: [
      { hour: '0h', vph: 180 },
      { hour: '8h', vph: 490 },
      { hour: '16h', vph: 820 },
      { hour: '24h', vph: 1290 },
      { hour: '36h', vph: 1180 },
      { hour: 'Now', vph: 1120 },
    ],
  },
  {
    id: 'vid-5',
    title:
      'এই ১টি গোপন সেটিংস অন করলে মোবাইল কখনো হ্যাং করবে না! 🔥 #shorts #techbangla',
    channelName: 'Quick Tips BD',
    channelSubs: 29500,
    channelAvgViews: 15000,
    views: 840000,
    vph: 3650,
    likes: 64200,
    comments: 1420,
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    duration: '00:52',
    isShort: true,
    category: 'Tech Review',
    region: 'BD',
    thumbnail:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: [
      'Android Secret Tricks',
      'Phone Lag Fix',
      'YouTube Shorts Bangla',
      'Mobile Tips BD',
      'Viral Tech Shorts',
    ],
    vphHistory: [
      { hour: '0h', vph: 1200 },
      { hour: '3h', vph: 2800 },
      { hour: '6h', vph: 4100 },
      { hour: '12h', vph: 3900 },
      { hour: '15h', vph: 3750 },
      { hour: 'Now', vph: 3650 },
    ],
  },
  {
    id: 'vid-6',
    title:
      'ফ্রিল্যান্সিং শুরু করার সঠিক গাইডলাইন ২০২৫ | শূন্য থেকে মাসে ১ লক্ষ টাকা আয়ের রোডম্যাপ',
    channelName: 'Skill Grower BD',
    channelSubs: 195000,
    channelAvgViews: 45000,
    views: 615000,
    vph: 740,
    likes: 48900,
    comments: 3410,
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    duration: '26:10',
    isShort: false,
    category: 'Freelancing',
    region: 'BD',
    thumbnail:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    tags: [
      'Freelancing Bangla Guideline',
      'Upwork Tutorial Bangla',
      'Fiverr Tips 2025',
      'Online Income BD',
      'Web Development Roadmap',
    ],
    vphHistory: [
      { hour: 'Day 1', vph: 1850 },
      { hour: 'Day 3', vph: 1620 },
      { hour: 'Day 7', vph: 1140 },
      { hour: 'Day 10', vph: 890 },
      { hour: 'Day 12', vph: 780 },
      { hour: 'Now', vph: 740 },
    ],
  },
  {
    id: 'vid-7',
    title:
      'GTA 6 Official Trailer Breakdown in Bangla | গেমিং দুনিয়ায় নতুন ইতিহাস!',
    channelName: 'GamerZ Zone BD',
    channelSubs: 54000,
    channelAvgViews: 14000,
    views: 278000,
    vph: 520,
    likes: 22100,
    comments: 1980,
    publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    duration: '10:55',
    isShort: false,
    category: 'Gaming',
    region: 'BD',
    thumbnail:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    tags: [
      'GTA 6 Bangla',
      'Gaming News BD',
      'PC Build Bangladesh',
      'Bangla Gameplay',
      'Rockstar Games',
    ],
    vphHistory: [
      { hour: 'Day 1', vph: 1900 },
      { hour: 'Day 2', vph: 1450 },
      { hour: 'Day 4', vph: 980 },
      { hour: 'Day 6', vph: 720 },
      { hour: 'Day 8', vph: 590 },
      { hour: 'Now', vph: 520 },
    ],
  },
  {
    id: 'vid-8',
    title:
      'How I Built a $10,000/mo SaaS App using Cursor AI in 48 Hours (No Code)',
    channelName: 'Indie Builder Lab',
    channelSubs: 9200,
    channelAvgViews: 2400,
    views: 215000,
    vph: 1840,
    likes: 14300,
    comments: 940,
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    duration: '21:14',
    isShort: false,
    category: 'AI Tutorial',
    region: 'Global',
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tags: [
      'Cursor AI',
      'Build SaaS with AI',
      'No Code AI App',
      'Make Money Coding',
      'AI Startup',
    ],
    vphHistory: [
      { hour: '0h', vph: 450 },
      { hour: '12h', vph: 1120 },
      { hour: '24h', vph: 1980 },
      { hour: '48h', vph: 2150 },
      { hour: '72h', vph: 1920 },
      { hour: 'Now', vph: 1840 },
    ],
  },
];

const QUICK_TOPICS = [
  { label: 'সব (All)', value: 'ALL' },
  { label: '🤖 AI Tutorial', value: 'AI Tutorial' },
  { label: '📱 Tech Review', value: 'Tech Review' },
  { label: '💻 Freelancing', value: 'Freelancing' },
  { label: '✈️ Bangla Vlog', value: 'Bangla Vlog' },
  { label: '🍲 Cooking', value: 'Cooking' },
  { label: '🎮 Gaming', value: 'Gaming' },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================
const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
};

const getRelativeTime = (isoDate, lang = 'bn') => {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const hours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));
  if (hours < 24) {
    return lang === 'bn' ? `${hours} ঘণ্টা আগে` : `${hours} hours ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return lang === 'bn' ? `${days} দিন আগে` : `${days} days ago`;
  }
  const months = Math.floor(days / 30);
  return lang === 'bn' ? `${months} মাস আগে` : `${months} months ago`;
};

const calculateMetrics = (video) => {
  const outlierRaw = video.views / Math.max(1, video.channelAvgViews || 5000);
  const outlierScore = Number(outlierRaw.toFixed(1));
  const engagementRate = Number(
    (((video.likes + video.comments) / Math.max(1, video.views)) * 100).toFixed(
      1
    )
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

// Parse ISO 8601 YouTube duration (PT12M30S -> 12:30)
const parseISO8601Duration = (duration) => {
  if (!duration) return '10:00';
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '08:30';
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  const isShort = hours === 0 && minutes === 0 && seconds <= 60;
  const formatted =
    hours > 0
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(
          seconds
        ).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
          2,
          '0'
        )}`;
  return { formatted, isShort };
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  // Data State
  const [videos, setVideos] = useState(() =>
    INITIAL_VIDEOS.map(calculateMetrics)
  );
  const [savedVideos, setSavedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [timeframe, setTimeframe] = useState('ALL'); // 24H, 7D, 30D, ALL
  const [minVph, setMinVph] = useState(0);
  const [minOutlier, setMinOutlier] = useState(1);
  const [maxSubs, setMaxSubs] = useState('ALL'); // ALL, UNDER_10K, UNDER_50K, UNDER_100K
  const [videoType, setVideoType] = useState('ALL'); // ALL, LONG, SHORTS
  const [sortBy, setSortBy] = useState('VIEWS'); // VIEWS, VPH, OUTLIER, ENGAGEMENT, RECENT
  const [viewMode, setViewMode] = useState('GRID'); // GRID, TABLE
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Modals & UI State
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [liveSearchTopic, setLiveSearchTopic] = useState(
    'Bangla Tech Tutorial'
  );
  const [liveRegionCode, setLiveRegionCode] = useState('BD');
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  // Copy Helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // Toggle Save Video
  const toggleSaveVideo = (id, e) => {
    if (e) e.stopPropagation();
    setSavedVideos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Live YouTube Data API v3 Fetcher
  const fetchFromYouTubeAPI = async (customQuery) => {
    const queryToUse =
      customQuery || liveSearchTopic || searchQuery || 'Bangla Tutorial';
    if (!apiKey.trim()) {
      setApiError('অনুগ্রহ করে আপনার বৈধ YouTube Data API v3 Key প্রদান করুন।');
      return;
    }

    setIsLoadingLive(true);
    setApiError('');

    try {
      // 1. Search Top Viewed Videos
      const publishedAfterDate = new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000
      ).toISOString();
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        queryToUse
      )}&type=video&order=viewCount&maxResults=12&publishedAfter=${publishedAfterDate}${
        liveRegionCode !== 'ALL' ? `&regionCode=${liveRegionCode}` : ''
      }&key=${apiKey.trim()}`;

      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (searchData.error) {
        throw new Error(searchData.error.message || 'YouTube API Error');
      }

      const videoIds = (searchData.items || [])
        .map((item) => item.id.videoId)
        .filter(Boolean)
        .join(',');
      if (!videoIds) {
        throw new Error(
          'এই কীওয়ার্ডে কোনো ভিডিও পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।'
        );
      }

      // 2. Fetch Video Statistics & Details
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey.trim()}`;
      const detailsRes = await fetch(detailsUrl);
      const detailsData = await detailsRes.json();

      // 3. Fetch Channel Statistics for Subscriber & Avg View estimation
      const channelIds = [
        ...new Set((detailsData.items || []).map((v) => v.snippet.channelId)),
      ].join(',');
      const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}&key=${apiKey.trim()}`;
      const channelsRes = await fetch(channelsUrl);
      const channelsData = await channelsRes.json();

      const channelMap = {};
      (channelsData.items || []).forEach((ch) => {
        const subs = parseInt(ch.statistics.subscriberCount || '5000', 10);
        const totalViews = parseInt(ch.statistics.viewCount || '100000', 10);
        const videoCount = Math.max(
          1,
          parseInt(ch.statistics.videoCount || '20', 10)
        );
        channelMap[ch.id] = {
          subs,
          avgViews: Math.max(500, Math.round(totalViews / videoCount)),
        };
      });

      // 4. Transform into vidIQ Most Viewed format
      const transformed = (detailsData.items || []).map((item) => {
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
          region: liveRegionCode,
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

      setVideos(transformed);
      setIsLiveMode(true);
      setSelectedTopic('ALL');
      setIsApiModalOpen(false);
    } catch (err) {
      setApiError(err.message || 'API থেকে ডেটা আনতে সমস্যা হয়েছে।');
    } finally {
      setIsLoadingLive(false);
    }
  };

  // Filtered and Sorted Videos
  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        // Saved filter
        if (showSavedOnly && !savedVideos.includes(video.id)) return false;

        // Topic Filter
        if (selectedTopic !== 'ALL' && video.category !== selectedTopic)
          return false;

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
          (Date.now() - new Date(video.publishedAt).getTime()) /
          (1000 * 60 * 60);
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
        if (maxSubs === 'UNDER_100K' && video.channelSubs >= 100000)
          return false;

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
        if (sortBy === 'RECENT')
          return new Date(b.publishedAt) - new Date(a.publishedAt);
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
  const kpiStats = useMemo(() => {
    if (filteredVideos.length === 0) {
      return { avgVph: 0, maxOutlier: 0, totalViews: 0, topEngagement: 0 };
    }
    const totalViews = filteredVideos.reduce((acc, v) => acc + v.views, 0);
    const avgVph = Math.round(
      filteredVideos.reduce((acc, v) => acc + v.vph, 0) / filteredVideos.length
    );
    const maxOutlier = Math.max(...filteredVideos.map((v) => v.outlierScore));
    const topEngagement = Math.max(
      ...filteredVideos.map((v) => v.engagementRate)
    );
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

  // Outlier Badge Color Logic (vidIQ style)
  const getOutlierBadgeStyle = (score) => {
    if (score >= 15) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
    }
    if (score >= 5) {
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
    return 'bg-slate-700/60 text-slate-300 border-slate-600';
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* ==========================================
          TOP NAVIGATION HEADER
      ========================================== */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Flame className="w-6 h-6 text-white fill-white/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  vidIQ <span className="text-cyan-400">Most Viewed</span>
                </h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  PRO Research
                </span>
              </div>
              <p className="text-xs text-slate-400">
                সবচেয়ে বেশি দেখা ও ভাইরাল আউটলায়ার ভিডিও রিসার্চ টুল
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Saved Ideas Toggle */}
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                showSavedOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  showSavedOnly ? 'fill-amber-400 text-amber-400' : ''
                }`}
              />
              <span>Saved ({savedVideos.length})</span>
            </button>

            {/* Backend Formula & Code Guide Button */}
            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all"
            >
              <Code2 className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">
                কিভাবে কাজ করে? (Algorithm & Code)
              </span>
              <span className="sm:hidden">Code</span>
            </button>

            {/* Connect Real YouTube API Button */}
            <button
              onClick={() => setIsApiModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all shadow-lg ${
                isLiveMode
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-transparent hover:brightness-110 shadow-cyan-500/20'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>
                {isLiveMode
                  ? 'Live YouTube API Connected'
                  : 'Connect YouTube API'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN CONTENT CONTAINER
      ========================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* TOP KPI OVERVIEW CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">
                মোট ফিল্টারকৃত ভিউ (Total Views)
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                {formatNumber(kpiStats.totalViews)}
              </p>
              <span className="text-[11px] text-cyan-400 flex items-center gap-1 mt-1">
                <Video className="w-3 h-3" /> {filteredVideos.length} টি ভিডিও
                পাওয়া গেছে
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
                {formatNumber(kpiStats.avgVph)}{' '}
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
                {kpiStats.maxOutlier}x{' '}
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
                {kpiStats.topEngagement}%
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

        {/* ==========================================
            SEARCH BAR & ADVANCED VIDIQ FILTERS
        ========================================== */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
          {/* Search Input + Quick Topic Pills */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="যেকোনো টপিক, কীওয়ার্ড বা চ্যানেলের নাম লিখে সার্চ করুন (যেমন: AI, Biryani, Smartphone, Vlog)..."
                className="w-full pl-11 pr-10 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {isLiveMode && (
              <button
                onClick={() => fetchFromYouTubeAPI(searchQuery || 'Bangla')}
                disabled={isLoadingLive}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
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
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic.value}
                onClick={() => setSelectedTopic(topic.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                  selectedTopic === topic.value
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800/80 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            {/* 1. Timeframe Filter */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> সময়কাল
                (Timeframe)
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
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
                onChange={(e) => setMinVph(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer mt-1.5"
              />
            </div>

            {/* 3. Outlier Score Filter */}
            <div>
              <div className="flex justify-between text-[11px] font-medium mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />{' '}
                  Outlier Multiplier
                </span>
                <span className="text-emerald-400 font-bold">
                  {minOutlier}x+
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={minOutlier}
                onChange={(e) => setMinOutlier(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer mt-1.5"
              />
            </div>

            {/* 4. Channel Subscriber Size Filter */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" /> চ্যানেল সাইজ
                (Subscribers)
              </label>
              <select
                value={maxSubs}
                onChange={(e) => setMaxSubs(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">সব চ্যানেল (All Channels)</option>
                <option value="UNDER_10K">
                  ১০ হাজারের নিচে (&lt; 10K Subs)
                </option>
                <option value="UNDER_50K">
                  ৫০ হাজারের নিচে (&lt; 50K Subs)
                </option>
                <option value="UNDER_100K">
                  ১ লক্ষের নিচে (&lt; 100K Subs)
                </option>
              </select>
            </div>

            {/* 5. Video Format (Long vs Shorts) */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" /> ভিডিও
                টাইপ (Format)
              </label>
              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">সব ভিডিও (All Formats)</option>
                <option value="LONG">লং ভিডিও (Long-form)</option>
                <option value="SHORTS">শর্টস (YouTube Shorts)</option>
              </select>
            </div>

            {/* 6. Sort By */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-pink-400" />{' '}
                সাজান (Sort By)
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                দেখানো হচ্ছে:{' '}
                <strong className="text-white">{filteredVideos.length}</strong>{' '}
                টি ভাইরাল ভিডিও
              </span>
              {(minVph > 0 ||
                minOutlier > 1 ||
                maxSubs !== 'ALL' ||
                timeframe !== 'ALL' ||
                selectedTopic !== 'ALL' ||
                searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-rose-400 hover:text-rose-300 underline ml-2"
                >
                  সব ফিল্টার রিসেট করুন
                </button>
              )}
            </div>

            {/* View Toggle (Grid vs Table) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('GRID')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'GRID'
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid
              </button>
              <button
                onClick={() => setViewMode('TABLE')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
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

        {/* ==========================================
            RESULTS DISPLAY (GRID OR TABLE VIEW)
        ========================================== */}
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
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-all"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : viewMode === 'GRID' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
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
                        #{index + 1}
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
                      onClick={(e) => toggleSaveVideo(video.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-950/80 hover:bg-slate-900 flex items-center justify-center text-slate-300 border border-slate-700/80 transition-colors"
                      title="Save Video Idea"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedVideos.includes(video.id)
                            ? 'fill-amber-400 text-amber-400'
                            : ''
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
                      <p className="text-[10px] text-slate-400 uppercase">
                        Total Views
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        {formatNumber(video.views)}
                      </p>
                    </div>
                    <div className="border-x border-slate-800/80">
                      <p className="text-[10px] text-slate-400 uppercase">
                        Ch. Avg Views
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                        {formatNumber(video.channelAvgViews)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">
                        Engagement
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
                        {video.engagementRate}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>📅 {getRelativeTime(video.publishedAt)}</span>
                    <span className="text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      ট্যাগ ও অ্যানালিটিক্স{' '}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW (vidIQ Compact Competitor Table) */
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
                  {filteredVideos.map((video, idx) => (
                    <tr
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
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
                              {video.channelName} •{' '}
                              {getRelativeTime(video.publishedAt)}
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
        )}
      </main>

      {/* ==========================================
          VIDEO DEEP-DIVE DRAWER (SIDE PANEL)
      ========================================== */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"
          onClick={() => setSelectedVideo(null)}
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
                  {selectedVideo.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail & Quick Actions */}
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1">
                    <Flame className="w-4 h-4 fill-slate-950" />
                    {formatNumber(selectedVideo.vph)} Views / Hour
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg font-bold text-xs border backdrop-blur-md ${getOutlierBadgeStyle(
                      selectedVideo.outlierScore
                    )}`}
                  >
                    {selectedVideo.outlierScore}x Outlier
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCopy(selectedVideo.title, 'TITLE')}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  {copiedText === 'TITLE' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" /> টাইটেল কপি
                      হয়েছে!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" /> টাইটেল কপি করুন
                    </>
                  )}
                </button>
                <a
                  href={selectedVideo.thumbnail}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Download className="w-4 h-4 text-purple-400" /> থাম্বনেইল HD
                </a>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    selectedVideo.title
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
                  {formatNumber(selectedVideo.views)}
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[11px] text-slate-400">
                  চ্যানেলের গড় ভিউ
                </span>
                <p className="text-lg font-bold text-slate-300 mt-0.5">
                  {formatNumber(selectedVideo.channelAvgViews)}
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[11px] text-slate-400">
                  Views / Sub Ratio
                </span>
                <p className="text-lg font-bold text-cyan-400 mt-0.5">
                  {selectedVideo.viewsPerSub}x
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[11px] text-slate-400">লাইক সংখ্যা</span>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">
                  {formatNumber(selectedVideo.likes)}
                </p>
              </div>
            </div>

            {/* VPH Velocity Trajectory Chart */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" /> VPH (Views Per
                  Hour) গ্রোথ গ্রাফ
                </h4>
                <span className="text-xs text-amber-400 font-semibold">
                  Current: {selectedVideo.vph} VPH
                </span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedVideo.vphHistory}>
                    <defs>
                      <linearGradient id="vphGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#f59e0b"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f59e0b"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '10px',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="vph"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#vphGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Video SEO Tags & Keywords */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  ভিডিওর ব্যবহৃত র‍্যাংকিং ট্যাগস ({selectedVideo.tags.length})
                </h4>
                <button
                  onClick={() =>
                    handleCopy(selectedVideo.tags.join(', '), 'TAGS')
                  }
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                >
                  {copiedText === 'TAGS' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> সব
                      ট্যাগ কপি হয়েছে!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> সব ট্যাগ কপি করুন
                    </>
                  )}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.tags.map((tag, i) => (
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
                <Sparkles className="w-4 h-4" /> ক্রিয়েটর অ্যাকশন টিপস (Why This
                Video Went Viral)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                এই ভিডিওটি চ্যানেলের সাধারণ গড় ভিউ (
                {formatNumber(selectedVideo.channelAvgViews)}) এর চেয়ে{' '}
                <strong className="text-emerald-400">
                  {selectedVideo.outlierScore} গুণ বেশি
                </strong>{' '}
                ভিউ পেয়েছে! কারণ এর টাইটেলে স্পষ্ট সংখ্যা এবং কৌতূহল (Curiosity
                Gap) ব্যবহার করা হয়েছে। আপনি একই টপিকে আপনার নিজস্ব অভিজ্ঞতা যোগ
                করে পরবর্তী ভিডিও বানাতে পারেন।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          LIVE YOUTUBE API V3 CONNECTION MODAL
      ========================================== */}
      {isApiModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsApiModalOpen(false)}
        >
          <div
            className="bg-[#111827] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    YouTube Data API v3 কানেক্ট করুন
                  </h3>
                  <p className="text-xs text-slate-400">
                    সরাসরি ইউটিউব থেকে রিয়েল-টাইম Most Viewed ডেটা আনুন
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsApiModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  আপনার YouTube Data API v3 Key দিন:
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  * আপনার API Key কোথাও সেভ করা হয় না, এটি শুধুমাত্র আপনার
                  ব্রাউজার থেকে সরাসরি Google API-তে রিকোয়েস্ট পাঠায়।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    সার্চ টপিক / নিশ (Keyword):
                  </label>
                  <input
                    type="text"
                    value={liveSearchTopic}
                    onChange={(e) => setLiveSearchTopic(e.target.value)}
                    placeholder="e.g., Bangla Tech Tutorial"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    দেশ / রিজিওন (Region):
                  </label>
                  <select
                    value={liveRegionCode}
                    onChange={(e) => setLiveRegionCode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="BD">🇧🇩 Bangladesh (BD)</option>
                    <option value="IN">🇮🇳 India (IN)</option>
                    <option value="US">🇺🇸 United States (US)</option>
                    <option value="ALL">🌍 Worldwide (All)</option>
                  </select>
                </div>
              </div>

              {apiError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{apiError}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                {isLiveMode && (
                  <button
                    onClick={() => {
                      setVideos(INITIAL_VIDEOS.map(calculateMetrics));
                      setIsLiveMode(false);
                      setIsApiModalOpen(false);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
                  >
                    ডেমো ডেটায় ফিরে যান
                  </button>
                )}
                <button
                  onClick={() => fetchFromYouTubeAPI()}
                  disabled={isLoadingLive}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                >
                  {isLoadingLive ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> ফেচ
                      হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" /> Fetch Live Most
                      Viewed Videos
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          ALGORITHM & BACKEND CODE GUIDE MODAL
      ========================================== */}
      {isCodeModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsCodeModalOpen(false)}
        >
          <div
            className="bg-[#111827] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    vidIQ Most Viewed অ্যালগরিদম এবং ফর্মুলা গাইড
                  </h3>
                  <p className="text-xs text-slate-400">
                    আপনার নিজস্ব SaaS বা ওয়েবসাইটে এই ফিচারটি যেভাবে তৈরি করবেন
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCodeModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-400">
                  ১. VPH (Views Per Hour) ক্যালকুলেশন ফর্মুলা:
                </h4>
                <p className="text-xs text-slate-400">
                  একটি ভিডিও প্রতি ঘণ্টায় গড়ে কত ভিউ পাচ্ছে তা বের করার মাধ্যমে
                  ট্রেন্ডিং ভিডিও শনাক্ত করা হয়:
                </p>
                <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800">
                  {`const hoursSincePublished = (Date.now() - new Date(publishedAt)) / (1000 * 60 * 60);
const VPH = Math.round(totalViews / Math.max(1, hoursSincePublished));`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-400">
                  ২. Outlier Score (ভাইরাল মাল্টিপ্লায়ার) ফর্মুলা:
                </h4>
                <p className="text-xs text-slate-400">
                  ছোট চ্যানেলের কোন ভিডিওটি হঠাৎ ভাইরাল হয়েছে তা বোঝার জন্য
                  ভিডিওর ভিউকে চ্যানেলের গড় ভিউ দিয়ে ভাগ করা হয়:
                </p>
                <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800">
                  {`const channelAvgViews = channelTotalViews / channelVideoCount;
const outlierScore = (videoViews / channelAvgViews).toFixed(1); // e.g., 14.5x`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400">
                  ৩. YouTube Data API v3 এন্ডপয়েন্ট স্ট্রাকচার:
                </h4>
                <p className="text-xs text-slate-400">
                  প্রথমে <code>search.list</code> দিয়ে{' '}
                  <code>order=viewCount</code> ব্যবহার করে ভিডিও আইডি আনতে হয়,
                  তারপর <code>videos.list</code> এবং <code>channels.list</code>{' '}
                  কল করে বিস্তারিত স্ট্যাটাস বের করতে হয়। এই ড্যাশবোর্ডে
                  ইতিমধ্যে সেই কোড সংযুক্ত করা আছে!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
