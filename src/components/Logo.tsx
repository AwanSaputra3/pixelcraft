"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 36,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Static Logo Mark with CSS hover */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-2xl bg-[#1a1a1a] border border-white/10 p-2 shadow-lg shadow-[#ff47ff]/15 transition-all duration-300 group-hover:scale-[1.08] group-hover:border-[#ff47ff]/50 group-hover:shadow-[0_0_25px_rgba(255,71,255,0.4)]"
        style={{ width: size + 8, height: size + 8 }}
      >
        {/* Ambient Glow Pulse */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#ff47ff]/30 via-[#bd99f8]/20 to-[#ffc13c]/30 blur-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Geometric Pixel-Craft Lens Emblem */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="pc-grad-pink" x1="6" y1="6" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff47ff" />
              <stop offset="1" stopColor="#e020e0" />
            </linearGradient>

            <linearGradient id="pc-grad-gold" x1="34" y1="6" x2="18" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffc13c" />
              <stop offset="1" stopColor="#ff9a1f" />
            </linearGradient>

            <linearGradient id="pc-grad-mint" x1="34" y1="34" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#64ed68" />
              <stop offset="1" stopColor="#2dd882" />
            </linearGradient>

            <linearGradient id="pc-grad-purple" x1="6" y1="34" x2="22" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#bd99f8" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>

            <radialGradient id="pc-core-glow" cx="50%" cy="50%" r="50%">
              <stop stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ff47ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff47ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Facet 1: Top-Left */}
          <path
            d="M8 12C8 9.79086 9.79086 8 12 8H18C19.1046 8 20 8.89543 20 10V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V12Z"
            fill="url(#pc-grad-pink)"
            className="transition-transform duration-200 origin-center group-hover:-translate-x-px group-hover:-translate-y-px"
          />

          {/* Facet 2: Top-Right */}
          <path
            d="M22 8H28C30.2091 8 32 9.79086 32 12V18C32 19.1046 31.1046 20 30 20H22C20.8954 20 20 19.1046 20 18V10C20 8.89543 20.8954 8 22 8Z"
            fill="url(#pc-grad-gold)"
            className="transition-transform duration-200 origin-center group-hover:translate-x-px group-hover:-translate-y-px"
          />

          {/* Facet 3: Bottom-Right */}
          <path
            d="M20 22C20 20.8954 20.8954 20 22 20H30C31.1046 20 32 20.8954 32 22V28C32 30.2091 30.2091 32 28 32H22C20.8954 32 20 31.1046 20 30V22Z"
            fill="url(#pc-grad-mint)"
            className="transition-transform duration-200 origin-center group-hover:translate-x-px group-hover:translate-y-px"
          />

          {/* Facet 4: Bottom-Left */}
          <path
            d="M10 20H18C19.1046 20 20 20.8954 20 22V30C20 31.1046 19.1046 32 18 32H12C9.79086 32 8 30.2091 8 28V22C8 20.8954 8.89543 20 10 20Z"
            fill="url(#pc-grad-purple)"
            className="transition-transform duration-200 origin-center group-hover:-translate-x-px group-hover:translate-y-px"
          />

          {/* Center Aperture */}
          <circle cx="20" cy="20" r="5.5" fill="#121212" />
          <circle cx="20" cy="20" r="3.5" fill="url(#pc-core-glow)" />
          <path
            d="M20 17.5L20.8 19.2L22.5 20L20.8 20.8L20 22.5L19.2 20.8L17.5 20L19.2 19.2L20 17.5Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
            PixelCraft
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#ff47ff]/15 text-[#ff47ff] border border-[#ff47ff]/30 transition-all duration-200 group-hover:scale-105 group-hover:bg-[#ff47ff]/25">
            Studio
          </span>
        </div>
      )}
    </div>
  );
};
