"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className = "", 
  variant = "rectangular",
  width,
  height,
}: SkeletonProps) {
  const baseClasses = "animate-pulse";
  
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style = {
    width: width || "100%",
    height: height || (variant === "text" ? "1em" : "100%"),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Skeleton for KPI Card
export function KPICardSkeleton() {
  return (
    <div 
      className="rounded-xl p-5"
      style={{
        backgroundColor: "#001B3D",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <Skeleton variant="rectangular" width={40} height={40} />
        <Skeleton variant="rectangular" width={60} height={24} />
      </div>
      <Skeleton variant="text" width={80} height={12} className="mb-2" />
      <Skeleton variant="text" width={120} height={32} className="mb-1" />
      <Skeleton variant="text" width={100} height={14} />
    </div>
  );
}

// Skeleton for Table Row
export function TableRowSkeleton({ columns = 6 }: { columns?: number }) {
  return (
    <div 
      className="grid gap-4 px-4 py-4 items-center"
      style={{ 
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} variant="text" height={16} width={i === columns - 1 ? 40 : "80%"} />
      ))}
    </div>
  );
}

// Skeleton for full Table
export function TableSkeleton({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div 
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#001B3D",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Header */}
      <div 
        className="grid gap-4 px-4 py-3"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="text" height={12} width="60%" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <TableRowSkeleton key={i} columns={columns} />
      ))}
    </div>
  );
}

// Skeleton for Chart
export function ChartSkeleton() {
  return (
    <div 
      className="rounded-xl p-5"
      style={{
        backgroundColor: "#001B3D",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton variant="text" width={100} height={14} className="mb-1" />
          <Skeleton variant="text" width={60} height={12} />
        </div>
        <div className="text-right">
          <Skeleton variant="text" width={80} height={24} className="mb-1" />
          <Skeleton variant="text" width={60} height={12} />
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="h-48 flex items-end gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            initial={{ height: 0 }}
            animate={{ height: `${30 + Math.random() * 70}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}
