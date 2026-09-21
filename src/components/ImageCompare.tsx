"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  EyeIcon,
  ViewColumnsIcon,
  ArrowPathIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { AnimeScanBeam } from "./AnimeScanBeam";

interface ImageCompareProps {
  originalUrl: string;
  processedUrl: string;
  isProcessing?: boolean;
  processingProgressText?: string;
}

export const ImageCompare: React.FC<ImageCompareProps> = ({
  originalUrl,
  processedUrl,
  isProcessing = false,
  processingProgressText = "Processing Image...",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<"split" | "side" | "original" | "processed">("split");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Split Slider Dragging
  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      } else if (isPanning && e.touches[0]) {
        setPan({
          x: e.touches[0].clientX - startPan.x,
          y: e.touches[0].clientY - startPan.y,
        });
      }
    },
    [isDragging, isPanning, handleMove, startPan]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      } else if (isPanning) {
        setPan({
          x: e.clientX - startPan.x,
          y: e.clientY - startPan.y,
        });
      }
    },
    [isDragging, isPanning, handleMove, startPan]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (isDragging || isPanning) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, isPanning, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleMouseDownPan = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleTouchStartPan = (e: React.TouchEvent) => {
    if (e.target instanceof HTMLButtonElement || e.target instanceof HTMLInputElement) return;
    if (e.touches.length === 1 && zoom > 1) {
      setIsPanning(true);
      setStartPan({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };

  const handleZoomIn = () => setZoom((z) => Math.min(4, z + 0.25));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.25));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSliderPosition(50);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* View & Zoom Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 px-2 py-1.5 bg-[#1c1c1c] rounded-2xl border border-neutral-800 text-xs text-neutral-300">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-[#121212] p-0.5 sm:p-1 rounded-xl border border-neutral-800 relative">
          {[
            { id: "split", label: "Split", icon: ArrowsRightLeftIcon, title: "Split Before/After Slider" },
            { id: "side", label: "Side-by-Side", icon: ViewColumnsIcon, title: "Side-by-Side Dual View" },
            { id: "original", label: "Before", icon: EyeIcon, title: "Original Photo Only" },
            { id: "processed", label: "After", icon: SparklesIcon, title: "Processed Photo Only" },
          ].map((mode) => {
            const isActive = viewMode === mode.id;
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`relative flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 active:scale-95 z-10 cursor-pointer ${
                  isActive ? "text-black bg-[#ff47ff] shadow-sm font-bold" : "text-neutral-400 hover:text-white"
                }`}
                title={mode.title}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-0.5 sm:gap-1 bg-[#121212] px-2 sm:px-2.5 py-1 rounded-xl border border-neutral-800">
            <button onClick={handleZoomOut} className="p-1 hover:text-white transition-colors" title="Zoom Out">
              <MagnifyingGlassMinusIcon className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 sm:w-10 text-center font-mono text-[10px] sm:text-[11px] text-[#ff47ff] font-semibold">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={handleZoomIn} className="p-1 hover:text-white transition-colors" title="Zoom In">
              <MagnifyingGlassPlusIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleResetZoom}
            className="p-1 sm:p-1.5 rounded-full bg-[#121212] hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="Reset Zoom & View"
          >
            <ArrowPathIcon className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1 sm:p-1.5 rounded-full bg-[#121212] hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Preview Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDownPan}
        onTouchStart={handleTouchStartPan}
        className={`relative w-full h-[320px] xs:h-[380px] sm:h-[480px] md:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 checkerboard-bg select-none cursor-grab active:cursor-grabbing ${
          isFullscreen ? "h-screen rounded-none" : ""
        }`}
      >
        {/* Anime.js Futuristic Laser Scan Beam */}
        <AnimeScanBeam isScanning={isProcessing} />

        {/* Processing Indicator Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-30 bg-[#121212]/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff47ff] to-[#ffc13c] p-[2px] mb-4 animate-spin">
              <div className="w-full h-full bg-[#121212] rounded-[14px] flex items-center justify-center">
                <ArrowPathIcon className="w-6 h-6 text-[#ff47ff]" />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">{processingProgressText}</h4>
            <p className="text-xs text-neutral-400">Processing locally in your browser...</p>
          </div>
        )}

        {/* View Mode: Split Comparison */}
        {viewMode === "split" && (
          <div
            className={`relative w-full h-full flex items-center justify-center ${
              isPanning ? "" : "transition-transform duration-300 ease-out"
            }`}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            }}
          >
            {/* Processed (After) Image - Background Layer */}
            <img
              src={processedUrl || originalUrl}
              alt="Processed"
              className="absolute max-w-full max-h-full object-contain pointer-events-none"
            />

            {/* Original (Before) Image - Clipped Layer */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={originalUrl}
                alt="Original"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Split Slider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-[#ff47ff] via-[#bd99f8] to-[#ffc13c] cursor-ew-resize shadow-[0_0_12px_rgba(255,71,255,0.8)]"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDragging(true);
              }}
              onTouchStart={() => setIsDragging(true)}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#ff47ff] border-2 border-white flex items-center justify-center shadow-lg text-black">
                <ArrowsRightLeftIcon className="w-4 h-4" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10 pointer-events-none">
              BEFORE
            </div>
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#ff47ff]/20 backdrop-blur-md text-[11px] font-semibold text-[#ff47ff] border border-[#ff47ff]/40 pointer-events-none">
              AFTER
            </div>
          </div>
        )}

        {/* View Mode: Side-by-Side */}
        {viewMode === "side" && (
          <div className="w-full h-full grid grid-cols-2 gap-2 p-2">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-neutral-800 flex items-center justify-center bg-[#121212]/50">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/70 text-[10px] text-neutral-300 font-medium">
                BEFORE
              </span>
              <img
                src={originalUrl}
                alt="Before"
                className="max-w-full max-h-full object-contain"
                style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }}
              />
            </div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#ff47ff]/30 flex items-center justify-center bg-[#ff47ff]/5">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-[#ff47ff]/20 text-[10px] text-[#ff47ff] font-medium border border-[#ff47ff]/30">
                AFTER
              </span>
              <img
                src={processedUrl || originalUrl}
                alt="After"
                className="max-w-full max-h-full object-contain"
                style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }}
              />
            </div>
          </div>
        )}

        {/* View Mode: Original Only */}
        {viewMode === "original" && (
          <div className="w-full h-full flex items-center justify-center p-4">
            <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 text-xs text-white font-medium">
              BEFORE (ORIGINAL)
            </span>
            <img
              src={originalUrl}
              alt="Original Only"
              className="max-w-full max-h-full object-contain"
              style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }}
            />
          </div>
        )}

        {/* View Mode: Processed Only */}
        {viewMode === "processed" && (
          <div className="w-full h-full flex items-center justify-center p-4">
            <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#ff47ff]/20 border border-[#ff47ff]/40 text-xs text-[#ff47ff] font-medium">
              AFTER (PROCESSED)
            </span>
            <img
              src={processedUrl || originalUrl}
              alt="Processed Only"
              className="max-w-full max-h-full object-contain"
              style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

