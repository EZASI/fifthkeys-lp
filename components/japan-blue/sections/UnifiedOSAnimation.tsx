"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

// ==============================================================================
// FIFTHKEYS: "GRAVITY CONVERGENCE" + "SYNAPSE LOOP"
// ==============================================================================

const TOKENS = {
  bgGradient: "radial-gradient(140% 140% at 50% 50%, #002347 0%, #000205 100%)",
  hubShadowIdle: `0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 15px rgba(0, 229, 255, 0.4), 0 0 60px rgba(30, 80, 255, 0.2)`,
  hubShadowActive: `0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 40px rgba(0, 229, 255, 0.8), 0 0 120px rgba(30, 80, 255, 0.5)`,
  hubShadowGlow: `0 0 0 2px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.8), 0 0 150px rgba(30, 80, 255, 0.6)`,
  satelliteBg: "rgba(0, 27, 61, 0.6)",
  satelliteBorder: "rgba(0, 229, 255, 0.3)",
  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",
  electricBlue: "#1E50FF",
  cyan: "#00E5FF",
  mintStatus: "#00F59B",
  alertRed: "#FF4D4D",
};

// Satellite nodes with random scatter positions
const SATELLITE_NODES = [
  { id: "pms", icon: "📊", label: "PMS", desc: "予約管理", scatterX: -120, scatterY: -180 },
  { id: "cm", icon: "🔗", label: "CM", desc: "チャネル連携", scatterX: 150, scatterY: -160 },
  { id: "ota", icon: "🌐", label: "OTA", desc: "予約エンジン", scatterX: 200, scatterY: -50 },
  { id: "rms", icon: "💹", label: "RMS", desc: "料金最適化", scatterX: 180, scatterY: 120 },
  { id: "ai", icon: "🤖", label: "AI", desc: "自動化", scatterX: 50, scatterY: 200 },
  { id: "crm", icon: "📧", label: "CRM", desc: "顧客管理", scatterX: -100, scatterY: 180 },
  { id: "lock", icon: "🔐", label: "Lock", desc: "スマートロック", scatterX: -200, scatterY: 80 },
  { id: "analytics", icon: "📈", label: "分析", desc: "BI・レポート", scatterX: -180, scatterY: -60 },
];

const ITEM_COUNT = SATELLITE_NODES.length;
const HUB_SIZE = 140;
const SATELLITE_SIZE = 56;
const GAP_RADIUS = 80;

// Spring config for gravity convergence
const SPRING_CONFIG = { stiffness: 100, damping: 10 };

type SynapseStage = "idle" | "trigger" | "ingest" | "process" | "distribute" | "sync_complete" | "reset";

// Data Packet Component
function DataPacket({ 
  fromX, fromY, toX, toY, duration, label, reverse = false 
}: { 
  fromX: number; fromY: number; toX: number; toY: number; 
  duration: number; label?: string; reverse?: boolean;
}) {
  const startX = reverse ? toX : fromX;
  const startY = reverse ? toY : fromY;
  const endX = reverse ? fromX : toX;
  const endY = reverse ? fromY : toY;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: startX, top: startY, transform: "translate(-50%, -50%)", zIndex: 100 }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
      animate={{ x: endX - startX, y: endY - startY, opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      <div 
        className="relative px-3 py-1.5 rounded-full"
        style={{
          background: `linear-gradient(135deg, ${TOKENS.cyan} 0%, ${TOKENS.electricBlue} 100%)`,
          boxShadow: `0 0 20px ${TOKENS.cyan}, 0 0 40px ${TOKENS.electricBlue}50`,
        }}
      >
        {label && <span className="text-[9px] font-bold text-white whitespace-nowrap">{label}</span>}
      </div>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-full w-8 h-1 rounded-full"
        style={{ background: `linear-gradient(to left, ${TOKENS.cyan}, transparent)` }}
      />
    </motion.div>
  );
}

function FloatingTooltip({ text, color }: { text: string; color: string }) {
  return (
    <motion.div
      className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[9px] font-bold whitespace-nowrap"
      style={{ background: color, color: color === TOKENS.mintStatus ? "#000" : "#FFF", boxShadow: `0 0 15px ${color}60` }}
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.8 }}
    >
      {text}
    </motion.div>
  );
}

