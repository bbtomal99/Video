import React from 'react';
import { Flame, Bookmark, Code2, Key } from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  showSavedOnly: boolean;
  isLiveMode: boolean;
  onToggleSaved: () => void;
  onOpenCodeModal: () => void;
  onOpenApiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  showSavedOnly,
  isLiveMode,
  onToggleSaved,
  onOpenCodeModal,
  onOpenApiModal,
}) => {
  return (
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
            onClick={onToggleSaved}
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
            <span>Saved ({savedCount})</span>
          </button>

          {/* Backend Formula & Code Guide Button */}
          <button
            onClick={onOpenCodeModal}
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
            onClick={onOpenApiModal}
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
  );
};
