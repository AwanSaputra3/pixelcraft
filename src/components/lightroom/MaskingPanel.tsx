"use client";

import React from "react";
import {
  Wand2,
  Circle,
  SlidersHorizontal,
  Eye,
  EyeOff,
  Trash2,
  RotateCcw,
  Plus,
  Sparkles,
  Layers,
  ArrowRightLeft,
} from "lucide-react";
import { MaskItem, MaskType, LightroomOptions } from "../../lib/lightroomEngine";

interface MaskingPanelProps {
  options: LightroomOptions;
  setOptions: React.Dispatch<React.SetStateAction<LightroomOptions>>;
}

export const MaskingPanel: React.FC<MaskingPanelProps> = ({ options, setOptions }) => {
  const activeMask = options.masks.find((m) => m.id === options.activeMaskId) || options.masks[0];

  const handleAddMask = (type: MaskType) => {
    const newId = Math.random().toString(36).substring(7);
    let name = "Mask " + (options.masks.length + 1);

    if (type === "aiSubject") name = "AI Subject Mask";
    if (type === "radial") name = "Radial Spotlight Mask";
    if (type === "linear") name = "Linear Sky Mask";
    if (type === "brush") name = "Adjustment Brush";

    const newMask: MaskItem = {
      id: newId,
      name,
      type,
      enabled: true,
      inverted: false,
      exposure: 0,
      contrast: 0,
      temperature: 0,
      saturation: 0,
      sharpness: 0,
      radialData: type === "radial" ? { centerX: 50, centerY: 50, radiusX: 30, radiusY: 30, feather: 50 } : undefined,
      linearData: type === "linear" ? { angle: 0, position: 30, feather: 40 } : undefined,
    };

    setOptions((prev) => ({
      ...prev,
      masks: [...prev.masks, newMask],
      activeMaskId: newId,
      showRedOverlay: true,
    }));
  };

  const handleToggleMaskEnabled = (id: string) => {
    setOptions((prev) => ({
      ...prev,
      masks: prev.masks.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    }));
  };

  const handleInvertMask = (id: string) => {
    setOptions((prev) => ({
      ...prev,
      masks: prev.masks.map((m) => (m.id === id ? { ...m, inverted: !m.inverted } : m)),
    }));
  };

  const handleDeleteMask = (id: string) => {
    setOptions((prev) => {
      const remaining = prev.masks.filter((m) => m.id !== id);
      return {
        ...prev,
        masks: remaining,
        activeMaskId: remaining.length > 0 ? remaining[0].id : null,
      };
    });
  };

  const handleUpdateActiveMaskField = <K extends keyof MaskItem>(key: K, val: MaskItem[K]) => {
    if (!activeMask) return;
    setOptions((prev) => ({
      ...prev,
      masks: prev.masks.map((m) => (m.id === activeMask.id ? { ...m, [key]: val } : m)),
    }));
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Header & Create Mask Actions */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-purple-400" /> Selective Masking Tools
        </h4>
        <button
          onClick={() => setOptions((prev) => ({ ...prev, showRedOverlay: !prev.showRedOverlay }))}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
            options.showRedOverlay
              ? "bg-red-500/20 border-red-500 text-red-300"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
          }`}
          title="Toggle Red Mask Ruby Tint Overlay"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span>Red Overlay</span>
        </button>
      </div>

      {/* Mask Type Creator Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => handleAddMask("aiSubject")}
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all"
        >
          <Wand2 className="w-4 h-4 text-purple-400" /> AI Subject
        </button>

        <button
          onClick={() => handleAddMask("radial")}
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-gray-950/70 hover:bg-gray-900 border border-gray-800 text-gray-200 text-xs font-medium transition-all"
        >
          <Circle className="w-4 h-4 text-pink-400" /> Radial Mask
        </button>

        <button
          onClick={() => handleAddMask("linear")}
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-gray-950/70 hover:bg-gray-900 border border-gray-800 text-gray-200 text-xs font-medium transition-all"
        >
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Linear Sky
        </button>

        <button
          onClick={() => handleAddMask("brush")}
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-gray-950/70 hover:bg-gray-900 border border-gray-800 text-gray-200 text-xs font-medium transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> Brush Mask
        </button>
      </div>

      {/* Active Masks Stack */}
      {options.masks.length > 0 && (
        <div className="flex flex-col gap-2 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
          <span className="text-[11px] font-semibold text-gray-400 uppercase">Active Masks ({options.masks.length})</span>
          <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
            {options.masks.map((mask) => {
              const isSelected = activeMask?.id === mask.id;
              return (
                <div
                  key={mask.id}
                  onClick={() => setOptions((prev) => ({ ...prev, activeMaskId: mask.id }))}
                  className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-purple-900/50 border-purple-500 text-white font-bold"
                      : "bg-gray-900/80 border-gray-800 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="truncate max-w-[140px]">{mask.name}</span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInvertMask(mask.id);
                      }}
                      className={`p-1 rounded hover:bg-gray-800 ${
                        mask.inverted ? "text-purple-400" : "text-gray-500"
                      }`}
                      title="Invert Mask"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMaskEnabled(mask.id);
                      }}
                      className="p-1 rounded hover:bg-gray-800 text-gray-400"
                      title="Toggle Visibility"
                    >
                      {mask.enabled ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-gray-600" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMask(mask.id);
                      }}
                      className="p-1 rounded hover:bg-gray-800 hover:text-red-400 text-gray-500"
                      title="Delete Mask"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Mask Localized Adjustment Sliders */}
      {activeMask ? (
        <div className="flex flex-col gap-3 bg-purple-950/20 p-3.5 rounded-xl border border-purple-500/30">
          <div className="flex items-center justify-between text-xs font-bold text-purple-300">
            <span>Local Controls: {activeMask.name}</span>
            {activeMask.inverted && <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded border border-purple-500/40">INVERTED</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Mask Exposure</span>
                <span className="font-mono text-purple-400 font-bold">{activeMask.exposure}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={activeMask.exposure}
                onChange={(e) => handleUpdateActiveMaskField("exposure", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Mask Contrast</span>
                <span className="font-mono text-purple-400 font-bold">{activeMask.contrast}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={activeMask.contrast}
                onChange={(e) => handleUpdateActiveMaskField("contrast", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Mask Warmth</span>
                <span className="font-mono text-purple-400 font-bold">{activeMask.temperature}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={activeMask.temperature}
                onChange={(e) => handleUpdateActiveMaskField("temperature", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Mask Saturation</span>
                <span className="font-mono text-purple-400 font-bold">{activeMask.saturation}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={activeMask.saturation}
                onChange={(e) => handleUpdateActiveMaskField("saturation", parseInt(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-gray-800 bg-gray-950/40 text-center text-xs text-gray-400">
          Click an icon above to add a selective mask (AI, Radial, Linear, Brush)
        </div>
      )}
    </div>
  );
};
