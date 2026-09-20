"use client";

import React, { useState } from "react";
import { X, Download, Copy, Check, FileImage, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageDataUrl: string;
  originalName: string;
  width: number;
  height: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  imageDataUrl,
  originalName,
  width,
  height,
}) => {
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [quality, setQuality] = useState(0.92);
  const [fileName, setFileName] = useState(() => {
    const baseName = originalName ? originalName.replace(/\.[^/.]+$/, "") : "pixelcraft_edited";
    return `${baseName}_edited`;
  });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#ec4899", "#06b6d4"],
      });
    } catch (e) {
      console.log(e);
    }

    // Convert dataUrl to selected format if needed using canvas
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (format === "jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType = format === "png" ? "image/png" : format === "jpeg" ? "image/jpeg" : "image/webp";
      const finalDataUrl = canvas.toDataURL(mimeType, quality);

      const link = document.createElement("a");
      link.download = `${fileName || "pixelcraft"}.${format === "jpeg" ? "jpg" : format}`;
      link.href = finalDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onClose();
    };
    img.src = imageDataUrl;
  };

  const handleCopyClipboard = async () => {
    try {
      const img = new Image();
      img.src = imageDataUrl;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }, "image/png");
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Copy to clipboard is not supported in this browser mode.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-gray-800 p-6 flex flex-col gap-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Export Processed Image</h3>
              <p className="text-xs text-gray-400">Save to your device or copy to clipboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Preview */}
        <div className="w-full h-44 rounded-xl border border-gray-800 checkerboard-bg flex items-center justify-center overflow-hidden">
          <img src={imageDataUrl} alt="Export preview" className="max-w-full max-h-full object-contain" />
        </div>

        {/* Form Controls */}
        <div className="flex flex-col gap-4 text-xs">
          {/* File Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 font-medium">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          {/* Format Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 font-medium">Export Format</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "png", label: "PNG (Lossless & Alpha)" },
                { id: "jpeg", label: "JPG (High Compression)" },
                { id: "webp", label: "WebP (Modern Web)" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id as any)}
                  className={`px-3 py-2 rounded-lg border font-semibold transition-all ${
                    format === f.id
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {f.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Slider (for JPG & WebP) */}
          {format !== "png" && (
            <div className="flex flex-col gap-1.5 bg-gray-950 p-2.5 rounded-lg border border-gray-800">
              <div className="flex justify-between text-gray-300">
                <span>Output Quality</span>
                <span className="font-mono text-purple-400 font-bold">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {/* Dimensions Info */}
          <div className="flex justify-between text-gray-400 text-[11px] px-1">
            <span>Dimensions: {width} × {height}px</span>
            <span>Client-Side Generation</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
          <button
            onClick={handleCopyClipboard}
            className="flex-1 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-400" /> Copy to Clipboard
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4" /> Download Photo
          </button>
        </div>
      </div>
    </div>
  );
};
