import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  LogOut,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ShieldCheck,
  Flame,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleIcon } from '../icons/GoogleIcon';
import type { FirebaseConfig } from '../../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'LOGIN' | 'CONFIG';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'LOGIN',
}) => {
  const {
    user,
    loading,
    isConfigured,
    authError,
    config,
    loginWithGoogle,
    logout,
    saveConfig,
    clearConfig,
    clearError,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'CONFIG'>(
    !isConfigured ? 'CONFIG' : initialTab
  );
  const [copiedUid, setCopiedUid] = useState(false);
  const [pastedJson, setPastedJson] = useState('');
  const [jsonParseError, setJsonParseError] = useState('');

  // Config form state
  const [apiKey, setApiKey] = useState(config?.apiKey || '');
  const [authDomain, setAuthDomain] = useState(config?.authDomain || '');
  const [projectId, setProjectId] = useState(config?.projectId || '');
  const [storageBucket, setStorageBucket] = useState(config?.storageBucket || '');
  const [messagingSenderId, setMessagingSenderId] = useState(config?.messagingSenderId || '');
  const [appId, setAppId] = useState(config?.appId || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyUid = (uid: string) => {
    navigator.clipboard.writeText(uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleGoogleLogin = async () => {
    try {
      clearError();
      await loginWithGoogle();
      onClose();
    } catch {
      // Error handled in AuthContext
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    setJsonParseError('');
    const newConfig: FirebaseConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim(),
      projectId: projectId.trim(),
      storageBucket: storageBucket.trim(),
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim(),
    };

    const success = saveConfig(newConfig);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setActiveTab('LOGIN');
      }, 1200);
    }
  };

  const handleParseAndFillJson = () => {
    setJsonParseError('');
    if (!pastedJson.trim()) {
      setJsonParseError('অনুগ্রহ করে Firebase Config কোড পেস্ট করুন।');
      return;
    }

    try {
      // Extract properties using regex or JSON parse to handle JS object literal syntax
      const extractProp = (key: string): string => {
        const regex = new RegExp(`['"]?${key}['"]?\\s*:\\s*['"]([^'"]+)['"]`);
        const match = pastedJson.match(regex);
        return match ? match[1] : '';
      };

      const extractedApiKey = extractProp('apiKey');
      const extractedAuthDomain = extractProp('authDomain');
      const extractedProjectId = extractProp('projectId');
      const extractedStorageBucket = extractProp('storageBucket');
      const extractedMessagingSenderId = extractProp('messagingSenderId');
      const extractedAppId = extractProp('appId');

      if (!extractedApiKey || !extractedProjectId) {
        throw new Error('apiKey অথবা projectId খুঁজে পাওয়া যায়নি।');
      }

      setApiKey(extractedApiKey);
      setAuthDomain(extractedAuthDomain);
      setProjectId(extractedProjectId);
      setStorageBucket(extractedStorageBucket);
      setMessagingSenderId(extractedMessagingSenderId);
      setAppId(extractedAppId);

      // Auto save
      saveConfig({
        apiKey: extractedApiKey,
        authDomain: extractedAuthDomain,
        projectId: extractedProjectId,
        storageBucket: extractedStorageBucket,
        messagingSenderId: extractedMessagingSenderId,
        appId: extractedAppId,
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setActiveTab('LOGIN');
      }, 1200);
    } catch (err) {
      setJsonParseError(
        err instanceof Error ? err.message : 'সঠিক ফরম্যাটের Firebase Config অবজেক্ট দিন।'
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111827] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Firebase Authentication
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Client-Only
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                কোনো নিজস্ব ডাটাবেজ ছাড়া সরাসরি Google লগইন ও ইউজার ম্যানেজমেন্ট
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800/80">
          <button
            onClick={() => setActiveTab('LOGIN')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'LOGIN'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>{user ? 'User Profile' : 'Google Login'}</span>
          </button>
          <button
            onClick={() => setActiveTab('CONFIG')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'CONFIG'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Firebase Config</span>
            {isConfigured && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Global Error Banner */}
        {authError && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">লগইন ত্রুটি:</p>
              <p className="mt-0.5 leading-relaxed">{authError}</p>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: LOGIN / USER PROFILE */}
        {activeTab === 'LOGIN' && (
          <div className="space-y-4">
            {user ? (
              /* User is Logged In */
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-14 h-14 rounded-full border-2 border-cyan-500/50 object-cover shadow-md"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-md">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white truncate">
                          {user.displayName || 'Google User'}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {user.email}
                      </p>
                      <p className="text-[11px] text-cyan-400/90 font-mono mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Google Authentication Session
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800/80">
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="text-slate-400 block mb-0.5">Firebase UID:</span>
                      <div className="flex items-center justify-between gap-1 font-mono text-slate-300">
                        <span className="truncate">{user.uid}</span>
                        <button
                          onClick={() => handleCopyUid(user.uid)}
                          className="hover:text-cyan-400 p-1 transition-colors"
                          title="Copy UID"
                        >
                          {copiedUid ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="text-slate-400 block mb-0.5">Provider:</span>
                      <span className="text-white font-medium flex items-center gap-1.5">
                        <GoogleIcon className="w-3.5 h-3.5" />
                        accounts.google.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('CONFIG')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Firebase সেটিংস
                  </button>

                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>লগআউট করুন</span>
                  </button>
                </div>
              </div>
            ) : (
              /* User Not Logged In */
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/90 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto shadow-lg shadow-white/5">
                    <GoogleIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Google অ্যাকাউন্টের মাধ্যমে লগইন করুন
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      কোনো পাসওয়ার্ড ছাড়াই সহজে ও নিরাপদে আপনার Google অ্যাকাউন্ট দিয়ে লগইন করুন। আপনার সেশন ও আউটলায়ার ডেটা সুরক্ষিত থাকবে।
                    </p>
                  </div>

                  {isConfigured ? (
                    <button
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-xl hover:shadow-cyan-500/10 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <GoogleIcon className="w-5 h-5" />
                      <span>{loading ? 'লগইন হচ্ছে...' : 'Sign in with Google'}</span>
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left space-y-2">
                      <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Firebase এখনও সেটআপ করা হয়নি</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        লগইন করার পূর্বে আপনার Firebase প্রজেক্টের কনফিগারেশন যোগ করুন। এটি মাত্র ১ মিনিটের একটি সাধারণ সেটআপ।
                      </p>
                      <button
                        onClick={() => setActiveTab('CONFIG')}
                        className="w-full py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-all"
                      >
                        Firebase কনফিগার করুন &rarr;
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-slate-400 text-[11px] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>কেন কোনো ডাটাবেজ লাগছে না?</span>
                  </div>
                  <p className="leading-relaxed">
                    Firebase Authentication সম্পূর্ণ ক্লায়েন্ট-সাইড (Client-Side SDK) হিসেবে কাজ করে। ব্যবহারকারীর পরিচয়, টোকেন যাচাই ও ইউজার সেশন সরাসরি Google Firebase সিকিউর সার্ভার দ্বারা হ্যান্ডেল করা হয়।
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONFIGURATION & SETUP */}
        {activeTab === 'CONFIG' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Firebase কনফিগারেশন সফলভাবে সেভ হয়েছে!</span>
              </div>
            )}

            {/* Quick paste helper */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  এক ক্লিকে অটো-ফিল (Auto-Fill from Code):
                </label>
                <span className="text-[10px] text-slate-400">firebaseConfig কোড পেস্ট করুন</span>
              </div>
              <textarea
                value={pastedJson}
                onChange={(e) => setPastedJson(e.target.value)}
                placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "your-app.firebaseapp.com",\n  projectId: "your-app",\n  ...\n};`}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
              {jsonParseError && (
                <p className="text-[11px] text-red-400">{jsonParseError}</p>
              )}
              <button
                type="button"
                onClick={handleParseAndFillJson}
                className="w-full py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium transition-all"
              >
                পেস্ট করা কোড থেকে সেট করুন
              </button>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleSaveForm} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  API Key <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Auth Domain <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={authDomain}
                    onChange={(e) => setAuthDomain(e.target.value)}
                    placeholder="your-app.firebaseapp.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Project ID <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="your-app-id"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Storage Bucket (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={storageBucket}
                    onChange={(e) => setStorageBucket(e.target.value)}
                    placeholder="your-app.appspot.com"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Messaging Sender ID
                  </label>
                  <input
                    type="text"
                    value={messagingSenderId}
                    onChange={(e) => setMessagingSenderId(e.target.value)}
                    placeholder="1234567890"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    App ID (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    placeholder="1:12345:web:..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                {isConfigured && (
                  <button
                    type="button"
                    onClick={clearConfig}
                    className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    কনফিগারেশন মুছুন
                  </button>
                )}
                <div className="flex-1 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('LOGIN')}
                    className="px-3 py-2 text-xs text-slate-300 hover:text-white"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    সেভ ও কানেক্ট করুন
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Setup Instructions in Bangla */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">
                  কিভাবে Firebase Credentials পাবেন?
                </span>
                <a
                  href="https://console.firebase.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  Firebase Console
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                <li>Firebase Console-এ গিয়ে একটি নতুন প্রজেক্ট তৈরি করুন।</li>
                <li>
                  বাম মেনু থেকে <b>Build &gt; Authentication</b>-এ যান এবং{' '}
                  <b>Google</b> প্রোভাইডার এনেবল করুন।
                </li>
                <li>
                  <b>Project settings &gt; General &gt; Your apps</b>-এ যান ও Web আইকনে
                  ক্লিক করে অ্যাপ রেজিস্টার করুন।
                </li>
                <li>
                  সেখানে প্রাপ্ত <code>firebaseConfig</code> অবজেক্টটি কপি করে উপরের বক্সে
                  পেস্ট করুন বা <code>.env</code> ফাইলে যোগ করুন।
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
