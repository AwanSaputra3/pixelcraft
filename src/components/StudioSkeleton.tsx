"use client";

import React from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface StudioSkeletonProps {
  type?: "studio" | "editor";
}

export const StudioSkeleton: React.FC<StudioSkeletonProps> = ({ type = "studio" }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full animate-fade-in select-none pointer-events-none">
      {/* Left 7 Columns: Canvas Preview Viewport Skeleton */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        {/* Main Viewport Box */}
        <div className="relative w-full h-[480px] sm:h-[560px] rounded-3xl skeleton-box border border-white/[0.08] flex flex-col items-center justify-center p-6 text-center shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ff47ff]/5 via-transparent to-[#bd99f8]/5 pointer-events-none rounded-3xl" />

          {/* Glowing Center Badge */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff47ff] animate-pulse">
              <SparklesIcon className="w-7 h-7 text-[#ff47ff]" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-4 w-40 skeleton-box rounded-md" />
              <div className="h-3 w-56 skeleton-box rounded-md opacity-60" />
            </div>
          </div>

          {/* Bottom Viewport Control Pills Skeleton */}
          <div className="absolute bottom-4 inset-x-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/5">
              <div className="h-6 w-16 skeleton-box rounded-full" />
              <div className="h-6 w-16 skeleton-box rounded-full" />
              <div className="h-6 w-16 skeleton-box rounded-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-8 w-8 skeleton-box rounded-full" />
              <div className="h-8 w-8 skeleton-box rounded-full" />
            </div>
          </div>
        </div>

        {/* Histogram / Audio-visual Bar Skeleton */}
        <div className="w-full h-[64px] rounded-2xl skeleton-box border border-white/[0.08] flex items-center justify-between px-4">
          <div className="h-3 w-28 skeleton-box rounded-md opacity-70" />
          <div className="flex items-end gap-1 h-8">
            {[40, 65, 85, 50, 95, 70, 30, 60, 80, 45, 90, 75, 35, 55, 70, 85, 60].map((h, i) => (
              <div
                key={i}
                className="w-1.5 bg-white/10 rounded-full"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right 5 Columns: Controls Sidebar Skeleton */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-white/[0.08] flex flex-col gap-5 shadow-2xl">
          {/* Tabs Pill Bar Skeleton */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <div className="h-8 w-24 skeleton-box rounded-full" />
            <div className="h-8 w-24 skeleton-box rounded-full" />
            <div className="h-8 w-24 skeleton-box rounded-full" />
            <div className="h-8 w-20 skeleton-box rounded-full" />
          </div>

          {/* Panel Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-4 w-44 skeleton-box rounded-md" />
            <div className="h-3 w-20 skeleton-box rounded-md opacity-60" />
          </div>

          {/* Slider Group Skeletons */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 skeleton-box rounded-md" />
                  <div className="h-3 w-10 skeleton-box rounded-md" />
                </div>
                <div className="h-2 w-full skeleton-box rounded-full mt-1" />
              </div>
            ))}
          </div>

          {/* Bottom Action Button Skeleton */}
          <div className="h-11 w-full skeleton-box rounded-2xl mt-1" />
        </div>
      </div>
    </div>
  );
};
