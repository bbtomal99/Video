import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame } from 'lucide-react';
import type { VphHistoryItem } from '../../types/video';

interface VphChartProps {
  vphHistory: VphHistoryItem[];
  currentVph: number;
}

export const VphChart: React.FC<VphChartProps> = ({ vphHistory, currentVph }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-400" /> VPH (Views Per Hour) গ্রোথ গ্রাফ
        </h4>
        <span className="text-xs text-amber-400 font-semibold">
          Current: {currentVph} VPH
        </span>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={vphHistory}>
            <defs>
              <linearGradient id="vphGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
  );
};
