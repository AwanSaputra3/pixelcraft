"use client";

import React, { useState } from "react";
import {
  Sliders,
  Archive,
  Sparkles,
  Gamepad2,
  Scissors,
  RotateCcw,
  Palette,
  Check,
  Upload,
  Info,
  Layers,
  Wand2,
} from "lucide-react";
import { EnhanceOptions, HistogramData } from "../lib/enhance";
import { CompressOptions, CompressResult } from "../lib/compress";
import { DenoiseOptions } from "../lib/denoise";
import { PixelateOptions, PaletteType } from "../lib/pixelate";
import { RemoveBgOptions, PRESET_GRADIENTS, BgType } from "../lib/removeBg";
import { HistogramCanvas } from "./HistogramCanvas";

export type ToolTab = "enhance" | "compress" | "denoise" | "pixelate" | "removeBg";

interface ControlBarProps {
  activeTab: ToolTab;
  setActiveTab: (tab: ToolTab) => void;
  enhanceOptions: EnhanceOptions;
  setEnhanceOptions: React.Dispatch<React.SetStateAction<EnhanceOptions>>;
  compressOptions: CompressOptions;
  setCompressOptions: React.Dispatch<React.SetStateAction<CompressOptions>>;
  compressResult: CompressResult | null;
  onTriggerCompress: () => void;
  denoiseOptions: DenoiseOptions;
  setDenoiseOptions: React.Dispatch<React.SetStateAction<DenoiseOptions>>;
  pixelateOptions: PixelateOptions;
  setPixelateOptions: React.Dispatch<React.SetStateAction<PixelateOptions>>;
  removeBgOptions: RemoveBgOptions;
  setRemoveBgOptions: React.Dispatch<React.SetStateAction<RemoveBgOptions>>;
  onTriggerRemoveBg: () => void;
  histogram: HistogramData | null;
  onResetTab: (tab: ToolTab) => void;
  isProcessing: boolean;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  activeTab,
  setActiveTab,
  enhanceOptions,
  setEnhanceOptions,
  compressOptions,
  setCompressOptions,
  compressResult,
  onTriggerCompress,
  denoiseOptions,
  setDenoiseOptions,
  pixelateOptions,
  setPixelateOptions,
  removeBgOptions,
  setRemoveBgOptions,
  onTriggerRemoveBg,
  histogram,
  onResetTab,
  isProcessing,
}) => {
  const tabs = [
    { id: "enhance", label: "Enhance", icon: Sliders, badge: null },
    { id: "compress", label: "Compress", icon: Archive, badge: null },
    { id: "denoise", label: "Denoise", icon: Sparkles, badge: null },
    { id: "pixelate", label: "Pixel Art", icon: Gamepad2, badge: null },
    { id: "removeBg", label: "Remove BG", icon: Scissors, badge: "AI" },
  ] as const;

  // Preset palette buttons for Pixelate
  const pixelatePalettes: { id: PaletteType; name: string; colors: string[] }[] = [
    { id: "original", name: "Original", colors: ["#3b82f6", "#ec4899", "#8b5cf6"] },
    { id: "gameboy", name: "GameBoy", colors: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"] },
    { id: "nes_8bit", name: "NES 8-Bit", colors: ["#000000", "#fc1000", "#fca044", "#ffffff"] },
    { id: "cyberpunk", name: "Cyberpunk", colors: ["#0a0a1a", "#ff007f", "#00f0ff", "#7000ff"] },
    { id: "monochrome", name: "Monochrome", colors: ["#000000", "#555555", "#aaaaaa", "#ffffff"] },
    { id: "c64", name: "C64 Retro", colors: ["#000000", "#880000", "#aaffee", "#cc44cc"] },
  ];

  const applyEnhancePreset = (preset: "auto" | "cinematic" | "warm" | "vivid" | "bw") => {
    switch (preset) {
      case "auto":
        setEnhanceOptions({ brightness: 5, contrast: 15, saturation: 10, sharpness: 30, warmth: 5, exposure: 5, vibrance: 15 });
        break;
      case "cinematic":
        setEnhanceOptions({ brightness: -5, contrast: 30, saturation: -15, sharpness: 40, warmth: -10, exposure: 0, vibrance: 20 });
        break;
      case "warm":
        setEnhanceOptions({ brightness: 5, contrast: 10, saturation: 15, sharpness: 10, warmth: 35, exposure: 5, vibrance: 10 });
        break;
      case "vivid":
        setEnhanceOptions({ brightness: 10, contrast: 25, saturation: 40, sharpness: 50, warmth: 0, exposure: 5, vibrance: 35 });
        break;
      case "bw":
        setEnhanceOptions({ brightness: 10, contrast: 35, saturation: -100, sharpness: 40, warmth: 0, exposure: 0, vibrance: 0 });
        break;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full glass-card rounded-2xl border border-gray-800 p-4 flex flex-col gap-5">
      {/* Tool Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ToolTab)}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-gray-900/60 hover:bg-gray-800/80 text-gray-400 hover:text-gray-200 border border-gray-800/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-cyan-400 text-gray-950 uppercase">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panel 1: ENHANCE */}
      {activeTab === "enhance" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-400" /> Photo Enhancement
            </h3>
            <button
              onClick={() => onResetTab("enhance")}
              className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Controls
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-gray-400">Presets:</span>
            {[
              { id: "auto", name: "✨ Auto Boost" },
              { id: "cinematic", name: "🎬 Cinematic" },
              { id: "warm", name: "🌅 Warm Sunset" },
              { id: "vivid", name: "🌈 Vivid" },
              { id: "bw", name: "🖤 B&W High-Contrast" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => applyEnhancePreset(p.id as any)}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-gray-900 hover:bg-purple-900/40 text-gray-300 border border-gray-800 hover:border-purple-500/40 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Histogram Spectrum */}
          <HistogramCanvas histogram={histogram} />

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Brightness */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Brightness</span>
                <span className="font-mono text-purple-400">{enhanceOptions.brightness}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={enhanceOptions.brightness}
                onChange={(e) =>
                  setEnhanceOptions((prev) => ({ ...prev, brightness: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Contrast */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Contrast</span>
                <span className="font-mono text-purple-400">{enhanceOptions.contrast}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={enhanceOptions.contrast}
                onChange={(e) =>
                  setEnhanceOptions((prev) => ({ ...prev, contrast: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Saturation */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Saturation</span>
                <span className="font-mono text-purple-400">{enhanceOptions.saturation}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={enhanceOptions.saturation}
                onChange={(e) =>
                  setEnhanceOptions((prev) => ({ ...prev, saturation: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Sharpness */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Sharpness (Laplacian Kernel)</span>
                <span className="font-mono text-purple-400">{enhanceOptions.sharpness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={enhanceOptions.sharpness}
                onChange={(e) =>
                  setEnhanceOptions((prev) => ({ ...prev, sharpness: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Warmth */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Warmth / Temperature</span>
                <span className="font-mono text-purple-400">{enhanceOptions.warmth}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={enhanceOptions.warmth}
                onChange={(e) =>
                  setEnhanceOptions((prev) => ({ ...prev, warmth: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Vibrance */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Vibrance</span>
                <span className="font-mono text-purple-400">{enhanceOptions.vibrance}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={enhanceOptions.vibrance}
                onChange={(e) =>
                  setEnhanceOptions((prev) => ({ ...prev, vibrance: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 2: COMPRESS */}
      {activeTab === "compress" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Archive className="w-4 h-4 text-purple-400" /> Image Compression & Format Engine
            </h3>
            <button
              onClick={() => onResetTab("compress")}
              className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quality Slider */}
            <div className="flex flex-col gap-2 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Compression Quality</span>
                <span className="font-mono text-purple-400 font-bold">
                  {Math.round(compressOptions.quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={compressOptions.quality}
                onChange={(e) =>
                  setCompressOptions((prev) => ({ ...prev, quality: parseFloat(e.target.value) }))
                }
                className="w-full accent-purple-500 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Maximum Savings</span>
                <span>Balanced</span>
                <span>Best Quality</span>
              </div>
            </div>

            {/* Format & Dimension */}
            <div className="flex flex-col gap-3 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-300">Target Output Format</label>
                <select
                  value={compressOptions.format}
                  onChange={(e) =>
                    setCompressOptions((prev) => ({
                      ...prev,
                      format: e.target.value as CompressOptions["format"],
                    }))
                  }
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="original">Original Format</option>
                  <option value="image/webp">WebP (Recommended for Web)</option>
                  <option value="image/jpeg">JPEG / JPG</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-300">Max Dimension Constraint (px)</label>
                <select
                  value={compressOptions.maxWidthOrHeight || 4096}
                  onChange={(e) =>
                    setCompressOptions((prev) => ({
                      ...prev,
                      maxWidthOrHeight: parseInt(e.target.value),
                    }))
                  }
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value={4096}>4K Resolution (Max 4096px)</option>
                  <option value={2048}>Full HD (Max 2048px)</option>
                  <option value={1280}>Web HD (Max 1280px)</option>
                  <option value={800}>Thumbnail (Max 800px)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compress Execution Button & Savings Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-purple-950/20 border border-purple-500/30">
            {compressResult ? (
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Original:</span>{" "}
                  <span className="font-mono text-gray-200">{formatBytes(compressResult.originalSize)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Compressed:</span>{" "}
                  <span className="font-mono text-emerald-400 font-bold">
                    {formatBytes(compressResult.compressedSize)}
                  </span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30 text-[11px]">
                  Saved -{compressResult.savedPercentage}%
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-purple-400" /> Click to compute instant file size savings
              </div>
            )}

            <button
              onClick={onTriggerCompress}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
            >
              <Archive className="w-4 h-4" /> Run Compression
            </button>
          </div>
        </div>
      )}

      {/* Tab Panel 3: DENOISE */}
      {activeTab === "denoise" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> ISO Spatial Noise Reduction
            </h3>
            <button
              onClick={() => onResetTab("denoise")}
              className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Filter Mode */}
            <div className="flex flex-col gap-2 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
              <label className="text-xs text-gray-300">Spatial Convolution Algorithm</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDenoiseOptions((prev) => ({ ...prev, mode: "median" }))}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    denoiseOptions.mode === "median"
                      ? "bg-purple-600 text-white border-purple-500"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200"
                  }`}
                >
                  Median Filter
                </button>
                <button
                  onClick={() => setDenoiseOptions((prev) => ({ ...prev, mode: "bilateral" }))}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    denoiseOptions.mode === "bilateral"
                      ? "bg-purple-600 text-white border-purple-500"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200"
                  }`}
                >
                  Bilateral Gaussian
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                {denoiseOptions.mode === "median"
                  ? "Ideal for salt & pepper ISO noise and film grain."
                  : "Preserves sharp edge detail while smoothing flat skin tone noise."}
              </p>
            </div>

            {/* Denoise Strength */}
            <div className="flex flex-col gap-3 bg-gray-950/60 p-3 rounded-xl border border-gray-800 justify-center">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Denoise Intensity</span>
                <span className="font-mono text-purple-400">{denoiseOptions.strength}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={denoiseOptions.strength}
                onChange={(e) =>
                  setDenoiseOptions((prev) => ({ ...prev, strength: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
                <span>Kernel Radius</span>
                <span className="font-mono text-purple-400">{denoiseOptions.radius}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                value={denoiseOptions.radius}
                onChange={(e) =>
                  setDenoiseOptions((prev) => ({ ...prev, radius: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 4: PIXEL ART */}
      {activeTab === "pixelate" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-purple-400" /> Retro 8-Bit Pixel Art Generator
            </h3>
            <button
              onClick={() => onResetTab("pixelate")}
              className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Block Size */}
            <div className="flex flex-col gap-2 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Pixel Block Size</span>
                <span className="font-mono text-purple-400 font-bold">{pixelateOptions.blockSize}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="48"
                step="2"
                value={pixelateOptions.blockSize}
                onChange={(e) =>
                  setPixelateOptions((prev) => ({ ...prev, blockSize: parseInt(e.target.value) }))
                }
                className="w-full accent-purple-500 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Fine (2px)</span>
                <span>Classic (8px)</span>
                <span>Chunky (48px)</span>
              </div>

              {/* Grid Overlay Toggle */}
              <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-gray-300">
                <input
                  type="checkbox"
                  checked={pixelateOptions.gridOverlay}
                  onChange={(e) =>
                    setPixelateOptions((prev) => ({ ...prev, gridOverlay: e.target.checked }))
                  }
                  className="rounded border-gray-700 text-purple-600 focus:ring-purple-500"
                />
                Draw 8-Bit Pixel Grid Lines
              </label>
            </div>

            {/* Retro Color Palettes */}
            <div className="flex flex-col gap-2 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
              <label className="text-xs text-gray-300">Retro Palette Quantization</label>
              <div className="grid grid-cols-3 gap-1.5">
                {pixelatePalettes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPixelateOptions((prev) => ({ ...prev, palette: p.id }))}
                    className={`flex flex-col items-center p-1.5 rounded-lg border text-[10px] transition-all ${
                      pixelateOptions.palette === p.id
                        ? "bg-purple-900/40 border-purple-500 text-white font-bold"
                        : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <div className="flex gap-0.5 mb-1">
                      {p.colors.map((c, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 5: REMOVE BG */}
      {activeTab === "removeBg" && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-purple-400" /> Client-Side AI Background Remover
            </h3>
            <button
              onClick={() => onResetTab("removeBg")}
              className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* AI Run Button */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-purple-500/30">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Wand2 className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Automatic subject neural segmentation (WASM Client-Side)</span>
            </div>
            <button
              onClick={onTriggerRemoveBg}
              disabled={isProcessing}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center gap-1.5 transition-all"
            >
              <Scissors className="w-4 h-4" /> Remove Background
            </button>
          </div>

          {/* Replacement Backdrop Selector */}
          <div className="flex flex-col gap-3 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
            <label className="text-xs text-gray-300 font-semibold">Background Backdrop Replacement</label>

            <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
              {(["transparent", "solid", "gradient", "customImage"] as BgType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setRemoveBgOptions((prev) => ({ ...prev, bgType: t }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                    removeBgOptions.bgType === t
                      ? "bg-purple-600 text-white"
                      : "bg-gray-900 text-gray-400 hover:text-gray-200 border border-gray-800"
                  }`}
                >
                  {t === "customImage" ? "Custom Photo" : t}
                </button>
              ))}
            </div>

            {/* Sub-Option 1: Solid Color */}
            {removeBgOptions.bgType === "solid" && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Choose Hex Color:</span>
                <input
                  type="color"
                  value={removeBgOptions.solidColor}
                  onChange={(e) =>
                    setRemoveBgOptions((prev) => ({ ...prev, solidColor: e.target.value }))
                  }
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="font-mono text-xs text-gray-300 uppercase">{removeBgOptions.solidColor}</span>
              </div>
            )}

            {/* Sub-Option 2: Preset Gradients */}
            {removeBgOptions.bgType === "gradient" && (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_GRADIENTS.map((g, idx) => (
                  <button
                    key={g.name}
                    onClick={() => setRemoveBgOptions((prev) => ({ ...prev, gradientIndex: idx }))}
                    className={`h-10 rounded-lg border relative flex items-center justify-center transition-transform ${
                      removeBgOptions.gradientIndex === idx ? "border-white scale-105 shadow-md" : "border-gray-800"
                    }`}
                    style={{ background: g.css }}
                    title={g.name}
                  >
                    {removeBgOptions.gradientIndex === idx && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            )}

            {/* Sub-Option 3: Custom Background Image */}
            {removeBgOptions.bgType === "customImage" && (
              <div className="flex items-center gap-3">
                <label className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 text-xs cursor-pointer flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-purple-400" /> Upload Backdrop Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setRemoveBgOptions((prev) => ({
                              ...prev,
                              customBgImageDataUrl: event.target!.result as string,
                            }));
                          }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                </label>
                {removeBgOptions.customBgImageDataUrl && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Backdrop Loaded
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
