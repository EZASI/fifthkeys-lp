"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "warning" | "danger" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastNotificationProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const TOAST_CONFIG: Record<ToastType, { icon: React.ElementType; color: string; bgColor: string }> = {
  success: { icon: CheckCircle, color: "#00F59B", bgColor: "rgba(0, 245, 155, 0.15)" },
  warning: { icon: AlertTriangle, color: "#FFAB00", bgColor: "rgba(255, 171, 0, 0.15)" },
  danger: { icon: XCircle, color: "#FF4D4D", bgColor: "rgba(255, 77, 77, 0.15)" },
  info: { icon: Info, color: "#00CCFF", bgColor: "rgba(0, 204, 255, 0.15)" },
};

export default function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = TOAST_CONFIG[toast.type];
          const Icon = config.icon;
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className="flex items-start gap-3 p-4 rounded-xl min-w-[320px] max-w-[400px]"
              style={{
                backgroundColor: "#001B3D",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: config.bgColor }}
              >
                <Icon className="w-4 h-4" style={{ color: config.color }} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">{toast.title}</div>
                {toast.message && (
                  <div className="text-xs text-dashText-muted mt-0.5">{toast.message}</div>
                )}
              </div>
              
              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 rounded hover:bg-dashboard-elevated/50 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-dashText-muted" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        dismissToast(id);
      }, toast.duration || 5000);
    }
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, dismissToast };
}
