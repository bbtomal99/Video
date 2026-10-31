export interface VphHistoryItem {
  hour: string;
  vph: number;
}

export interface RawVideoItem {
  id: string;
  title: string;
  channelName: string;
  channelSubs: number;
  channelAvgViews: number;
  views: number;
  vph: number;
  likes: number;
  comments: number;
  publishedAt: string;
  duration: string;
  isShort: boolean;
  category: string;
  region: string;
  thumbnail: string;
  tags: string[];
  vphHistory: VphHistoryItem[];
  outlierScore?: number;
  engagementRate?: number;
  viewsPerSub?: number;
}

export interface VideoItem extends RawVideoItem {
  outlierScore: number;
  engagementRate: number;
  viewsPerSub: number;
}

export interface KpiStats {
  avgVph: number;
  maxOutlier: number;
  totalViews: number;
  topEngagement: number;
}

export type TimeframeFilter = 'ALL' | '24H' | '7D' | '30D';
export type MaxSubsFilter = 'ALL' | 'UNDER_10K' | 'UNDER_50K' | 'UNDER_100K';
export type VideoTypeFilter = 'ALL' | 'LONG' | 'SHORTS';
export type SortByFilter = 'VIEWS' | 'VPH' | 'OUTLIER' | 'ENGAGEMENT' | 'RECENT';
export type ViewMode = 'GRID' | 'TABLE';

export interface QuickTopic {
  label: string;
  value: string;
}
