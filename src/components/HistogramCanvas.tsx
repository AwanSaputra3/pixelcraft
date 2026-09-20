"use client";

import React, { useEffect, useRef } from "react";
import { HistogramData } from "../lib/enhance";

interface HistogramCanvasProps {
  histogram: HistogramData | null;
  height?: number;
}

export const HistogramCanvas: React.FC<HistogramCanvasProps> = ({ histogram, height = 64 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !histogram) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, width, h);

    // Background dark fill
    ctx.fillStyle = "#0c121e";
    ctx.fillRect(0, 0, width, h);

    const { r, g, b, maxCount } = histogram;
    if (maxCount === 0) return;

    const binWidth = width / 256;

    // Draw RGB Channel Curves with Alpha Blending
    const drawChannel = (channelData: number[], color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let i = 0; i < 256; i++) {
        const val = channelData[i];
        const barHeight = (val / maxCount) * (h - 6);
        const x = i * binWidth;
        const y = h - barHeight;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, h);
      ctx.closePath();
      ctx.fill();
    };

    // Layer Red, Green, Blue
    ctx.globalCompositeOperation = "screen";
    drawChannel(r, "rgba(239, 68, 68, 0.5)");   // Red
    drawChannel(g, "rgba(34, 197, 94, 0.5)");   // Green
    drawChannel(b, "rgba(59, 130, 246, 0.5)");  // Blue
    ctx.globalCompositeOperation = "source-over";

  }, [histogram]);

  if (!histogram) {
    return (
      <div className="w-full h-16 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-center text-xs text-gray-500">
        Histogram data unavailable
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-800/80 bg-[#0c121e] p-2">
      <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 px-1">
        <span>RGB Histogram Spectrum</span>
        <div className="flex items-center gap-2 font-mono">
          <span className="text-red-400">● R</span>
          <span className="text-emerald-400">● G</span>
          <span className="text-blue-400">● B</span>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={256}
        height={height}
        className="w-full h-[64px] rounded bg-[#0c121e]"
      />
    </div>
  );
};
