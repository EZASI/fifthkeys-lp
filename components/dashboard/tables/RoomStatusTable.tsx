"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, User, Clock, Sparkles } from "lucide-react";

type RoomStatus = "available" | "occupied" | "cleaning" | "maintenance";

interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
  guest?: string;
  checkOut?: string;
}

const MOCK_ROOMS: Room[] = [
  { id: "1", number: "101", type: "スタンダード", status: "occupied", guest: "田中 太郎", checkOut: "11:00" },
  { id: "2", number: "102", type: "スタンダード", status: "available" },
  { id: "3", number: "201", type: "デラックス", status: "cleaning" },
  { id: "4", number: "202", type: "デラックス", status: "occupied", guest: "鈴木 花子", checkOut: "12:00" },
  { id: "5", number: "301", type: "スイート", status: "maintenance" },
  { id: "6", number: "302", type: "スイート", status: "occupied", guest: "John Smith", checkOut: "10:00" },
  { id: "7", number: "401", type: "ペントハウス", status: "available" },
  { id: "8", number: "103", type: "スタンダード", status: "occupied", guest: "佐藤 健", checkOut: "11:00" },
];

const STATUS_CONFIG: Record<RoomStatus, { label: string; color: string; bgColor: string }> = {
  available: { label: "空室", color: "#00F59B", bgColor: "rgba(0, 245, 155, 0.15)" },
  occupied: { label: "使用中", color: "#00CCFF", bgColor: "rgba(0, 204, 255, 0.15)" },
  cleaning: { label: "清掃中", color: "#FFAB00", bgColor: "rgba(255, 171, 0, 0.15)" },
  maintenance: { label: "メンテナンス", color: "#FF4D4D", bgColor: "rgba(255, 77, 77, 0.15)" },
};

export default function RoomStatusTable() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <div 
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#001B3D",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Table Header */}
      <div 
        className="grid grid-cols-6 gap-4 px-4 py-3 text-xs font-medium text-dashText-muted uppercase tracking-wider"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      >
        <div>客室番号</div>
        <div>タイプ</div>
        <div>ステータス</div>
        <div>ゲスト</div>
        <div>チェックアウト</div>
        <div className="text-right">アクション</div>
      </div>

      {/* Table Body */}
      <div>
        {MOCK_ROOMS.map((room, index) => {
          const statusConfig = STATUS_CONFIG[room.status];
          const isSelected = selectedRoom === room.id;
          
          return (
            <motion.div
              key={room.id}
              className="grid grid-cols-6 gap-4 px-4 items-center cursor-pointer transition-colors"
              style={{ 
                height: "56px",
                borderBottom: index < MOCK_ROOMS.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                backgroundColor: isSelected ? "#002A5A" : "transparent",
              }}
              onClick={() => setSelectedRoom(isSelected ? null : room.id)}
              whileHover={{ backgroundColor: "#002A5A" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Room Number */}
              <div className="text-sm font-semibold text-white">
                {room.number}
              </div>

              {/* Room Type */}
              <div className="text-sm text-dashText-body">
                {room.type}
              </div>

              {/* Status Badge */}
              <div>
                <span 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: statusConfig.bgColor,
                    color: statusConfig.color,
                  }}
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: statusConfig.color }}
                  />
                  {statusConfig.label}
                </span>
              </div>

              {/* Guest */}
              <div className="flex items-center gap-2">
                {room.guest ? (
                  <>
                    <User className="w-4 h-4 text-dashText-muted" />
                    <span className="text-sm text-dashText-body">{room.guest}</span>
                  </>
                ) : (
                  <span className="text-sm text-dashText-muted">—</span>
                )}
              </div>

              {/* Check Out */}
              <div className="flex items-center gap-2">
                {room.checkOut ? (
                  <>
                    <Clock className="w-4 h-4 text-dashText-muted" />
                    <span className="text-sm text-dashText-body">{room.checkOut}</span>
                  </>
                ) : (
                  <span className="text-sm text-dashText-muted">—</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button 
                  className="p-2 rounded-lg hover:bg-dashboard-elevated transition-colors"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4 text-dashText-muted" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Quick Stats for Room Status
interface RoomStatusQuickStatsProps {
  available: number;
  occupied: number;
  cleaning: number;
  maintenance: number;
}

export function RoomStatusQuickStats({ available, occupied, cleaning, maintenance }: RoomStatusQuickStatsProps) {
  const total = available + occupied + cleaning + maintenance;
  
  return (
    <div className="flex items-center gap-6 text-sm">
      {[
        { label: "空室", value: available, color: "#00F59B" },
        { label: "使用中", value: occupied, color: "#00CCFF" },
        { label: "清掃中", value: cleaning, color: "#FFAB00" },
        { label: "メンテ", value: maintenance, color: "#FF4D4D" },
      ].map((stat) => (
        <div key={stat.label} className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: stat.color }}
          />
          <span className="text-dashText-muted">{stat.label}:</span>
          <span className="font-medium text-white">{stat.value}</span>
        </div>
      ))}
      <div className="text-dashText-muted ml-4">
        合計: <span className="font-medium text-white">{total}</span>室
      </div>
    </div>
  );
}
