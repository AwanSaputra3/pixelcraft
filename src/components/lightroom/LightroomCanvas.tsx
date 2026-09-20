"use client";

import React, { useState, useRef } from "react";
import { ZoomIn, ZoomOut, RefreshCw, Maximize2, Eye, EyeOff, Crop as CropIcon } from "lucide-react";
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
        return "aspect-square max-h-[480px]";
      case "4:5":
        return "aspect-[4/5] max-h-[500px]";
      case "9:16":
        return "aspect-[9/16] max-h-[520px]";
      case "16:9":
        return "aspect-[16/9] max-h-[440px]";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Top View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1 bg-gray-900/60 rounded-xl border border-gray-800 text-xs text-gray-300">
        {/* Press & Hold Before/After Button */}
        <button
          onMouseDown={() => setShowOriginal(true)}
          onMouseUp={() => setShowOriginal(false)}
          onMouseLeave={() => setShowOriginal(false)}
          onTouchStart={() => setShowOriginal(true)}
          onTouchEnd={() => setShowOriginal(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-xs transition-all select-none ${
            showOriginal
              ? "bg-amber-500 text-gray-950 border-amber-400 scale-105 shadow-md"
              : "bg-gray-950 text-gray-300 hover:text-white border-gray-800"
          }`}
          title="Press & hold to see original photo"
        >
          {showOriginal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-purple-400" />}
          <span>{showOriginal ? "BEFORE (ORIGINAL)" : "HOLD FOR BEFORE"}</span>
        </button>

        {/* Zoom & Pan Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-950 px-2 py-1 rounded-lg border border-gray-800">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
              className="p-1 hover:text-white transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono text-[11px] text-purple-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(4, z + 0.25))}
              className="p-1 hover:text-white transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white transition-colors"
            title="Reset View"
          >
            <RefreshCw className="w-3.5 h-3.5" />
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
        className="relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-gray-800 checkerboard-bg select-none cursor-grab active:cursor-grabbing flex items-center justify-center"
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
            <div className="absolute inset-0 border-2 border-dashed border-purple-500/60 pointer-events-none flex flex-col justify-between p-2">
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
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-amber-500 text-gray-950 font-extrabold text-xs shadow-xl animate-pulse">
            SHOWING ORIGINAL UNEDITED PHOTO
          </div>
        )}
      </div>
    </div>
  );
};
