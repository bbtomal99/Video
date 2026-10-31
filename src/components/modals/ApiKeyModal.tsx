import React from 'react';
import { Key, X, AlertCircle, RefreshCw, Zap } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  liveSearchTopic: string;
  onLiveSearchTopicChange: (topic: string) => void;
  liveRegionCode: string;
  onLiveRegionCodeChange: (region: string) => void;
  isLoadingLive: boolean;
  apiError: string;
  isLiveMode: boolean;
  onFetch: () => void;
  onResetToDemo: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onApiKeyChange,
  liveSearchTopic,
  onLiveSearchTopicChange,
  liveRegionCode,
  onLiveRegionCodeChange,
  isLoadingLive,
  apiError,
  isLiveMode,
  onFetch,
  onResetToDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
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
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
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
              onChange={(e) => onApiKeyChange(e.target.value)}
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
                onChange={(e) => onLiveSearchTopicChange(e.target.value)}
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
                onChange={(e) => onLiveRegionCodeChange(e.target.value)}
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
                onClick={onResetToDemo}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
              >
                ডেমো ডেটায় ফিরে যান
              </button>
            )}
            <button
              onClick={onFetch}
              disabled={isLoadingLive}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoadingLive ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> ফেচ হচ্ছে...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" /> Fetch Live Most Viewed Videos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
