"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  BedDouble, 
  Users, 
  TrendingUp, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: "ダッシュボード", href: "/dashboard" },
  { icon: Calendar, label: "予約管理", href: "/dashboard/reservations", badge: 12 },
  { icon: BedDouble, label: "客室管理", href: "/dashboard/rooms" },
  { icon: Users, label: "ゲスト", href: "/dashboard/guests" },
  { icon: TrendingUp, label: "収益", href: "/dashboard/revenue" },
  { icon: FileText, label: "レポート", href: "/dashboard/reports" },
  { icon: Settings, label: "設定", href: "/dashboard/settings" },
];

interface CollapsibleSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function CollapsibleSidebar({ isCollapsed, onToggle }: CollapsibleSidebarProps) {
  const [activeItem, setActiveItem] = useState("/dashboard");

  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen z-40 flex flex-col"
      style={{ backgroundColor: "#001B3D" }}
      initial={false}
      animate={{ width: isCollapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {/* Logo */}
      <div 
        className="h-16 flex items-center px-4 border-b"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <div className="w-8 h-8 rounded-lg bg-dash-action flex items-center justify-center text-white font-bold">
          F
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              <span className="text-white font-semibold text-sm">FIFTHKEYS</span>
              <span className="text-dashText-muted text-xs block">Hotel OS</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.href;
            return (
              <li key={item.href}>
                <button
                  onClick={() => setActiveItem(item.href)}
                  className={`
                    relative w-full flex items-center gap-3 px-3 py-3 rounded-lg
                    transition-all duration-200 group
                    ${isActive 
                      ? "bg-dashboard-elevated text-dash-action" 
                      : "text-dashText-body hover:bg-dashboard-elevated/50 hover:text-white"
                    }
                  `}
                  style={{ minHeight: "44px" }} // Touch target requirement
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-6 rounded-r-full bg-dash-action"
                    />
                  )}
                  
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Badge */}
                  {item.badge && !isCollapsed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium bg-dash-action/20 text-dash-action"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-dashboard-elevated rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-dash-card">
                      <span className="text-sm text-white">{item.label}</span>
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-dash-action/20 text-dash-action">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div 
        className="p-2 border-t"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-3 px-3 py-3 rounded-lg text-dashText-muted hover:bg-dashboard-elevated/50 hover:text-white transition-colors"
          style={{ minHeight: "44px" }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">折りたたむ</span>
            </>
          )}
        </button>
        
        {/* Logout */}
        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-dashText-muted hover:bg-dash-danger/10 hover:text-dash-danger transition-colors mt-1"
          style={{ minHeight: "44px" }}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm"
              >
                ログアウト
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
