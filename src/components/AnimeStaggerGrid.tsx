"use client";

import React, { useState, useCallback } from "react";
import { SparklesIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface AnimeStaggerGridProps {
  className?: string;
}

export const AnimeStaggerGrid: React.FC<AnimeStaggerGridProps> = ({ className = "" }) => {
  const [activePattern, setActivePattern] = useState<"center" | "random" | "spiral">("center");
  const [rippleOrigin, setRippleOrigin] = useState<{ row: number; col: number } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const cols = 16;
  const rows = 6;

  // Trigger CSS-based ripple wave from a given origin
  const triggerRipple = useCallback(
    (originRow: number, originCol: number) => {
      setRippleOrigin({ row: originRow, col: originCol });
      setRippleKey((k) => k + 1);
    },
    []
  );

  const handlePatternClick = (pattern: "center" | "random" | "spiral") => {
    setActivePattern(pattern);
    if (pattern === "center") {
      triggerRipple(Math.floor(rows / 2), Math.floor(cols / 2));
    } else if (pattern === "spiral") {
      triggerRipple(0, 0);
    } else {
      triggerRipple(
        Math.floor(Math.random() * rows),
        Math.floor(Math.random() * cols)
      );
    }
  };

  return (
    <div className={`w-full flex flex-col items-center gap-3 select-none ${className}`}>
      {/* Control Header */}
      <div className="flex items-center justify-between w-full max-w-xl px-2 text-xs">
        <div className="flex items-center gap-2 text-neutral-300 font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#ff47ff] animate-pulse" />
          <span className="flex items-center gap-1.5 text-xs text-white">
            <SparklesIcon className="w-4 h-4 text-[#ff47ff]" /> Interactive Stagger Matrix
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#64ed68]/15 text-[#64ed68] font-bold border border-[#64ed68]/30">
            Interactive
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handlePatternClick("center")}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activePattern === "center"
                ? "bg-[#ff47ff] text-black font-bold shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
            }`}
          >
            Radial Ripple
          </button>

          <button
            onClick={() => handlePatternClick("spiral")}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activePattern === "spiral"
                ? "bg-[#ff47ff] text-black font-bold shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
            }`}
          >
            Corner Sweep
          </button>

          <button
            onClick={() => handlePatternClick("random")}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Trigger Random Burst"
          >
            <ArrowPathIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid Canvas Container */}
      <div className="p-4 rounded-2xl bg-[#161616]/90 border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col gap-2 max-w-xl w-full">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center justify-between gap-2 w-full">
            {Array.from({ length: cols }).map((_, c) => {
              const index = r * cols + c;
              const colorClass =
                index % 4 === 0
                  ? "bg-[#ff47ff]/60 border-[#ff47ff]/80"
                  : index % 4 === 1
                  ? "bg-[#ffc13c]/60 border-[#ffc13c]/80"
                  : index % 4 === 2
                  ? "bg-[#64ed68]/60 border-[#64ed68]/80"
                  : "bg-[#bd99f8]/60 border-[#bd99f8]/80";

              // Calculate organic Euclidean radial delay from ripple origin
              const delay = rippleOrigin
                ? Math.round(Math.hypot(r - rippleOrigin.row, c - rippleOrigin.col) * 28)
                : 0;

              // Alternate wave class to trigger CSS animation on existing DOM nodes without unmounting
              const waveClass =
                rippleKey > 0
                  ? rippleKey % 2 === 0
                    ? "animate-pixel-wave-a"
                    : "animate-pixel-wave-b"
                  : "";

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => triggerRipple(r, c)}
                  className={`anime-pixel-node flex-1 aspect-square rounded-md border border-white/10 cursor-pointer transition-transform duration-200 ease-out hover:scale-125 hover:z-20 hover:shadow-lg hover:shadow-[#ff47ff]/50 active:scale-95 ${colorClass} ${waveClass}`}
                  style={{ animationDelay: `${delay}ms` }}
                  title={`Click pixel #${index + 1} to ripple wave`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-[11px] text-neutral-500">
        Click any pixel above to trigger a localized radial wave
      </p>
    </div>
  );
};
