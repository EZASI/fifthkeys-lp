"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Bell, 
  User,
  Plus,
  X,
} from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "danger";
  title: string;
  message: string;
  time: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", type: "success", title: "客室清掃完了", message: "Room 301が清掃完了しました", time: "2分前" },
  { id: "2", type: "info", title: "新規予約", message: "田中様が本日チェックイン予定", time: "5分前" },
  { id: "3", type: "warning", title: "レイトチェックアウト", message: "Room 205がレイトチェックアウト申請", time: "10分前" },
];

interface DashboardHeaderProps {
  sidebarWidth: number;
}

export default function DashboardHeader({ sidebarWidth }: DashboardHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success": return "#00F59B";
      case "warning": return "#FFAB00";
      case "danger": return "#FF4D4D";
      default: return "#00CCFF";
    }
  };

  return (
    <header 
      className="fixed top-0 right-0 h-16 z-30 flex items-center justify-between px-6 border-b transition-all duration-200"
      style={{ 
        left: sidebarWidth,
        backgroundColor: "#001229",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Left: Title + Search */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-white">ダッシュボード</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ backgroundColor: "#001B3D" }}
            initial={false}
            animate={{ width: searchOpen ? 280 : 40 }}
          >
            <Search 
              className="w-4 h-4 text-dashText-muted cursor-pointer" 
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  type="text"
                  placeholder="予約・ゲストを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder-dashText-muted outline-none flex-1"
                  autoFocus
                />
              )}
            </AnimatePresence>
            {searchOpen && searchQuery && (
              <X 
                className="w-4 h-4 text-dashText-muted cursor-pointer hover:text-white" 
                onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Quick Action */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ 
            backgroundColor: "#00CCFF",
            color: "#001229",
            minHeight: "44px",
          }}
        >
          <Plus className="w-4 h-4" />
          新規予約
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-dashboard-elevated/50 transition-colors"
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            <Bell className="w-5 h-5 text-dashText-body" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-dash-danger" />
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden"
                style={{ 
                  backgroundColor: "#001B3D",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="p-3 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
                  <span className="text-sm font-medium text-white">通知</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border-b last:border-b-0 hover:bg-dashboard-elevated/30 transition-colors cursor-pointer"
                      style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: getNotificationColor(notification.type) }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{notification.title}</div>
                          <div className="text-xs text-dashText-muted mt-0.5">{notification.message}</div>
                          <div className="text-xs text-dashText-muted mt-1">{notification.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
                  <button className="w-full py-2 text-sm text-dash-action hover:bg-dashboard-elevated/30 rounded-lg transition-colors">
                    すべて表示
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <button
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-dashboard-elevated/50 transition-colors"
          style={{ minHeight: "44px" }}
        >
          <div className="w-8 h-8 rounded-full bg-dashboard-elevated flex items-center justify-center">
            <User className="w-4 h-4 text-dashText-body" />
          </div>
          <div className="text-left hidden lg:block">
            <div className="text-sm font-medium text-white">管理者</div>
            <div className="text-xs text-dashText-muted">Hotel Manager</div>
          </div>
        </button>
      </div>
    </header>
  );
}
