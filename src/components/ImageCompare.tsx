"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize2, Split, Eye, Columns, Loader2, Sparkles, RefreshCw } from "lucide-react";

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
      }
    },
    [isDragging, handleMove]
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
      window.addEventListener("touchmove", handleTouchMove);
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
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1 bg-gray-900/60 rounded-xl border border-gray-800 text-xs text-gray-300">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-lg border border-gray-800">
          <button
            onClick={() => setViewMode("split")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              viewMode === "split" ? "bg-purple-600 text-white font-medium" : "text-gray-400 hover:text-gray-200"
            }`}
            title="Split Before/After Slider"
          >
            <Split className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split</span>
          </button>
          <button
            onClick={() => setViewMode("side")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              viewMode === "side" ? "bg-purple-600 text-white font-medium" : "text-gray-400 hover:text-gray-200"
            }`}
            title="Side-by-Side Dual View"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Side-by-Side</span>
          </button>
          <button
            onClick={() => setViewMode("original")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              viewMode === "original" ? "bg-purple-600 text-white font-medium" : "text-gray-400 hover:text-gray-200"
            }`}
            title="Original Photo Only"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Before</span>
          </button>
          <button
            onClick={() => setViewMode("processed")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
              viewMode === "processed" ? "bg-purple-600 text-white font-medium" : "text-gray-400 hover:text-gray-200"
            }`}
            title="Processed Photo Only"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">After</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-950 px-2 py-1 rounded-lg border border-gray-800">
            <button onClick={handleZoomOut} className="p-1 hover:text-white transition-colors" title="Zoom Out">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono text-[11px] text-purple-300">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={handleZoomIn} className="p-1 hover:text-white transition-colors" title="Zoom In">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white transition-colors"
            title="Reset Zoom & View"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-gray-950 hover:bg-gray-800 border border-gray-800 text-gray-400 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Canvas Preview Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDownPan}
        className={`relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-gray-800 checkerboard-bg select-none cursor-grab active:cursor-grabbing ${
          isFullscreen ? "h-screen rounded-none" : ""
        }`}
      >
        {/* Processing Indicator Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-30 bg-gray-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-[2px] mb-4 animate-spin">
              <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">{processingProgressText}</h4>
            <p className="text-xs text-gray-400">Processing locally in your browser...</p>
          </div>
        )}

        {/* View Mode: Split Comparison */}
        {viewMode === "split" && (
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
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
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-purple-400 via-pink-500 to-cyan-400 cursor-ew-resize shadow-[0_0_12px_rgba(168,85,247,0.8)]"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDragging(true);
              }}
              onTouchStart={() => setIsDragging(true)}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 border-2 border-white flex items-center justify-center shadow-lg text-white">
                <Split className="w-4 h-4" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10 pointer-events-none">
              BEFORE
            </div>
            <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-purple-900/70 backdrop-blur-md text-[11px] font-semibold text-purple-200 border border-purple-500/30 pointer-events-none">
              AFTER
            </div>
          </div>
        )}

        {/* View Mode: Side-by-Side */}
        {viewMode === "side" && (
          <div className="w-full h-full grid grid-cols-2 gap-1 p-2">
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-800/80 flex items-center justify-center bg-gray-950/40">
              <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-black/70 text-[10px] text-gray-300 font-medium">
                BEFORE
              </span>
              <img
                src={originalUrl}
                alt="Before"
                className="max-w-full max-h-full object-contain"
                style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)` }}
              />
            </div>
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-purple-900/50 flex items-center justify-center bg-purple-950/20">
              <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-purple-900/80 text-[10px] text-purple-200 font-medium">
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
            <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-black/70 text-xs text-white font-medium">
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
            <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-purple-900/80 text-xs text-purple-200 font-medium">
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
