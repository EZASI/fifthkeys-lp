"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type TrendDirection = "up" | "down" | "neutral";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
  accentColor?: string;
  miniChart?: ReactNode;
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = "#00CCFF",
  miniChart,
}: KPICardProps) {
  const getTrendColor = (direction: TrendDirection) => {
    switch (direction) {
      case "up": return "#00F59B";
      case "down": return "#FF4D4D";
      default: return "#94A3B8";
    }
  };

  const getTrendIcon = (direction: TrendDirection) => {
    switch (direction) {
      case "up": return <TrendingUp className="w-3 h-3" />;
      case "down": return <TrendingDown className="w-3 h-3" />;
      default: return <Minus className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl p-5"
      style={{
        backgroundColor: "#001B3D",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        backgroundColor: "#002A5A",
        transition: { duration: 0.2 }
      }}
    >
      {/* Accent Glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
        
        {trend && (
          <div 
            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${getTrendColor(trend.direction)}15`,
              color: getTrendColor(trend.direction),
            }}
          >
            {getTrendIcon(trend.direction)}
            {trend.value}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="relative z-10">
        <h3 className="text-xs font-medium text-dashText-muted uppercase tracking-wider mb-1">
          {title}
        </h3>
        <div className="text-3xl font-bold text-white tracking-tight">
          {value}
        </div>
        {subtitle && (
          <div className="text-sm text-dashText-muted mt-1">
            {subtitle}
          </div>
        )}
      </div>

      {/* Mini Chart */}
      {miniChart && (
        <div className="mt-4 h-12">
          {miniChart}
        </div>
      )}
    </motion.div>
  );
}

// KPI Grid wrapper component
interface KPIGridProps {
  children: ReactNode;
}

export function KPIGrid({ children }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
