"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
  target: number;
}

const MOCK_DATA: RevenueData[] = [
  { month: "1月", revenue: 4200000, target: 4000000 },
  { month: "2月", revenue: 3800000, target: 4000000 },
  { month: "3月", revenue: 5100000, target: 4500000 },
  { month: "4月", revenue: 4800000, target: 4500000 },
  { month: "5月", revenue: 5500000, target: 5000000 },
  { month: "6月", revenue: 6200000, target: 5500000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
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
      <p className="text-dashText-muted mb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-white font-medium">
          {entry.dataKey === "revenue" ? "売上" : "目標"}: ¥{(entry.value / 10000).toLocaleString()}万
        </p>
      ))}
    </div>
  );
};

export default function RevenueChart() {
  const totalRevenue = MOCK_DATA.reduce((sum, d) => sum + d.revenue, 0);
  const totalTarget = MOCK_DATA.reduce((sum, d) => sum + d.target, 0);
  const achievement = Math.round((totalRevenue / totalTarget) * 100);

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
          <h3 className="text-sm font-medium text-white">月別売上推移</h3>
          <p className="text-xs text-dashText-muted mt-0.5">2024年 上半期</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">¥{(totalRevenue / 10000).toLocaleString()}万</div>
          <div className="text-xs" style={{ color: achievement >= 100 ? "#00F59B" : "#FFAB00" }}>
            目標達成率 {achievement}%
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_DATA} barGap={4}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              tickFormatter={(value) => `${value / 10000}万`}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
            <Bar 
              dataKey="revenue" 
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            >
              {MOCK_DATA.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.revenue >= entry.target ? "#00F59B" : "#00CCFF"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: "#00F59B" }} />
          <span className="text-dashText-muted">目標達成</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: "#00CCFF" }} />
          <span className="text-dashText-muted">目標未達</span>
        </div>
      </div>
    </div>
  );
}