export default function UnifiedOSAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState(500);
  
  // Gravity Convergence States
  const [convergencePhase, setConvergencePhase] = useState<"scattered" | "converging" | "settled">("scattered");
  const [hubGlowing, setHubGlowing] = useState(false);
  const [showText, setShowText] = useState(false);
  
  // Synapse Loop State Machine
  const [stage, setStage] = useState<SynapseStage>("idle");
  const [activePackets, setActivePackets] = useState<string[]>([]);
  const [nodeStates, setNodeStates] = useState<Record<string, "idle" | "trigger" | "success">>({});
  const [hubProcessing, setHubProcessing] = useState(false);
  const [nodeTooltips, setNodeTooltips] = useState<Record<string, string>>({});
  
  const radiusArm = Math.min(containerSize * 0.35, 200);
  const center = containerSize / 2;

  const getNodePosition = useCallback((nodeId: string) => {
    const index = SATELLITE_NODES.findIndex(n => n.id === nodeId);
    if (index === -1) return { x: 0, y: 0 };
    const angleDeg = (360 / ITEM_COUNT) * index - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    return { x: center + Math.cos(angleRad) * radiusArm, y: center + Math.sin(angleRad) * radiusArm };
  }, [center, radiusArm]);

  const resetStates = useCallback(() => {
    setNodeStates({});
    setActivePackets([]);
    setHubProcessing(false);
    setNodeTooltips({});
    setStage("idle");
  }, []);

  // Gravity Convergence Animation
  useEffect(() => {
    if (!isInView) return;
    
    // Start convergence
    setConvergencePhase("converging");
    
    // Text fades in 0.3s after icons start moving
    const textTimer = setTimeout(() => setShowText(true), 300);
    
    // Icons settle after spring animation (~1.5s based on spring config)
    const settleTimer = setTimeout(() => {
      setConvergencePhase("settled");
      setHubGlowing(true);
      
      // Hub glow effect lasts 1s then returns to normal
      setTimeout(() => setHubGlowing(false), 1000);
    }, 1500);
    
    return () => {
      clearTimeout(textTimer);
      clearTimeout(settleTimer);
    };
  }, [isInView]);

  // Synapse Loop - starts after convergence settles
  useEffect(() => {
    if (convergencePhase !== "settled") return;
    
    let timeout: NodeJS.Timeout;
    
    const runSynapseLoop = () => {
      setStage("trigger");
      setNodeStates({ ota: "trigger" });
      setNodeTooltips({ ota: "予約発生" });
      
      timeout = setTimeout(() => {
        setStage("ingest");
        setActivePackets(["ota-to-hub"]);
        setNodeTooltips({});
        
        timeout = setTimeout(() => {
          setStage("process");
          setActivePackets([]);
          setHubProcessing(true);
          setNodeStates({ ota: "idle" });
          
          timeout = setTimeout(() => {
            setStage("distribute");
            setHubProcessing(false);
            setActivePackets(["hub-to-pms", "hub-to-lock", "hub-to-crm"]);
            
            timeout = setTimeout(() => {
              setStage("sync_complete");
              setActivePackets([]);
              setNodeStates({ pms: "success", lock: "success", crm: "success" });
              setNodeTooltips({ pms: "Stock Updated", lock: "Key Issued", crm: "Mail Sent" });
              
              timeout = setTimeout(() => {
                setStage("reset");
                resetStates();
                timeout = setTimeout(runSynapseLoop, 2000);
              }, 1500);
            }, 300);
          }, 600);
        }, 500);
      }, 800);
    };
    
    timeout = setTimeout(runSynapseLoop, 2000);
    return () => clearTimeout(timeout);
  }, [convergencePhase, resetStates]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContainerSize(Math.min(entry.contentRect.width, 600));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getSatellitePosition = (index: number) => {
    const angleDeg = (360 / ITEM_COUNT) * index - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    return { x: Math.cos(angleRad) * radiusArm, y: Math.sin(angleRad) * radiusArm };
  };

  const getNodeStyle = (nodeId: string) => {
    const state = nodeStates[nodeId];
    if (state === "trigger") {
      return {
        background: `linear-gradient(135deg, ${TOKENS.alertRed}80 0%, ${TOKENS.satelliteBg} 100%)`,
        border: `2px solid ${TOKENS.alertRed}`,
        boxShadow: `0 0 20px ${TOKENS.alertRed}60`,
      };
    }
    if (state === "success") {
      return {
        background: `linear-gradient(135deg, ${TOKENS.mintStatus}40 0%, ${TOKENS.satelliteBg} 100%)`,
        border: `2px solid ${TOKENS.mintStatus}`,
        boxShadow: `0 0 25px ${TOKENS.mintStatus}60`,
      };
    }
    return {
      background: TOKENS.satelliteBg,
      border: `1px solid ${TOKENS.satelliteBorder}`,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full mx-auto"
      style={{ maxWidth: "600px", aspectRatio: "1 / 1", display: "grid", placeItems: "center", overflow: "visible" }}
    >
      {/* Background */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: TOKENS.bgGradient, boxShadow: "inset 0 0 100px rgba(0, 35, 71, 0.5)" }} />

      {/* Grid */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${containerSize} ${containerSize}`} style={{ zIndex: 4 }}>
        <defs>
          <mask id="lineMask">
            <rect width="100%" height="100%" fill="white" />
            <circle cx={center} cy={center} r={GAP_RADIUS} fill="black" />
          </mask>
        </defs>
        
        <g mask="url(#lineMask)">
          {SATELLITE_NODES.map((node, i) => {
            const pos = getSatellitePosition(i);
            const isActiveIngest = activePackets.includes(`${node.id}-to-hub`);
            const isActiveDistribute = activePackets.includes(`hub-to-${node.id}`);
            const isActive = isActiveIngest || isActiveDistribute;
            
            return (
              <motion.line
                key={`line-${i}`}
                x1={center}
                y1={center}
                x2={center + pos.x}
                y2={center + pos.y}
                stroke={TOKENS.cyan}
                strokeWidth={isActive ? 3 : 1.5}
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: convergencePhase === "settled" ? (isActive ? 1 : 0.1) : 0,
                  pathLength: convergencePhase === "settled" ? 1 : 0,
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  pathLength: { duration: 0.5, delay: 0.2 + i * 0.05 },
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Data Packets */}
      <AnimatePresence>
        {activePackets.includes("ota-to-hub") && (
          <DataPacket key="packet-ota" fromX={getNodePosition("ota").x} fromY={getNodePosition("ota").y} toX={center} toY={center} duration={0.4} label="Sync" />
        )}
        {activePackets.includes("hub-to-pms") && (
          <DataPacket key="packet-pms" fromX={center} fromY={center} toX={getNodePosition("pms").x} toY={getNodePosition("pms").y} duration={0.2} label="在庫" reverse />
        )}
        {activePackets.includes("hub-to-lock") && (
          <DataPacket key="packet-lock" fromX={center} fromY={center} toX={getNodePosition("lock").x} toY={getNodePosition("lock").y} duration={0.2} label="鍵" reverse />
        )}
        {activePackets.includes("hub-to-crm") && (
          <DataPacket key="packet-crm" fromX={center} fromY={center} toX={getNodePosition("crm").x} toY={getNodePosition("crm").y} duration={0.2} label="通知" reverse />
        )}
      </AnimatePresence>

      {/* Satellite Nodes - Gravity Convergence */}
      {SATELLITE_NODES.map((node, i) => {
        const finalPos = getSatellitePosition(i);
        const isHovered = hoveredNode === i;
        const nodeStyle = getNodeStyle(node.id);
        const tooltip = nodeTooltips[node.id];
        
        // Scatter position (edges of viewport)
        const scatterPos = { x: node.scatterX, y: node.scatterY };
        
        return (
          <motion.div
            key={i}
            className="absolute cursor-pointer"
            style={{ 
              left: `calc(50% - ${SATELLITE_SIZE / 2}px)`,
              top: `calc(50% - ${SATELLITE_SIZE / 2}px)`,
              width: SATELLITE_SIZE,
              height: SATELLITE_SIZE,
              zIndex: isHovered ? 30 : 10,
            }}
            initial={{ 
              opacity: 0, 
              x: scatterPos.x,
              y: scatterPos.y,
              scale: 0.5,
            }}
            animate={{ 
              opacity: convergencePhase !== "scattered" ? 1 : 0,
              x: convergencePhase === "scattered" ? scatterPos.x : finalPos.x,
              y: convergencePhase === "scattered" 
                ? scatterPos.y 
                : convergencePhase === "settled" 
                  ? [finalPos.y, finalPos.y - 4, finalPos.y, finalPos.y + 3, finalPos.y] // Tethered floating
                  : finalPos.y,
              scale: convergencePhase !== "scattered" ? 1 : 0.5,
            }}
            transition={
              convergencePhase === "converging" 
                ? { type: "spring", ...SPRING_CONFIG, delay: i * 0.05 }
                : convergencePhase === "settled"
                  ? { y: { duration: 4 + i * 0.2, repeat: Infinity, ease: "easeInOut" } }
                  : { duration: 0 }
            }
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div
              className="relative w-full h-full rounded-xl flex flex-col items-center justify-center backdrop-blur-md"
              style={nodeStyle}
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xl">{node.icon}</span>
              <span className="text-[9px] font-semibold mt-1 tracking-wide" style={{ color: TOKENS.textPrimary }}>
                {node.label}
              </span>
              
              <AnimatePresence>
                {tooltip && (
                  <FloatingTooltip text={tooltip} color={nodeStates[node.id] === "success" ? TOKENS.mintStatus : TOKENS.alertRed} />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Central Hub - Integration Glow on Convergence */}
      <motion.div
        className="absolute"
        style={{ width: HUB_SIZE, height: HUB_SIZE, top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 50 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1,
          scale: hubProcessing ? [1, 1.1, 1] : hubGlowing ? [1, 1.05, 1] : [1, 1.03, 1],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: hubProcessing 
            ? { duration: 0.3 }
            : hubGlowing
              ? { duration: 0.5, repeat: 2 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer backdrop-blur-xl relative overflow-hidden"
          style={{
            background: hubProcessing 
              ? `radial-gradient(circle at 40% 35%, rgba(255, 255, 255, 0.9) 0%, rgba(30, 80, 255, 0.8) 100%)`
              : `radial-gradient(circle at 40% 35%, rgba(30, 80, 255, 0.8) 0%, rgba(0, 27, 61, 0.95) 100%)`,
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
          animate={{
            boxShadow: hubGlowing ? TOKENS.hubShadowGlow : hubProcessing ? TOKENS.hubShadowActive : TOKENS.hubShadowIdle,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Inner glow */}
          <motion.div 
            className="absolute inset-2 rounded-full pointer-events-none"
            animate={{ opacity: hubProcessing ? 0.5 : hubGlowing ? [0.2, 0.5, 0.2] : [0.1, 0.25, 0.1] }}
            transition={{ duration: hubGlowing ? 0.5 : 4, repeat: hubGlowing ? 2 : Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)" }}
          />
          
          {/* F Logo */}
          <motion.span 
            className="text-5xl font-bold relative"
            style={{ 
              color: hubProcessing ? TOKENS.electricBlue : TOKENS.textPrimary,
              marginLeft: "2px",
              marginTop: "-2px",
              zIndex: 2,
            }}
            animate={{
              textShadow: hubGlowing 
                ? [`0 0 30px ${TOKENS.cyan}`, `0 0 60px ${TOKENS.cyan}`, `0 0 30px ${TOKENS.cyan}`]
                : "0 2px 20px rgba(0, 229, 255, 0.4)",
            }}
            transition={{ duration: hubGlowing ? 0.5 : 0 }}
          >
            F
          </motion.span>
          
          {/* Processing text */}
          <AnimatePresence>
            {hubProcessing && (
              <motion.span
                className="absolute bottom-6 text-[9px] font-mono"
                style={{ color: TOKENS.electricBlue }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Processing...
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `2px solid ${TOKENS.cyan}` }}
            animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `2px solid ${TOKENS.electricBlue}` }}
            animate={{ scale: [1, 1.7, 1.7], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Shockwave on process */}
          <AnimatePresence>
            {hubProcessing && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: `3px solid ${TOKENS.cyan}` }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          
          {/* Integration glow ring on convergence complete */}
          <AnimatePresence>
            {hubGlowing && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: `4px solid ${TOKENS.mintStatus}` }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.8, 0, 0] }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Typography - Fades in 0.3s after icons start moving */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-full px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 10 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ zIndex: 10 }}
      >
        <h3 className="text-xl font-bold mb-2" style={{ color: TOKENS.textPrimary, fontFeatureSettings: "'palt'" }}>
          この一点が、すべてを司る。
        </h3>
        <p className="text-sm leading-relaxed mb-2" style={{ color: TOKENS.textSecondary, fontFeatureSettings: "'palt'" }}>
          予約発生から、在庫・鍵・通知まで。
          <br />
          すべてが自動で、0.3秒で同期。
        </p>
        <p className="text-xs" style={{ color: TOKENS.cyan, fontFeatureSettings: "'palt'" }}>
          すべてが、この中心に収束する。
        </p>
      </motion.div>
    </div>
  );
}
