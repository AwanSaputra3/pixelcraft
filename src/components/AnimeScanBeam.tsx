"use client";

import React from "react";

interface AnimeScanBeamProps {
  isScanning: boolean;
}

export const AnimeScanBeam: React.FC<AnimeScanBeamProps> = ({ isScanning }) => {
  if (!isScanning) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-3xl">
      {/* Full-width GPU gliding wrapper */}
      <div className="absolute inset-0 animate-scan-sweep pointer-events-none">
        {/* Vertical Laser Beam */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#ff47ff] to-transparent shadow-[0_0_16px_#ff47ff]">
          {/* Glowing Center Core */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_15px_#ff47ff] animate-pulse" />
        </div>

        {/* Soft Trailing Scan Fog */}
        <div className="absolute top-0 bottom-0 left-0 w-24 -translate-x-full bg-gradient-to-r from-transparent to-[#ff47ff]/10 pointer-events-none" />
      </div>

      {/* Holographic Subtle Scan Tint */}
      <div className="absolute inset-0 bg-[#ff47ff]/[0.02] pointer-events-none" />
    </div>
  );
};
