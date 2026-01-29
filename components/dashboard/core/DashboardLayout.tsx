"use client";

import { useState, ReactNode } from "react";
import CollapsibleSidebar from "./CollapsibleSidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: "#001229" }}
    >
      {/* Sidebar */}
      <CollapsibleSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Header */}
      <DashboardHeader sidebarWidth={sidebarWidth} />

      {/* Main Content */}
      <main
        className="pt-16 min-h-screen transition-all duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
