export const formatNumber = (num?: number | null): string => {
  if (num === undefined || num === null) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString();
};

export const getRelativeTime = (isoDate: string, lang: 'bn' | 'en' = 'bn'): string => {
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

export const parseISO8601Duration = (
  duration?: string
): { formatted: string; isShort: boolean } => {
  if (!duration) return { formatted: '10:00', isShort: false };
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return { formatted: '08:30', isShort: false };

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  const isShort = hours === 0 && minutes === 0 && seconds <= 60;
  const formatted =
    hours > 0
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { formatted, isShort };
};

export const getOutlierBadgeStyle = (score: number): string => {
  if (score >= 15) {
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
  }
  if (score >= 5) {
    return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
  }
  return 'bg-slate-700/60 text-slate-300 border-slate-600';
};
