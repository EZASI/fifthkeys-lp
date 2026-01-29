"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";

interface OccupancyData {
  day: string;
  rate: number;
}

const MOCK_DATA: OccupancyData[] = [
  { day: "月", rate: 72 },
  { day: "火", rate: 68 },
  { day: "水", rate: 85 },
  { day: "木", rate: 91 },
  { day: "金", rate: 96 },
  { day: "土", rate: 98 },
  { day: "日", rate: 88 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload) return null;
  
  return (
    <div 
      className="px-3 py-2 rounded-lg text-sm"
      style={{ 
        backgroundColor: "#002A5A",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <p className="text-dashText-muted">{label}曜日</p>
      <p className="text-white font-medium">{payload[0].value}%</p>
    </div>
  );
};

export default function OccupancyChart() {
  return (
    <div 
      className="rounded-xl p-5"
      style={{
        backgroundColor: "#001B3D",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">稼働率推移</h3>
          <p className="text-xs text-dashText-muted mt-0.5">過去7日間</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">85.4%</div>
          <div className="text-xs text-dash-success">+3.2% 前週比</div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_DATA}>
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00CCFF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00CCFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#00CCFF"
              strokeWidth={2}
              fill="url(#occupancyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
