"use client";

import React, { useState, useRef } from "react";
import {
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { LightroomOptions } from "../../lib/lightroomEngine";

interface LightroomCanvasProps {
  originalUrl: string;
  processedUrl: string;
  options: LightroomOptions;
  isProcessing?: boolean;
}

export const LightroomCanvas: React.FC<LightroomCanvasProps> = ({
  originalUrl,
  processedUrl,
  options,
  isProcessing = false,
}) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDownPan = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleTouchStartPan = (e: React.TouchEvent) => {
    if (e.target instanceof HTMLButtonElement) return;
    if (e.touches.length === 1 && zoom > 1) {
      setIsPanning(true);
      setStartPan({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };

  const handleTouchMovePan = (e: React.TouchEvent) => {
    if (isPanning && e.touches[0]) {
      setPan({
        x: e.touches[0].clientX - startPan.x,
        y: e.touches[0].clientY - startPan.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Aspect ratio crop frame overlay calculator
  const getAspectRatioStyle = () => {
    switch (options.aspectRatio) {
      case "1:1":
        return "aspect-square max-h-[300px] xs:max-h-[360px] sm:max-h-[480px]";
      case "4:5":
        return "aspect-[4/5] max-h-[320px] xs:max-h-[380px] sm:max-h-[500px]";
      case "9:16":
        return "aspect-[9/16] max-h-[320px] xs:max-h-[380px] sm:max-h-[520px]";
      case "16:9":
        return "aspect-[16/9] max-h-[280px] xs:max-h-[340px] sm:max-h-[440px]";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Top View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 px-2 py-1.5 bg-[#1c1c1c] rounded-2xl border border-neutral-800 text-xs text-neutral-300">
        {/* Press & Hold Before/After Button */}
        <button
          onMouseDown={() => setShowOriginal(true)}
          onMouseUp={() => setShowOriginal(false)}
          onMouseLeave={() => setShowOriginal(false)}
          onTouchStart={() => setShowOriginal(true)}
          onTouchEnd={() => setShowOriginal(false)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full border font-semibold text-xs transition-all select-none ${
            showOriginal
              ? "bg-[#ffc13c] text-black border-[#ffc13c] scale-105 shadow-md"
              : "bg-[#121212] text-neutral-300 hover:text-white border-neutral-800"
          }`}
          title="Press & hold to see original photo"
        >
          {showOriginal ? <EyeSlashIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> : <EyeIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#ff47ff]" />}
          <span className="text-[11px] sm:text-xs">{showOriginal ? "BEFORE (ORIGINAL)" : "HOLD FOR BEFORE"}</span>
        </button>

        {/* Zoom & Pan Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5 sm:gap-1 bg-[#121212] px-2 sm:px-2.5 py-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              className="p-1 hover:text-white transition-colors"
            >
              <MagnifyingGlassMinusIcon className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 sm:w-10 text-center font-mono text-[10px] sm:text-[11px] text-[#ff47ff] font-semibold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(4, z + 0.25))}
              className="p-1 hover:text-white transition-colors"
            >
              <MagnifyingGlassPlusIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleResetZoom}
            className="p-1 sm:p-1.5 rounded-full bg-[#121212] hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="Reset View"
          >
            <ArrowPathIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDownPan}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStartPan}
        onTouchMove={handleTouchMovePan}
        onTouchEnd={handleMouseUp}
        className="relative w-full h-[320px] xs:h-[380px] sm:h-[480px] md:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 checkerboard-bg select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <div
          className={`relative flex items-center justify-center overflow-hidden transition-all duration-150 ${getAspectRatioStyle()}`}
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px) rotate(${
              options.rotationAngle
            }deg) scaleX(${options.flipH ? -1 : 1}) scaleY(${options.flipV ? -1 : 1})`,
          }}
        >
          <img
            src={showOriginal ? originalUrl : processedUrl || originalUrl}
            alt="Lightroom Photo Preview"
            className="max-w-full max-h-full object-contain pointer-events-none transition-opacity"
          />

          {/* Optional Aspect Ratio Crop Grid Guides */}
          {options.aspectRatio !== "free" && (
            <div className="absolute inset-0 border-2 border-dashed border-[#ff47ff]/60 pointer-events-none flex flex-col justify-between p-2">
              <div className="w-full h-full border border-white/20 grid grid-cols-3 grid-rows-3">
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-r border-b border-white/10" />
                <div className="border-b border-white/10" />
                <div className="border-r border-white/10" />
                <div className="border-r border-white/10" />
                <div />
              </div>
            </div>
          )}
        </div>

        {/* Hold Indicator Overlay Pill */}
        {showOriginal && (
          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#ffc13c] text-black font-extrabold text-xs shadow-xl animate-pulse">
            SHOWING ORIGINAL UNEDITED PHOTO
          </div>
        )}
      </div>
    </div>
  );
};

