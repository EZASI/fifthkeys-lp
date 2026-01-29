"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/core/DashboardLayout";
import KPICard, { KPIGrid } from "@/components/dashboard/widgets/KPICard";
import SparklineChart from "@/components/dashboard/widgets/SparklineChart";
import RoomStatusTable, { RoomStatusQuickStats } from "@/components/dashboard/tables/RoomStatusTable";
import OccupancyChart from "@/components/dashboard/widgets/OccupancyChart";
import RevenueChart from "@/components/dashboard/widgets/RevenueChart";
import ToastNotification, { useToast } from "@/components/dashboard/feedback/ToastNotification";
import { KPICardSkeleton, TableSkeleton, ChartSkeleton } from "@/components/dashboard/feedback/SkeletonLoader";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ClipboardList,
  BedDouble,
} from "lucide-react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, addToast, dismissToast } = useToast();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show welcome toast
      addToast({
        type: "info",
        title: "ダッシュボードが読み込まれました",
        message: "本日の予約状況をご確認ください",
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Demo: Show notification after 5 seconds
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        addToast({
          type: "success",
          title: "客室清掃完了",
          message: "Room 301が清掃完了しました",
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <DashboardLayout>
      {/* Toast Notifications */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />

      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">おはようございます</h2>
        <p className="text-dashText-muted">
          {new Date().toLocaleDateString("ja-JP", { 
            year: "numeric", 
            month: "long", 
            day: "numeric",
            weekday: "long",
          })}
        </p>
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <KPICardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <KPIGrid>
          <KPICard
            title="本日のチェックイン"
            value={12}
            subtitle="3件 完了"
            icon={<Users className="w-5 h-5" />}
            trend={{ value: "+3", direction: "up" }}
            accentColor="#00CCFF"
            miniChart={
              <SparklineChart 
                data={[4, 6, 8, 5, 10, 12, 8]} 
                color="#00CCFF"
              />
            }
          />
          <KPICard
            title="稼働率"
            value="85.4%"
            subtitle="前日比 +3.2%"
            icon={<TrendingUp className="w-5 h-5" />}
            trend={{ value: "+3.2%", direction: "up" }}
            accentColor="#00F59B"
            miniChart={
              <SparklineChart 
                data={[72, 68, 85, 91, 96, 98, 85]} 
                color="#00F59B"
              />
            }
          />
          <KPICard
            title="本日の売上"
            value="¥428,500"
            subtitle="目標: ¥500,000"
            icon={<DollarSign className="w-5 h-5" />}
            trend={{ value: "86%達成", direction: "neutral" }}
            accentColor="#FFAB00"
          />
          <KPICard
            title="未処理タスク"
            value={7}
            subtitle="2件 高優先度"
            icon={<ClipboardList className="w-5 h-5" />}
            trend={{ value: "-2", direction: "down" }}
            accentColor="#FF4D4D"
          />
        </KPIGrid>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <OccupancyChart />
            <RevenueChart />
          </>
        )}
      </div>

      {/* Room Status Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BedDouble className="w-5 h-5 text-dash-action" />
            <h3 className="text-lg font-semibold text-white">客室ステータス</h3>
          </div>
          {!isLoading && (
            <RoomStatusQuickStats 
              available={2}
              occupied={5}
              cleaning={1}
              maintenance={1}
            />
          )}
        </div>
        
        {isLoading ? (
          <TableSkeleton rows={5} columns={6} />
        ) : (
          <RoomStatusTable />
        )}
      </div>
    </DashboardLayout>
  );
}
