import React from 'react';
import { Code2, X } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
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
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
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
              একটি ভিডিও প্রতি ঘণ্টায় গড়ে কত ভিউ পাচ্ছে তা বের করার মাধ্যমে ট্রেন্ডিং ভিডিও শনাক্ত করা হয়:
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
              ছোট চ্যানেলের কোন ভিডিওটি হঠাৎ ভাইরাল হয়েছে তা বোঝার জন্য ভিডিওর ভিউকে চ্যানেলের গড় ভিউ দিয়ে ভাগ করা হয়:
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
              প্রথমে <code>search.list</code> দিয়ে <code>order=viewCount</code> ব্যবহার করে ভিডিও আইডি আনতে হয়,
              তারপর <code>videos.list</code> এবং <code>channels.list</code> কল করে বিস্তারিত স্ট্যাটাস বের করতে হয়।
              এই ড্যাশবোর্ডে ইতিমধ্যে সেই সার্ভিস সম্পূর্ণভাবে সংযুক্ত করা আছে!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
