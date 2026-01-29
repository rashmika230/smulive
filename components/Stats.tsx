
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Users, TrendingUp, Clock, Radio } from 'lucide-react';

const data = [
  { time: '08:00', listeners: 120 },
  { time: '09:00', listeners: 340 },
  { time: '10:00', listeners: 450 },
  { time: '11:00', listeners: 400 },
  { time: '12:00', listeners: 550 },
  { time: '13:00', listeners: 720 },
  { time: '14:00', listeners: 680 },
];

export const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
      <div className="glass p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Users size={20} />
          </div>
          <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">+12%</span>
        </div>
        <h3 className="text-2xl font-bold text-white">1,284</h3>
        <p className="text-slate-500 text-xs">Current Listeners</p>
      </div>

      <div className="glass p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <TrendingUp size={20} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white">3,105</h3>
        <p className="text-slate-500 text-xs">Peak Listeners Today</p>
      </div>

      <div className="glass p-5 rounded-2xl lg:col-span-2">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Radio size={20} />
          </div>
          <h4 className="text-sm font-semibold text-white">Audience Growth</h4>
        </div>
        <div className="h-[60px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorListeners" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="listeners" 
                stroke="#6366f1" 
                fillOpacity={1} 
                fill="url(#colorListeners)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
