import React from 'react';
import { Flame, Bookmark, Code2, Key, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleIcon } from '../icons/GoogleIcon';

interface NavbarProps {
  savedCount: number;
  showSavedOnly: boolean;
  isLiveMode: boolean;
  onToggleSaved: () => void;
  onOpenCodeModal: () => void;
  onOpenApiModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  showSavedOnly,
  isLiveMode,
  onToggleSaved,
  onOpenCodeModal,
  onOpenApiModal,
  onOpenAuthModal,
}) => {
  const { user } = useAuth();

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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shadow-lg ${
              isLiveMode
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-transparent hover:brightness-110 shadow-cyan-500/20'
            }`}
          >
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isLiveMode
                ? 'Live YouTube API'
                : 'Connect YouTube API'}
            </span>
            <span className="sm:hidden">API</span>
          </button>

          {/* Google Login / Firebase User Profile Button */}
          {user ? (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 hover:bg-slate-800/90 border border-cyan-500/40 text-slate-200 text-xs transition-all shadow-sm cursor-pointer hover:border-cyan-400"
              title={`Logged in as ${user.displayName || user.email}`}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-6 h-6 rounded-full border border-cyan-400 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[11px] font-bold text-slate-950">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <span className="max-w-[100px] truncate font-medium text-white">
                {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
              </span>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-900 border border-white transition-all shadow-md cursor-pointer hover:shadow-cyan-500/10"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>Google লগইন</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
