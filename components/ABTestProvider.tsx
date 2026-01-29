"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// A/B Test Configuration
export interface ABTest {
  id: string;
  name: string;
  variants: string[];
  weights?: number[]; // Optional weights for each variant (defaults to equal distribution)
}

interface ABTestContextType {
  getVariant: (testId: string) => string | null;
  trackConversion: (testId: string, eventName: string) => void;
}

const ABTestContext = createContext<ABTestContextType | null>(null);

// Define your A/B tests here
const AB_TESTS: ABTest[] = [
  {
    id: "hero_headline",
    name: "Hero Headline Test",
    variants: ["control", "variant_a", "variant_b"],
  },
  {
    id: "cta_button",
    name: "CTA Button Text Test",
    variants: ["control", "variant_a"],
  },
  {
    id: "pricing_layout",
    name: "Pricing Layout Test",
    variants: ["control", "variant_a"],
  },
];

// Simple hash function for consistent assignment
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Get or create a visitor ID
function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let visitorId = localStorage.getItem("ab_visitor_id");
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("ab_visitor_id", visitorId);
  }
  return visitorId;
}

// Assign variant based on visitor ID
function assignVariant(test: ABTest, visitorId: string): string {
  const hash = hashString(`${test.id}_${visitorId}`);
  const weights = test.weights || test.variants.map(() => 1 / test.variants.length);

  let cumulative = 0;
  const normalizedHash = (hash % 100) / 100;

  for (let i = 0; i < test.variants.length; i++) {
    cumulative += weights[i];
    if (normalizedHash < cumulative) {
      return test.variants[i];
    }
  }

  return test.variants[0];
}

interface ABTestProviderProps {
  children: ReactNode;
}

export function ABTestProvider({ children }: ABTestProviderProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const visitorId = getVisitorId();
    const newAssignments: Record<string, string> = {};

    // Get stored assignments or create new ones
    const storedAssignments = localStorage.getItem("ab_assignments");
    const parsed = storedAssignments ? JSON.parse(storedAssignments) : {};

    AB_TESTS.forEach((test) => {
      if (parsed[test.id]) {
        newAssignments[test.id] = parsed[test.id];
      } else {
        newAssignments[test.id] = assignVariant(test, visitorId);
      }
    });

    // Store assignments
    localStorage.setItem("ab_assignments", JSON.stringify(newAssignments));
    setAssignments(newAssignments);
    setIsInitialized(true);

    // Track experiment exposure in GA4
    Object.entries(newAssignments).forEach(([testId, variant]) => {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "experiment_impression", {
          experiment_id: testId,
          variant_id: variant,
        });
      }
    });
  }, []);

  const getVariant = (testId: string): string | null => {
    if (!isInitialized) return null;
    return assignments[testId] || null;
  };

  const trackConversion = (testId: string, eventName: string) => {
    const variant = assignments[testId];
    if (!variant) return;

    // Track in GA4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        experiment_id: testId,
        variant_id: variant,
        event_category: "AB Test Conversion",
      });
    }

    // Track in Clarity
    if (typeof window !== "undefined" && (window as any).clarity) {
      (window as any).clarity("set", `${testId}_conversion`, variant);
    }
  };

  return (
    <ABTestContext.Provider value={{ getVariant, trackConversion }}>
      {children}
    </ABTestContext.Provider>
  );
}

export function useABTest() {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error("useABTest must be used within an ABTestProvider");
  }
  return context;
}

// Helper hook for specific tests
export function useVariant(testId: string): string | null {
  const { getVariant } = useABTest();
  return getVariant(testId);
}
